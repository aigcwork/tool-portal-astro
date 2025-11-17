import { ToolCategory, ToolStatus } from '@/types/tool';

/**
 * 工具数据集合
 * 包含各种精选的在线工具
 */
export const tools = [
  // 开发工具
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'AI驱动的代码补全工具',
    icon: 'https://github.githubassets.com/images/modules/site/copilot/copilot.png',
    url: 'https://github.com/features/copilot',
    category: ToolCategory.DEVELOPMENT,
    status: ToolStatus.ACTIVE,
    tags: ['AI', '代码补全', '开发效率'],
    featured: true,
    weight: 100,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    description: '轻量级但功能强大的代码编辑器',
    icon: 'https://code.visualstudio.com/assets/images/code-stable.png',
    url: 'https://code.visualstudio.com/',
    category: ToolCategory.DEVELOPMENT,
    status: ToolStatus.ACTIVE,
    tags: ['编辑器', 'IDE', '开发环境'],
    featured: true,
    weight: 95,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'postman',
    name: 'Postman',
    description: 'API开发和测试平台',
    icon: 'https://www.postman.com/favicon.ico',
    url: 'https://www.postman.com/',
    category: ToolCategory.DEVELOPMENT,
    status: ToolStatus.ACTIVE,
    tags: ['API', '测试', '开发'],
    featured: false,
    weight: 85,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'vercel',
    name: 'Vercel',
    description: '前端部署和托管平台',
    icon: 'https://vercel.com/favicon.ico',
    url: 'https://vercel.com/',
    category: ToolCategory.DEVELOPMENT,
    status: ToolStatus.ACTIVE,
    tags: ['部署', '托管', '前端'],
    featured: true,
    weight: 90,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },

  // 设计工具
  {
    id: 'figma',
    name: 'Figma',
    description: '协作式界面设计工具',
    icon: 'https://www.figma.com/favicon.ico',
    url: 'https://www.figma.com/',
    category: ToolCategory.DESIGN,
    status: ToolStatus.ACTIVE,
    tags: ['设计', 'UI', '协作'],
    featured: true,
    weight: 100,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'canva',
    name: 'Canva',
    description: '在线图形设计平台',
    icon: 'https://www.canva.com/favicon.ico',
    url: 'https://www.canva.com/',
    category: ToolCategory.DESIGN,
    status: ToolStatus.ACTIVE,
    tags: ['设计', '图形', '模板'],
    featured: true,
    weight: 90,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'excalidraw',
    name: 'Excalidraw',
    description: '手绘风格的白板工具',
    icon: 'https://excalidraw.com/favicon.ico',
    url: 'https://excalidraw.com/',
    category: ToolCategory.DESIGN,
    status: ToolStatus.ACTIVE,
    tags: ['白板', '手绘', '协作'],
    featured: false,
    weight: 80,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },

  // 生产力工具
  {
    id: 'notion',
    name: 'Notion',
    description: '一体化工作空间',
    icon: 'https://www.notion.so/favicon.ico',
    url: 'https://www.notion.so/',
    category: ToolCategory.PRODUCTIVITY,
    status: ToolStatus.ACTIVE,
    tags: ['笔记', '协作', '项目管理'],
    featured: true,
    weight: 100,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    description: '知识管理和笔记应用',
    icon: 'https://obsidian.md/favicon.ico',
    url: 'https://obsidian.md/',
    category: ToolCategory.PRODUCTIVITY,
    status: ToolStatus.ACTIVE,
    tags: ['笔记', '知识管理', 'Markdown'],
    featured: true,
    weight: 95,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'todoist',
    name: 'Todoist',
    description: '任务管理和待办事项应用',
    icon: 'https://todoist.com/favicon.ico',
    url: 'https://todoist.com/',
    category: ToolCategory.PRODUCTIVITY,
    status: ToolStatus.ACTIVE,
    tags: ['任务管理', '待办事项', 'GTD'],
    featured: false,
    weight: 85,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },

  // 学习工具
  {
    id: 'khan-academy',
    name: 'Khan Academy',
    description: '免费在线教育平台',
    icon: 'https://www.khanacademy.org/favicon.ico',
    url: 'https://www.khanacademy.org/',
    category: ToolCategory.LEARNING,
    status: ToolStatus.ACTIVE,
    tags: ['教育', '学习', '免费'],
    featured: true,
    weight: 90,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'coursera',
    name: 'Coursera',
    description: '在线课程学习平台',
    icon: 'https://www.coursera.org/favicon.ico',
    url: 'https://www.coursera.org/',
    category: ToolCategory.LEARNING,
    status: ToolStatus.ACTIVE,
    tags: ['在线课程', '教育', '职业发展'],
    featured: false,
    weight: 85,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },

  // 实用工具
  {
    id: 'tiny-png',
    name: 'TinyPNG',
    description: '在线图片压缩工具',
    icon: 'https://tinypng.com/favicon.ico',
    url: 'https://tinypng.com/',
    category: ToolCategory.UTILITIES,
    status: ToolStatus.ACTIVE,
    tags: ['图片压缩', '优化', 'Web性能'],
    featured: true,
    weight: 90,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'remove-bg',
    name: 'Remove.bg',
    description: '自动背景移除工具',
    icon: 'https://www.remove.bg/favicon.ico',
    url: 'https://www.remove.bg/',
    category: ToolCategory.UTILITIES,
    status: ToolStatus.ACTIVE,
    tags: ['图片处理', '背景移除', 'AI'],
    featured: false,
    weight: 85,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: '免费QR码生成器',
    icon: 'https://www.qr-code-generator.com/favicon.ico',
    url: 'https://www.qr-code-generator.com/',
    category: ToolCategory.UTILITIES,
    status: ToolStatus.ACTIVE,
    tags: ['QR码', '生成器', '实用工具'],
    featured: false,
    weight: 75,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },

  // 沟通工具
  {
    id: 'slack',
    name: 'Slack',
    description: '团队沟通和协作平台',
    icon: 'https://slack.com/favicon.ico',
    url: 'https://slack.com/',
    category: ToolCategory.COMMUNICATION,
    status: ToolStatus.ACTIVE,
    tags: ['团队沟通', '协作', '即时通讯'],
    featured: true,
    weight: 95,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'zoom',
    name: 'Zoom',
    description: '视频会议和网络会议平台',
    icon: 'https://zoom.us/favicon.ico',
    url: 'https://zoom.us/',
    category: ToolCategory.COMMUNICATION,
    status: ToolStatus.ACTIVE,
    tags: ['视频会议', '远程会议', '协作'],
    featured: false,
    weight: 90,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },

  // 媒体工具
  {
    id: 'loom',
    name: 'Loom',
    description: '屏幕录制和视频消息工具',
    icon: 'https://www.loom.com/favicon.ico',
    url: 'https://www.loom.com/',
    category: ToolCategory.MEDIA,
    status: ToolStatus.ACTIVE,
    tags: ['屏幕录制', '视频消息', '演示'],
    featured: true,
    weight: 85,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'canva-video',
    name: 'Canva Video',
    description: '在线视频编辑工具',
    icon: 'https://www.canva.com/favicon.ico',
    url: 'https://www.canva.com/video-editor/',
    category: ToolCategory.MEDIA,
    status: ToolStatus.ACTIVE,
    tags: ['视频编辑', '在线工具', '模板'],
    featured: false,
    weight: 80,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },

  // 安全工具
  {
    id: '1password',
    name: '1Password',
    description: '密码管理器和安全工具',
    icon: 'https://1password.com/favicon.ico',
    url: 'https://1password.com/',
    category: ToolCategory.SECURITY,
    status: ToolStatus.ACTIVE,
    tags: ['密码管理', '安全', '隐私保护'],
    featured: true,
    weight: 95,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'nord-vpn',
    name: 'NordVPN',
    description: '虚拟私人网络服务',
    icon: 'https://nordvpn.com/favicon.ico',
    url: 'https://nordvpn.com/',
    category: ToolCategory.SECURITY,
    status: ToolStatus.ACTIVE,
    tags: ['VPN', '隐私保护', '网络安全'],
    featured: false,
    weight: 85,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];