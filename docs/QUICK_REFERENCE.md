# 🎨 MEDkey Design System - 快速参考

## 🚀 立即使用

开发服务器已启动！访问：

### 主应用
```
http://localhost:8082/
```

### 设计系统展示
```
http://localhost:8082/design-system
```

## 🎯 核心颜色

### 品牌色
```
深青色 (Teal Dark):  #2D7A8A  HSL(188, 50%, 36%)
浅青色 (Teal Light): #5EC4D6  HSL(188, 50%, 60%)
```

### 使用示例
```tsx
// CSS 类
<div className="bg-brand-teal-dark">深青背景</div>
<div className="text-brand-teal-light">浅青文字</div>

// 渐变
<div className="bg-gradient-medkey">品牌渐变</div>

// Design Token
import { colors } from "@/tokens/design-tokens";
style={{ backgroundColor: colors.brand.tealDark }}
```

## 🔧 常用组件

### 按钮
```tsx
import { Button } from "@/components/ui/button";

<Button variant="default">主要按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="accent">强调按钮</Button>
<Button variant="outline">边框按钮</Button>
<Button variant="success">成功按钮</Button>
<Button variant="warning">警告按钮</Button>
<Button variant="destructive">危险按钮</Button>

// 尺寸
<Button size="sm">小</Button>
<Button size="default">默认</Button>
<Button size="lg">大</Button>
<Button size="xl">超大</Button>
```

### 卡片
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>标题</CardTitle>
  </CardHeader>
  <CardContent>内容</CardContent>
</Card>
```

### 输入框
```tsx
import { Input } from "@/components/ui/input";

<Input placeholder="请输入..." />
```

## 📐 间距系统（4px 网格）

```
medkey-1:  4px    medkey-6:  24px
medkey-2:  8px    medkey-8:  32px
medkey-3:  12px   medkey-10: 40px
medkey-4:  16px   medkey-12: 48px
medkey-5:  20px   medkey-16: 64px
```

## 🎭 阴影

```
shadow-medkey-sm   - 小阴影
shadow-medkey-md   - 中等阴影
shadow-medkey-lg   - 大阴影
shadow-medkey-xl   - 超大阴影
shadow-medkey-glow - 发光效果
```

## 📝 排版

```
text-medkey-h1       - 32-40px (超大标题)
text-medkey-h2       - 24-32px (大标题)
text-medkey-h3       - 20-28px (中标题)
text-medkey-h4       - 18-24px (小标题)
text-medkey-body-lg  - 16px (正文大)
text-medkey-body     - 14px (正文)
text-medkey-caption  - 12px (辅助文本)
text-medkey-tiny     - 10px (极小文本)
```

## 🌙 暗色模式

```tsx
// 切换暗色模式
document.documentElement.classList.toggle("dark");

// 自动适配
<div className="bg-background text-foreground">
  内容（自动适配亮色/暗色）
</div>
```

## ✨ 动效

```tsx
// 过渡时间
className="transition-medkey-fast"    // 150ms
className="transition-medkey-normal"  // 200ms
className="transition-medkey-slow"    // 300ms

// 预设动画
className="animate-fade-in"   // 淡入
className="animate-slide-up"  // 上滑
className="animate-scale-in"  // 缩放

// 交互效果
className="btn-hover-lift"        // 按钮悬停提升
className="card-hover-elevate"    // 卡片悬停抬升
```

## 🎨 圆角

```
radius-medkey-sm   - 4px
radius-medkey-md   - 8px
radius-medkey-lg   - 12px
radius-medkey-xl   - 16px
radius-medkey-2xl  - 24px
radius-medkey-full - 圆形
```

## 📚 文件位置

```
src/
├── index.css                    # CSS 变量和工具类
├── tokens/
│   └── design-tokens.ts        # TypeScript Design Token
├── components/ui/
│   ├── button.tsx              # 按钮组件
│   ├── card.tsx                # 卡片组件
│   └── input.tsx               # 输入框组件
└── pages/
    └── DesignSystem.tsx        # 设计系统展示页面

DESIGN_SYSTEM.md                 # 完整使用文档
IMPLEMENTATION_SUMMARY.md        # 实施总结
```

## ✅ 最佳实践

### 推荐
- ✅ 使用品牌色保持一致性
- ✅ 使用渐变增加视觉吸引力
- ✅ 保持圆角大小统一
- ✅ 使用适当的阴影层级
- ✅ 确保文本高对比度

### 避免
- ❌ 混用多个主色调
- ❌ 在大面积背景使用深色
- ❌ 过度使用阴影
- ❌ 浅色背景用浅色文字
- ❌ 圆角大小不一致

## 🔗 链接

- [设计系统展示](http://localhost:8082/design-system)
- [完整文档](./DESIGN_SYSTEM.md)
- [实施总结](./IMPLEMENTATION_SUMMARY.md)

---

**MEDkey Design System v1.0.0**
专业 · 信任 · 现代 · 关怀
