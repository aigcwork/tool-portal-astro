import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { request } = context;
  const pathname = new URL(request.url).pathname;
  
  // 检查是否是管理路径
  if (pathname.startsWith('/admin')) {
    // 检查是否启用了管理功能
    const adminEnabled = import.meta.env.ENABLE_ADMIN === 'true';
    
    if (!adminEnabled) {
      return new Response('Admin interface is disabled', { 
        status: 404,
        headers: {
          'X-Robots-Tag': 'noindex, nofollow'
        }
      });
    }
    
    // 添加安全头
    const response = await next();
    
    if (response instanceof Response) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-Content-Type-Options', 'nosniff');
    }
    
    return response;
  }
  
  return next();
};