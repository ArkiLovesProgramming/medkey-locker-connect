# MEDkey Design System 使用指南

## 概述

MEDkey Design System 是一个基于 React + TypeScript + TailwindCSS 的完整设计系统，专为医疗健康应用设计。系统以 MEDkey 品牌色（深青和浅青）为核心，提供统一的视觉语言和组件库。

## 快速开始

### 1. 安装依赖

所有必要的依赖已在 `package.json` 中配置。

### 2. 使用组件

```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>标题</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="输入..." />
        <Button className="mt-4">点击</Button>
      </CardContent>
    </Card>
  );
}
```

### 3. 使用设计 Token

```tsx
import { colors, spacing, shadows } from "@/tokens/design-tokens";

// 在样式中使用
const style = {
  backgroundColor: colors.brand.tealDark,
  padding: spacing[4],
  boxShadow: shadows.md,
};
```

## 颜色系统

### 品牌色

```tsx
// CSS 类名
<div className="bg-brand-teal-dark">深青背景</div>
<div className="text-brand-teal-light">浅青文字</div>
<div className="border-brand-teal-light">浅青边框</div>

// Tailwind 任意值
<div style={{ backgroundColor: 'hsl(188 50% 36%)' }}>内容</div>

// Design Token
import { colors } from "@/tokens/design-tokens";
<div style={{ backgroundColor: colors.brand.tealDark }}>内容</div>
```

### 渐变色

```tsx
<div className="bg-gradient-medkey">MEDkey 渐变</div>
<div className="bg-gradient-medkey-subtle">柔和渐变</div>
<div className="bg-gradient-medkey-light">浅色渐变</div>
```

### 状态色

```tsx
// 成功
<div className="bg-success text-white">成功</div>
<div className="bg-success-light">成功背景</div>

// 警告
<div className="bg-warning text-white">警告</div>
<div className="bg-warning-light">警告背景</div>

// 错误
<div className="bg-destructive text-white">错误</div>

// 信息
<div className="bg-info text-white">信息</div>
<div className="bg-info-light">信息背景</div>
```

## 组件使用

### 按钮 (Button)

```tsx
import { Button } from "@/components/ui/button";

// 变体
<Button variant="default">主要按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="accent">强调按钮</Button>
<Button variant="outline">边框按钮</Button>
<Button variant="ghost">幽灵按钮</Button>
<Button variant="link">链接按钮</Button>
<Button variant="success">成功按钮</Button>
<Button variant="warning">警告按钮</Button>
<Button variant="destructive">危险按钮</Button>

// 尺寸
<Button size="sm">小按钮</Button>
<Button size="default">默认按钮</Button>
<Button size="lg">大按钮</Button>
<Button size="xl">超大按钮</Button>
<Button size="icon">📧</Button>
```

### 卡片 (Card)

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>卡片标题</CardTitle>
    <CardDescription>卡片描述</CardDescription>
  </CardHeader>
  <CardContent>
    卡片内容
  </CardContent>
</Card>
```

### 输入框 (Input)

```tsx
import { Input } from "@/components/ui/input";

<Input placeholder="请输入..." />
<Input disabled placeholder="已禁用" />
<Input type="email" placeholder="邮箱" />
```

## 间距系统

基于 4px 网格的间距系统：

```tsx
// Tailwind 自定义间距
<div className="p-medkey-4">padding: 16px</div>
<div className="m-medkey-6">margin: 24px</div>
<div className="gap-medkey-8">gap: 32px</div>

// CSS 变量
<div style={{ padding: 'var(--medkey-space-4)' }}>内容</div>

