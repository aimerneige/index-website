# Aimer's Hub - 个人小工具导航页

遵循 **Material Design 3 (Material You)** 设计规范的纯静态导航站点。用于汇聚 `aimer.moe` 系列静态工具。

- **主站域名**：`https://www.aimer.moe/`
- **部署方式**：构建输出的 `dist` 目录可直接部署至 GitHub Pages（附带 `CNAME` 文件，完全符合 GitHub Pages 免费版规范与限制）。
- **配置驱动**：全部站点、分类与描述均由根目录下的 [sites.yaml](file:///workspaces/index-website/sites.yaml) 统一管理，支持热插拔与轻松扩展。

---

## ✨ 特性与设计

1. **严格遵循 Material Design 3 规范**
   - **Tonal Color Roles**：基于 MD3 标准色盘规范构建（Primary, Secondary, Tertiary, Surface Containers 五级阶梯色）。
   - **深色 / 浅色模式切换**：支持跟随系统偏好与一键手动切换，并记忆至本地。
   - **MD3 核心组件**：Docked Search Bar（支持快捷键 `Ctrl+K` / `/`）、Filter Chips（分类状态与数量计数）、Elevated / Outlined Cards（悬浮色调提升与波纹状态层）、Snackbar 复制反馈提示。
2. **零服务端依赖，极速纯静态**
   - 单次编译产物体积极小（JS + CSS gzip < 90KB），秒开无白屏。
3. **YAML 配置文件驱动**
   - 站点无需硬编码在前端组件中，直接编辑 [sites.yaml](file:///workspaces/index-website/sites.yaml) 即可增删改查。
   - 构建时预加载并支持运行时动态回退。

---

## 🛠️ 如何添加 / 修改站点

直接打开根目录下的 [sites.yaml](file:///workspaces/index-website/sites.yaml)，按照如下结构增改即可：

```yaml
sites:
  - title: "Posta" # 站点主标题（简短）
    name: "Posta 邮寄排版" # 站点副标题/中文全称
    description: "邮寄地址管理与标准 A4 纸打印排版工具。" # 工具描述
    url: "https://posta.aimer.moe/" # 站点链接
    category: "office" # 分类 ID（与 categories 中定义的 id 对应）
    icon: "Mail" # 图标名称（如 Mail, Image, Hash, KeyRound, Zap 等）
    color: "sky" # 主题高亮色（sky, violet, blue, amber, emerald, teal, rose, indigo）
    tags: ["办公", "排版", "打印"] # 标签，支持搜索关键词索引
    badge: "实用" # 右上角特色徽章（可选）
```

---

## 🚀 本地开发与构建

### 1. 启动本地开发服务
```bash
npm run dev
```

### 2. 编译生产版本
```bash
npm run build
```
编译成功后，将在 `dist/` 目录下生成全部静态文件：
- `dist/CNAME`：已包含 `www.aimer.moe`
- `dist/index.html`：入口 HTML
- `dist/assets/`：已压缩混淆的 JS / CSS 资源
- `dist/favicon.svg`：Material Design 3 矢量图标
- `dist/sites.yaml`：站点配置文件

### 3. 本地预览生产构建产物
```bash
npm run preview
```

---

## 📦 部署到 GitHub Pages

可以运行一键部署脚本将 `dist/` 静态产物构建并推送到 GitHub Pages 仓库：
```bash
npm run deploy
# 或自定义 commit 消息：
bash deploy.sh "feat: update sites"
```

也可以直接将 `dist` 目录中的全部文件上传到你的目标 GitHub Pages 仓库的分支即可。