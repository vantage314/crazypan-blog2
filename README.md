# 🚀 Crazypan Blog

一个现代化的全栈博客系统，基于 Next.js 15 和 Express.js 构建，具备完整的文章管理、用户认证、评论系统等功能。

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ 功能特性

### 🎯 核心功能
- 📝 **文章管理**: 支持 Markdown 编辑、分类标签、搜索功能
- 👥 **用户系统**: JWT 认证、权限管理、用户面板
- 💬 **评论系统**: 实时评论、回复功能、垃圾评论过滤
- 📊 **数据统计**: 访问量统计、用户行为分析
- 🎨 **主题切换**: 支持明暗主题切换
- 📱 **响应式设计**: 完美适配桌面端和移动端

### 🛠️ 技术特性
- ⚡ **高性能**: Next.js 15 App Router + React 19
- 🔒 **安全性**: JWT 认证、CORS 配置、输入验证
- 🎯 **类型安全**: 完整的 TypeScript 支持
- 🎨 **现代UI**: Radix UI + shadcn/ui 组件库
- 📦 **模块化**: 清晰的代码结构和组件化设计

## 🏗️ 技术栈

### 前端技术
- **框架**: Next.js 15 (App Router)
- **UI库**: React 19 + TypeScript
- **样式**: Tailwind CSS + CSS Modules
- **组件**: Radix UI + shadcn/ui
- **状态管理**: React Hooks
- **表单**: React Hook Form + Zod
- **图标**: Lucide React

### 后端技术
- **运行时**: Node.js + Express.js
- **语言**: TypeScript
- **认证**: JWT + bcrypt
- **中间件**: CORS, Helmet, Morgan
- **数据存储**: JSON 文件 (可扩展为数据库)

### 开发工具
- **包管理**: pnpm
- **代码规范**: ESLint + TypeScript
- **构建工具**: Next.js + TypeScript Compiler
- **部署**: GitHub Pages + Vercel

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- pnpm 8+

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/your-username/crazypan-blog.git
cd crazypan-blog
```

2. **安装依赖**
```bash
# 安装前端依赖
pnpm install

# 安装后端依赖
cd server
pnpm install
cd ..
```

3. **环境配置**
```bash
# 复制环境变量模板
cp server/env.example server/.env

# 复制留言数据模板
cp server/data/comments.example.json server/data/comments.json

# 编辑环境变量
# 配置 JWT_SECRET、数据库连接等
```

4. **启动开发服务器**
```bash
# 启动前端 (端口 3000)
pnpm dev

# 启动后端 (端口 3001)
cd server
pnpm dev
```

5. **访问应用**
- 前端: http://localhost:3000
- 后端API: http://localhost:3001

## 📁 项目结构

```
crazypan-blog/
├── app/                    # Next.js App Router 页面
│   ├── api/               # API 路由
│   │   └── comments/      # 留言API
│   ├── admin/             # 管理后台
│   ├── posts/             # 文章页面
│   ├── tags/              # 标签页面
│   └── layout.tsx         # 根布局
├── components/            # React 组件
│   ├── ui/               # shadcn/ui 组件
│   ├── AdminLayout.tsx   # 管理后台布局
│   ├── CommentBoard.tsx  # 留言板组件
│   ├── Navbar.tsx        # 导航栏
│   └── PostCard.tsx      # 文章卡片
├── lib/                  # 工具函数和类型
├── server/               # Express.js 后端
│   ├── src/
│   │   ├── routes/       # API 路由
│   │   ├── middleware/   # 中间件
│   │   └── types/        # 类型定义
│   └── data/             # JSON 数据文件
├── public/               # 静态资源
└── styles/               # 全局样式
```

## 🔧 配置说明

### 前端配置
- `next.config.mjs`: Next.js 配置
- `tailwind.config.js`: Tailwind CSS 配置
- `components.json`: shadcn/ui 配置

### 后端配置
- `server/.env`: 环境变量
- `server/src/index.ts`: 服务器入口
- `server/src/routes/`: API 路由定义

## 📝 使用指南

### 文章管理
1. 在管理后台创建新文章
2. 支持 Markdown 格式编辑
3. 设置分类标签和发布时间
4. 发布或保存草稿

### 用户管理
1. 注册新用户账户
2. 管理员可分配权限
3. 支持密码重置功能

### 留言系统
1. **访问留言墙**: 导航到 `/guestbook` 页面
2. **提交留言**: 
   - 输入昵称和留言内容
   - 点击"发送留言"按钮
   - 系统自动保存到 `server/data/comments.json`
3. **查看留言**: 所有留言实时显示在页面上
4. **数据持久化**: 留言数据保存在本地JSON文件中
5. **错误处理**: 包含网络错误和验证错误提示

### 留言API接口
- `GET /api/comments`: 获取所有留言
- `POST /api/comments`: 提交新留言
  - 请求体: `{ author: string, content: string }`
  - 响应: `{ success: boolean, comment?: object, error?: string }`

## 🚀 部署指南

### GitHub Pages 部署
```bash
# 构建项目
pnpm build

# 部署到 GitHub Pages
pnpm deploy
```

### Vercel 部署
1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 自动部署

### 自定义域名
1. 在 `public/CNAME` 中配置域名
2. 更新 DNS 设置
3. 配置 SSL 证书

## 🔧 开发指南

### 留言系统开发
1. **API路由**: `app/api/comments/route.ts`
2. **前端组件**: `components/CommentBoard.tsx`
3. **数据存储**: `server/data/comments.json`
4. **类型定义**: `lib/types.ts`

### 测试留言功能
```bash
# 启动开发服务器
pnpm dev

# 访问留言墙
http://localhost:3000/guestbook

# 测试API接口
node test-comments.js
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👨‍💻 作者

**CrazyPan** - [GitHub](https://github.com/your-username)

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Radix UI](https://www.radix-ui.com/) - 无样式组件库
- [shadcn/ui](https://ui.shadcn.com/) - 组件库
- [Express.js](https://expressjs.com/) - Node.js 框架

## 📞 联系方式

- 项目链接: [https://github.com/your-username/crazypan-blog](https://github.com/your-username/crazypan-blog)
- 问题反馈: [Issues](https://github.com/your-username/crazypan-blog/issues)

---

⭐ 如果这个项目对您有帮助，请给它一个星标！
