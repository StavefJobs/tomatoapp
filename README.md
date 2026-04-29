# 番茄计时器 (Tomato Timer)

一个基于 Vue 3 + Cloudflare Pages + D1 数据库的番茄工作法计时器应用。

## 功能特性

### 核心功能
- **番茄计时器**：25分钟工作 + 5分钟休息循环
- **计划清单**：支持四种计划类型
  - 当天计划（红色）
  - 周计划（青色）
  - 月计划（蓝色）
  - 长期计划（绿色）
- **历史记录**：查看完成的番茄钟记录
- **皮肤切换**：3个预设主题（浅色、深色、彩色）

### 技术栈
- **前端**：Vue 3 (Composition API + `<script setup>`)
- **路由**：Vue Router 4
- **构建工具**：Vite 5
- **后端**：Cloudflare Pages Functions
- **数据库**：Cloudflare D1 (SQLite)
- **部署平台**：Cloudflare Pages

## 项目结构

```
tomato-app/
├── src/
│   ├── components/        # Vue 组件
│   ├── composables/       # 组合式函数
│   ├── pages/            # 页面组件
│   ├── assets/           # 静态资源
│   ├── app.vue           # 根组件
│   └── main.js           # 入口文件
├── functions/             # Pages Functions API
│   └── api/              # API 端点
├── schema.sql            # 数据库 schema
├── wrangler.toml         # Cloudflare 配置
├── vite.config.js        # Vite 配置
├── package.json
└── README.md
```

## 本地开发

### 前置条件
- Node.js 18+
- Wrangler CLI (`npm install -g wrangler`)

### 安装依赖
```bash
npm install
```

### 初始化数据库
```bash
# 创建 D1 数据库
wrangler d1 create tomato-db

# 修改 wrangler.toml 中的 database_id
# 运行 schema
wrangler d1 execute tomato-db --local --file=schema.sql
```

### 启动开发服务器
```bash
# 终端1: 启动 Vite 开发服务器
npm run dev

# 终端2: 启动 Pages Functions 本地开发
wrangler pages dev dist --compatibility-date=2024-01-01
```

## 部署到 Cloudflare Pages

### 方式一：通过 GitHub 自动部署（推荐）

1. **推送代码到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **在 Cloudflare Pages 连接仓库**
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
   - 进入 Pages → 创建项目 → 连接到 Git
   - 选择你的仓库
   - 配置构建设置：
     - 构建命令：`npm run build`
     - 构建输出目录：`dist`
     - 环境变量：无需额外配置

3. **创建 D1 数据库**
   - 在 Cloudflare Dashboard → D1
   - 创建数据库 `tomato-db`
   - 复制数据库 ID 并更新 `wrangler.toml`
   - 运行迁移：`wrangler d1 execute tomato-db --remote --file=schema.sql`

4. **绑定数据库到 Pages 项目**
   - 在 Pages 项目设置 → 函数 → D1 数据库绑定
   - 添加绑定：变量名 `DB`，选择 `tomato-db`

### 方式二：使用 Wrangler 直接部署

```bash
# 构建项目
npm run build

# 部署到 Pages
wrangler pages deploy dist --project-name=tomato-timer
```

## API 端点

### 番茄钟会话
- `POST /api/sessions` - 创建会话记录
- `GET /api/sessions` - 查询会话历史

### 计划清单
- `GET /api/plans?type=daily` - 查询计划（可按类型过滤）
- `POST /api/plans` - 创建新计划
- `PATCH /api/plans/:id` - 切换计划完成状态
- `DELETE /api/plans/:id` - 删除计划

## 数据库 Schema

```sql
-- 番茄钟会话表
CREATE TABLE sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,
  duration INTEGER NOT NULL,
  completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 计划清单表
CREATE TABLE plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('daily','weekly','monthly','longterm')),
  color TEXT NOT NULL,
  completed BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME
);
```

## 许可证

MIT License

## 作者

Built with ❤️ using Vue 3 and Cloudflare
