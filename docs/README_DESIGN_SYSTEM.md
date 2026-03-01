# 🎨 MEDkey Design System

> 专业、现代、关怀的医疗健康 UI 设计系统

![MEDkey Design System](https://img.shields.io/badge/version-1.0.0-2D7A8A?style=for-the-badge)
![React](https://img.shields.io/badge/react-18.3.1-5EC4D6?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/typescript-5.8.3-2D7A8A?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-3.4.17-5EC4D6?style=for-the-badge&logo=tailwindcss)

## 🌟 特性

- 🎨 **完整的颜色系统** - 基于 MEDkey logo 的双色主题
- 🧩 **组件库** - 按钮、卡片、输入框等常用组件
- 📐 **设计 Token** - 间距、圆角、阴影、排版系统
- 🌙 **暗色模式** - 完整的亮色/暗色主题支持
- 📱 **响应式** - 移动优先，适配各种屏幕
- ♿ **无障碍** - 优化的对比度和焦点状态
- ⚡ **高性能** - 优化的动画和过渡效果

## 🚀 快速开始

### 1. 启动开发服务器

```bash
npm run dev
```

### 2. 访问应用

- **主应用**: http://localhost:8082/
- **设计系统展示**: http://localhost:8082/design-system

## 📖 文档

| 文档 | 描述 |
|------|------|
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | 快速参考卡片 |
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | 完整使用指南 |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | 实施总结 |

## 🎨 品牌色彩

### 主色调

<div align="center">
  <table>
    <tr>
      <td align="center">
        <div style="background: #2D7A8A; width: 100px; height: 100px; border-radius: 12px; margin: 0 auto;"></div>
        <strong>Teal Dark</strong><br>
        <code>#2D7A8A</code><br>
        <small>HSL(188, 50%, 36%)</small>
      </td>
      <td align="center">
        <div style="background: #5EC4D6; width: 100px; height: 100px; border-radius: 12px; margin: 0 auto;"></div>
        <strong>Teal Light</strong><br>
        <code>#5EC4D6</code><br>
        <small>HSL(188, 50%, 60%)</small>
      </td>
    </tr>
  </table>
</div>

### 渐变色

```tsx
<div className="bg-gradient-medkey">
  深青 → 浅青
</div>
```

## 💻 使用示例

### 基础组件

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>欢迎使用 MEDkey</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="输入邮箱..." />
        <div className="flex gap-2">
          <Button variant="default">开始使用</Button>
          <Button variant="secondary">了解更多</Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

### 使用 Design Token

```tsx
import { colors, spacing, shadows } from "@/tokens/design-tokens";

function CustomCard() {
  return (
    <div
      style={{
        backgroundColor: colors.brand.tealDark,
        padding: spacing[6],
        borderRadius: borderRadius.lg,
        boxShadow: shadows.md,
      }}
    >
      自定义卡片
    </div>
  );
}
```

### 使用工具类

```tsx
function UtilityExample() {
  return (
    <div className="space-y-4">
      {/* 渐变背景 */}
      <div className="bg-gradient-medkey text-white p-6 radius-medkey-xl shadow-medkey-lg">
        渐变卡片
      </div>
      
      {/* 交互动效 */}
      <button className="btn-hover-lift transition-medkey-normal">
        悬停提升按钮
      </button>
      
      {/* 排版层级 */}
      <h1 className="text-medkey-h1">大标题</h1>
      <p className="text-medkey-body">正文内容</p>
    </div>
  );
}
```

## 📦 项目结构

```
medkey-locker-connect/
├── src/
│   ├── index.css                 # CSS 变量和工具类
│   ├── tokens/
│   │   └── design-tokens.ts      # TypeScript Design Token
│   ├── components/
│   │   └── ui/                   # UI 组件
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── input.tsx
│   └── pages/
│       └── DesignSystem.tsx      # 设计系统展示
├── DESIGN_SYSTEM.md              # 使用文档
├── IMPLEMENTATION_SUMMARY.md     # 实施总结
├── QUICK_REFERENCE.md            # 快速参考
└── README_DESIGN_SYSTEM.md       # 本文件
```

## 🎯 核心组件

### Button (按钮)

**变体**: `default`, `secondary`, `accent`, `outline`, `ghost`, `link`, `success`, `warning`, `destructive`

**尺寸**: `sm`, `default`, `lg`, `xl`, `icon`

```tsx
<Button variant="default" size="lg">
  主要按钮
</Button>
```

### Card (卡片)

```tsx
<Card>
  <CardHeader>
    <CardTitle>标题</CardTitle>
    <CardDescription>描述</CardDescription>
  </CardHeader>
  <CardContent>内容</CardContent>
</Card>
```

### Input (输入框)

```tsx
<Input 
  placeholder="请输入..." 
  type="email"
/>
```

## 📐 设计系统

### 间距（4px 网格）

```
1: 4px    5: 20px
2: 8px    6: 24px
3: 12px   8: 32px
4: 16px   10: 40px
          12: 48px
          16: 64px
```

### 圆角

```
sm: 4px      xl: 16px
md: 8px      2xl: 24px
lg: 12px     full: 9999px
```

### 阴影

```
sm:   0 1px 2px rgba(45, 122, 138, 0.05)
md:   0 2px 8px rgba(45, 122, 138, 0.08)
lg:   0 4px 16px rgba(45, 122, 138, 0.12)
xl:   0 8px 32px rgba(45, 122, 138, 0.16)
glow: 0 0 24px rgba(94, 196, 214, 0.3)
```

### 排版

```
H1: 32-40px    Body: 14px
H2: 24-32px    Caption: 12px
H3: 20-28px    Tiny: 10px
H4: 18-24px
```

## 🌙 暗色模式

```tsx
// 切换暗色模式
document.documentElement.classList.toggle("dark");

// 组件自动适配
<div className="bg-background text-foreground">
  内容（自动适配主题）
</div>
```

## ✅ 最佳实践

### 推荐做法 ✅

1. 使用品牌色保持一致性
2. 主按钮使用渐变效果
3. 保持圆角大小统一
4. 使用适当的阴影层级
5. 确保文本高对比度

### 避免做法 ❌

1. 混用多个主色调
2. 在大面积背景使用深色
3. 过度使用阴影
4. 浅色背景用浅色文字
5. 圆角大小不一致

## 🎭 动效

### 过渡时间

```tsx
className="transition-medkey-fast"    // 150ms
className="transition-medkey-normal"  // 200ms
className="transition-medkey-slow"    // 300ms
```

### 预设动画

```tsx
className="animate-fade-in"   // 淡入
className="animate-slide-up"  // 上滑
className="animate-scale-in"  // 缩放
className="animate-pulse-glow" // 脉冲发光
```

### 交互效果

```tsx
className="btn-hover-lift"     // 按钮悬停提升
className="card-hover-elevate" // 卡片悬停抬升
```

## 🔧 技术栈

- **React 18.3.1** - UI 框架
- **TypeScript 5.8.3** - 类型安全
- **TailwindCSS 3.4.17** - 样式系统
- **class-variance-authority** - 组件变体
- **Lucide Icons** - 图标库

## 📱 响应式断点

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## 🎯 设计原则

1. **专业** - 传达医疗行业的可信度
2. **现代** - 使用最新的设计趋势
3. **关怀** - 温和的圆角和色彩
4. **清晰** - 高对比度和易读性
5. **一致** - 统一的视觉语言

## 📚 更多资源

- [完整文档](./DESIGN_SYSTEM.md) - 详细的使用指南
- [快速参考](./QUICK_REFERENCE.md) - 常用 API 速查
- [实施总结](./IMPLEMENTATION_SUMMARY.md) - 技术细节和亮点

## 🤝 贡献

欢迎提交问题和改进建议！

## 📄 许可证

Copyright © 2026 MEDkey. All rights reserved.

---

<div align="center">
  <strong>MEDkey Design System</strong><br>
  <small>专业 · 信任 · 现代 · 关怀</small>
</div>
