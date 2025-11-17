# 🚀 工具门户网站部署指南

## 📋 部署前准备

### 1. 确保代码已提交
```bash
git status  # 确认所有文件已提交
git log     # 查看提交历史
```

### 2. 本地构建测试
```bash
npm run build    # 构建项目
npm run preview  # 预览构建结果
```

## 🔗 GitHub部署步骤

### 第一步：创建GitHub仓库
1. 访问 [github.com](https://github.com)
2. 点击右上角 "+" → "New repository"
3. 填写信息：
   - **Repository name**: `tool-portal-astro`
   - **Description**: `A modern tool aggregation website built with Astro`
   - **Visibility**: Public（Cloudflare Pages需要）
   - **不要** 初始化任何文件
4. 点击 "Create repository"

### 第二步：推送代码
```bash
# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/tool-portal-astro.git

# 推送到GitHub
git push -u origin master

# 如果默认分支是main
git branch -M main
git push -u origin main
```

## ☁️ Cloudflare Pages部署

### 方法一：通过Dashboard（推荐）

1. **登录Cloudflare**
   - 访问 [dash.cloudflare.com](https://dash.cloudflare.com)
   - 注册/登录您的账户

2. **进入Pages**
   - 左侧菜单点击 "Pages"
   - 点击 "Connect to Git"

3. **连接GitHub仓库**
   - 授权Cloudflare访问您的GitHub
   - 选择 `tool-portal-astro` 仓库

4. **配置构建设置**
   - **Project name**: `tool-portal-astro`
   - **Framework**: Astro（自动检测）
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Install command**: `npm install`

5. **环境变量**（可选）
   ```
   ENABLE_ADMIN=true
   NODE_ENV=production
   ```

6. **部署**
   - 点击 "Save and Deploy"
   - 等待构建完成（约2-3分钟）

### 方法二：通过Wrangler CLI

```bash
# 1. 安装Wrangler
npm install -g wrangler

# 2. 登录Cloudflare
wrangler login

# 3. 部署项目
npm run deploy
```

## 🔧 部署配置详解

### 必需文件
```
├── astro.config.mjs     # Astro配置文件
├── package.json       # 依赖和脚本
├── wrangler.toml      # Cloudflare配置
├── public/            # 静态资源
│   └── robots.txt     # 搜索引擎配置
└── dist/              # 构建输出目录
```

### 环境变量配置
| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `ENABLE_ADMIN` | 启用管理界面 | `true` |
| `NODE_ENV` | 运行环境 | `production` |

### 构建输出
构建完成后，所有文件会输出到 `dist/` 目录：
- `index.html` - 首页
- `admin/tools/index.html` - 管理页面
- `*.css` - 样式文件
- `*.js` - JavaScript文件

## ✅ 部署验证

### 1. 检查构建状态
- Cloudflare Pages控制台查看构建日志
- 确认无错误信息

### 2. 访问网站
- 获取分配的 `.pages.dev` 域名
- 访问首页和管理页面

### 3. 功能测试
```bash
# 测试首页
curl https://your-domain.pages.dev/

# 测试管理页面（确保已启用）
curl https://your-domain.pages.dev/admin/tools

# 检查robots.txt
curl https://your-domain.pages.dev/robots.txt
```

## 🛡️ 安全设置

### 管理界面保护
1. **生产环境建议禁用管理界面**
   ```
   ENABLE_ADMIN=false
   ```

2. **或者设置访问密码**
   ```
   ADMIN_PASSWORD=your_secure_password
   ```

### 自定义域名
1. 在Cloudflare Pages设置中添加自定义域名
2. 配置DNS解析到Cloudflare
3. 启用HTTPS（自动提供SSL证书）

## 🔄 持续部署

### 自动部署
- 每次推送到GitHub主分支都会自动触发部署
- 可以在Pull Request中预览更改

### 回滚版本
- Cloudflare Pages支持版本历史
- 可以快速回滚到之前的版本

## 📊 性能优化

### 构建优化
- 启用代码压缩
- 优化图片资源
- 使用CDN加速

### 监控指标
- 页面加载速度
- 构建时间
- 错误率

## 🆘 常见问题

### 构建失败
1. 检查Node.js版本（建议18+）
2. 确认依赖包安装完整
3. 查看构建日志错误信息

### 页面404
1. 确认构建输出目录正确
2. 检查文件路径大小写
3. 验证路由配置

### 管理界面无法访问
1. 检查环境变量设置
2. 确认ENABLE_ADMIN=true
3. 查看浏览器控制台错误

## 📞 获取帮助

如果遇到问题：
1. 查看Cloudflare Pages文档
2. 检查GitHub Issues
3. 查看构建日志
4. 联系技术支持

---

**🎉 部署完成后，您将获得：**
- 一个现代化的工具门户网站
- 自动HTTPS安全连接
- 全球CDN加速访问
- 免费的托管服务