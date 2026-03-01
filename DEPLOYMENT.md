# 部署到 GitHub Pages 指南

## 📋 前提条件

- 已安装 Node.js (v18+)
- 已安装 npm
- 有 GitHub 账号

## 🚀 部署步骤

### 方法一：使用 GitHub Actions（推荐）

这是最简单的方法，每次推送到 main 分支都会自动部署。

#### 1. 安装依赖

```bash
npm install
```

#### 2. 提交并推送到 GitHub

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

#### 3. 配置 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 **Settings** → **Pages**
3. 在 **Source** 下选择 **GitHub Actions**
4. 等待 GitHub Actions 自动部署完成

#### 4. 查看部署状态

- 进入 **Actions** 标签页查看构建进度
- 部署完成后，你的应用将可通过 `https://your-username.github.io/your-repo-name/` 访问

### 方法二：使用 gh-pages 包（手动部署）

如果你想手动控制部署，可以使用这个方法。

#### 1. 安装 gh-pages

```bash
npm install
```

#### 2. 部署到 GitHub Pages

```bash
npm run deploy
```

这个命令会：
- 自动构建项目 (`npm run build`)
- 将 `dist` 目录部署到 `gh-pages` 分支

#### 3. 配置 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 **Settings** → **Pages**
3. 在 **Source** 下选择 **gh-pages** 分支
4. 点击 **Save**

## ⚙️ 已完成的配置

### 1. Vite 配置 (`vite.config.ts`)
- ✅ 生产环境使用相对路径 (`base: "./"`)
- ✅ 支持在子路径部署

### 2. 路由配置 (`src/App.tsx`)
- ✅ 使用 `HashRouter` 替代 `BrowserRouter`
- ✅ 支持静态托管环境的路由

### 3. 部署脚本 (`package.json`)
- ✅ 添加 `predeploy` 和 `deploy` 脚本
- ✅ 添加 `gh-pages` 依赖

### 4. GitHub Actions 工作流
- ✅ 自动构建和部署
- ✅ 支持手动触发部署

## 🔍 常见问题

### 页面显示空白
- 检查浏览器控制台是否有错误
- 确认 `vite.config.ts` 中配置了正确的 `base` 路径
- 确认使用了 `HashRouter`

### 路由不工作
- 确保使用 `HashRouter` 而不是 `BrowserRouter`
- 访问时使用 hash 路由格式：`#/design-system`

### 样式加载失败
- 检查资源路径是否正确
- 清除浏览器缓存后重试

## 📱 访问格式

部署后，访问格式为：

```
https://<your-github-username>.github.io/<repository-name>/

例如：
https://medkey.github.io/medkey-locker-connect/
```

路由示例：
- 首页：`https://medkey.github.io/medkey-locker-connect/#/`
- 设计系统：`https://medkey.github.io/medkey-locker-connect/#/design-system`
- 保险卡详情：`https://medkey.github.io/medkey-locker-connect/#/insurance-card/123`

## 🎯 下一步

1. 将代码推送到 GitHub
2. 等待 GitHub Actions 完成部署
3. 访问你的 GitHub Pages 链接
4. 分享你的应用！
