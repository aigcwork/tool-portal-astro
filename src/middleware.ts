import type { MiddlewareResponseHandler } from 'astro';

export const onRequest: MiddlewareResponseHandler = async (context, next) => {
  const { url, request } = context;
  const pathname = new URL(request.url).pathname;
  
  // 检查是否是管理路径
  if (pathname.startsWith('/admin')) {
    // 生产环境下添加额外的安全检查
    if (import.meta.env.PROD) {
      // 可以在这里添加IP白名单、密码验证等
      const adminEnabled = import.meta.env.ENABLE_ADMIN === 'true';
      
      if (!adminEnabled) {
        return new Response('Admin interface is disabled', { 
          status: 404,
          headers: {
            'X-Robots-Tag': 'noindex, nofollow'
          }
        });
      }
      
      // 检查Referer，确保从站内访问
      const referer = request.headers.get('referer');
      const host = request.headers.get('host');
      
      if (referer && !referer.includes(host || '')) {
        return new Response('Access denied', { 
          status: 403,
          headers: {
            'X-Robots-Tag': 'noindex, nofollow'
          }
        });
      }
    }
    
    // 添加安全头
    const response = await next();
    
    if (response instanceof Response) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-Content-Type-Options', 'nosniff');
      
      // 可选：添加基本认证
      const authHeader = request.headers.get('authorization');
      if (import.meta.env.PROD && import.meta.env.ADMIN_PASSWORD) {
        if (!authHeader || authHeader !== `Bearer ${import.meta.env.ADMIN_PASSWORD}`) {
          return new Response('Unauthorized', { 
            status: 401,
            headers: {
              'WWW-Authenticate': 'Basic realm="Admin Panel"',
              'X-Robots-Tag': 'noindex, nofollow'
            }
          });
        }
      }
    }
    
    return response;
  }
  
  return next();
};