// Design Token
import { spacing } from "@/tokens/design-tokens";
<div style={{ padding: spacing[4] }}>内容</div>
```

可用间距值：
- `medkey-1`: 4px
- `medkey-2`: 8px
- `medkey-3`: 12px
- `medkey-4`: 16px
- `medkey-5`: 20px
- `medkey-6`: 24px
- `medkey-8`: 32px
- `medkey-10`: 40px
- `medkey-12`: 48px
- `medkey-16`: 64px

## 圆角系统

```tsx
<div className="radius-medkey-sm">4px 圆角</div>
<div className="radius-medkey-md">8px 圆角</div>
<div className="radius-medkey-lg">12px 圆角</div>
<div className="radius-medkey-xl">16px 圆角</div>
<div className="radius-medkey-2xl">24px 圆角</div>
<div className="radius-medkey-full">圆形</div>
```

## 阴影系统

```tsx
<div className="shadow-medkey-sm">小阴影</div>
<div className="shadow-medkey-md">中等阴影</div>
<div className="shadow-medkey-lg">大阴影</div>
<div className="shadow-medkey-xl">超大阴影</div>
<div className="shadow-medkey-glow">发光效果</div>
```

## 排版系统

### 字体层级

```tsx
<h1 className="text-medkey-h1">H1 超大标题</h1>
<h2 className="text-medkey-h2">H2 大标题</h2>
<h3 className="text-medkey-h3">H3 中标题</h3>
<h4 className="text-medkey-h4">H4 小标题</h4>
<p className="text-medkey-body-lg">正文 Large</p>
<p className="text-medkey-body">正文 Regular</p>
<p className="text-medkey-caption">辅助文本</p>
<p className="text-medkey-tiny">极小文本</p>
```

### 字重

```tsx
<p className="font-bold">粗体 (700)</p>
<p className="font-semibold">半粗体 (600)</p>
<p className="font-medium">中等 (500)</p>
<p className="font-normal">常规 (400)</p>
```

## 动效系统

### 过渡时间

```tsx
<div className="transition-medkey-fast">快速 (150ms)</div>
<div className="transition-medkey-normal">标准 (200ms)</div>
<div className="transition-medkey-slow">慢速 (300ms)</div>
```

### 预设动画

```tsx
<div className="animate-fade-in">淡入</div>
<div className="animate-slide-up">上滑</div>
<div className="animate-scale-in">缩放</div>
<div className="animate-pulse-glow">脉冲发光</div>
```

### 交互效果

```tsx
// 按钮悬停提升
<button className="btn-hover-lift">悬停提升</button>

// 卡片悬停抬升
<Card className="card-hover-elevate">悬停抬升</Card>
```

## 焦点状态

```tsx
<Input className="focus-medkey" />
<Button className="focus-medkey">按钮</Button>
```

## 暗色模式

### 启用暗色模式

```tsx
// 切换暗色模式
document.documentElement.classList.toggle("dark");

// 在组件中
useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [darkMode]);
```

### 暗色模式样式

```tsx
// 自动适配暗色模式
<div className="bg-background text-foreground">内容</div>
<div className="dark:bg-card">暗色模式卡片背景</div>
```

## 最佳实践

### ✅ 推荐做法

1. **使用品牌色**
   ```tsx
   // 好
   <Button variant="default">主要操作</Button>
   
   // 避免
   <Button style={{ backgroundColor: '#random' }}>随机颜色</Button>
   ```

2. **保持一致的圆角**
   ```tsx
   // 好 - 统一使用 12px
   <Card className="radius-medkey-lg" />
   <Button className="radius-medkey-lg" />
   
   // 避免 - 混用不同圆角
   <Card style={{ borderRadius: '5px' }} />
   ```

3. **适当的阴影层级**
   ```tsx
   // 好 - 根据重要性选择阴影
   <Card className="shadow-medkey-md">普通卡片</Card>
   <Card className="shadow-medkey-xl">重要卡片</Card>
   
   // 避免 - 过度使用大阴影
   <Card className="shadow-medkey-xl">每个卡片都用最大阴影</Card>
   ```

4. **高对比度文本**
   ```tsx
   // 好
   <p className="text-foreground">深色文本</p>
   <p className="text-muted-foreground">次要文本</p>
   
   // 避免
   <p className="text-brand-teal-light/30">对比度太低</p>
   ```

### ❌ 避免做法

1. 不要混用多个主色调
2. 避免在大面积背景使用深色
3. 不要过度使用阴影
4. 避免在浅色背景使用浅色文字
5. 避免圆角大小不一致

## 设计 Token

完整的 Design Token 定义在 `src/tokens/design-tokens.ts`：

```tsx
import { 
  colors, 
  spacing, 
  shadows, 
  borderRadius,
  typography,
  animation 
} from "@/tokens/design-tokens";

// 使用示例
const cardStyle = {
  backgroundColor: colors.card,
  padding: spacing[6],
  borderRadius: borderRadius.lg,
  boxShadow: shadows.md,
};
```

## 访问设计系统展示页面

访问 `/design-system` 路由查看完整的设计系统展示和交互示例。

```tsx
// 在浏览器中访问
http://localhost:5173/design-system
```

## 更新日志

### v1.0.0
- ✨ 初始版本
- 🎨 MEDkey 品牌色系统
- 🔧 完整的组件库
- 📐 间距、圆角、阴影系统
- 🌙 暗色模式支持
- 📱 响应式设计
- ♿ 无障碍优化

## 支持

如有问题或建议，请联系设计团队。
