# 博客后端服务

一个基于 Node.js + Express + TypeScript 的轻量级博客后端服务，支持文章管理、留言系统、数据统计等功能。

## 🚀 功能特性

- 🔐 **用户认证**: JWT + bcrypt 安全认证
- 📝 **文章管理**: 支持文章的 CRUD 操作
- 💬 **留言系统**: 支持留言的添加、审核、删除
- 📊 **数据统计**: 文章阅读量和点赞数统计
- 🛡️ **安全防护**: Helmet 安全头、CORS 配置
- 📁 **文件存储**: JSON 文件持久化存储
- 🔄 **实时开发**: 热重载开发环境

## 📦 技术栈

- **运行时**: Node.js 18+
- **框架**: Express.js 4.x
- **语言**: TypeScript 5.x
- **认证**: JWT + bcrypt
- **安全**: Helmet + CORS
- **日志**: Morgan
- **开发**: ts-node-dev

## 🛠️ 安装与运行

### 1. 安装依赖

```bash
cd server
pnpm install
```

### 2. 环境配置

复制环境变量示例文件：

```bash
cp env.example .env
```

编辑 `.env` 文件，配置必要的环境变量：

```env
# 服务器配置
PORT=3001
NODE_ENV=development

# JWT 配置
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# 跨域配置
CORS_ORIGIN=http://localhost:3000

# 数据文件路径
DATA_DIR=./data
```

### 3. 启动服务

**开发模式**（热重载）：
```bash
pnpm dev
```

**生产模式**：
```bash
pnpm build
pnpm start
```

### 4. 验证服务

访问健康检查接口：
```
GET http://localhost:3001/health
```

## 📚 API 文档

### 认证相关

#### 用户登录
```
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

#### 验证 Token
```
GET /api/auth/verify
Authorization: Bearer <token>
```

### 文章管理

#### 获取文章列表
```
GET /api/posts
```

#### 获取所有文章（管理员）
```
GET /api/posts/all
Authorization: Bearer <token>
```

#### 获取特定文章
```
GET /api/posts/:slug
```

#### 创建/更新文章
```
POST /api/posts/:slug
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "文章标题",
  "content": "文章内容",
  "excerpt": "文章摘要",
  "tags": ["标签1", "标签2"],
  "published": true
}
```

#### 删除文章
```
DELETE /api/posts/:slug
Authorization: Bearer <token>
```

### 留言管理

#### 获取留言列表
```
GET /api/comments
```

#### 获取所有留言（管理员）
```
GET /api/comments/all
Authorization: Bearer <token>
```

#### 添加留言
```
POST /api/comments
Content-Type: application/json

{
  "content": "留言内容",
  "author": "留言者姓名"
}
```

#### 删除留言
```
DELETE /api/comments/:id
Authorization: Bearer <token>
```

#### 审核留言
```
PUT /api/comments/:id/approve
Authorization: Bearer <token>
Content-Type: application/json

{
  "approved": true
}
```

### 数据统计

#### 获取统计数据
```
GET /api/stats
```

#### 增加阅读量
```
POST /api/stats/view/:slug
```

#### 增加点赞数
```
POST /api/stats/like/:slug
```

#### 获取特定文章统计
```
GET /api/stats/:slug
```

#### 获取统计概览（管理员）
```
GET /api/stats/overview
Authorization: Bearer <token>
```

## 🔧 项目结构

```
server/
├── src/
│   ├── index.ts              # 应用入口
│   ├── types/
│   │   └── index.ts          # 类型定义
│   ├── routes/
│   │   ├── auth.ts           # 认证路由
│   │   ├── posts.ts          # 文章路由
│   │   ├── comments.ts       # 留言路由
│   │   └── stats.ts          # 统计路由
│   ├── middleware/
│   │   └── auth.ts           # 认证中间件
│   └── utils/
│       ├── jwt.ts            # JWT 工具
│       └── storage.ts        # 存储工具
├── data/                     # 数据文件目录
│   ├── posts.json            # 文章数据
│   ├── comments.json         # 留言数据
│   ├── users.json            # 用户数据
│   └── stats.json            # 统计数据
├── package.json
├── tsconfig.json
└── README.md
```

## 🔐 默认账户

服务启动时会自动创建默认管理员账户：

- **用户名**: admin
- **密码**: admin123

**⚠️ 重要**: 生产环境中请务必修改默认密码！

## 🚀 部署

### Vercel 部署

1. 创建 `vercel.json` 配置文件
2. 配置环境变量
3. 部署到 Vercel

### Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

### 传统服务器部署

1. 构建项目：`pnpm build`
2. 上传 `dist` 目录和 `data` 目录
3. 安装生产依赖：`pnpm install --production`
4. 启动服务：`pnpm start`

## 🔍 开发调试

### 日志查看

服务使用 Morgan 记录 HTTP 请求日志，开发模式下会显示详细的请求信息。

### 数据文件

所有数据存储在 `data/` 目录下的 JSON 文件中，可以直接编辑这些文件来修改数据。

### 热重载

开发模式下使用 `ts-node-dev` 实现热重载，修改代码后会自动重启服务。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## �� 许可证

MIT License 