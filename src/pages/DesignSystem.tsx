import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, X, AlertCircle, Info } from "lucide-react";

const DesignSystem = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-medkey bg-clip-text text-transparent">
                MEDkey Design System
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                UI 设计系统与组件展示
              </p>
            </div>
            <Button onClick={toggleDarkMode} variant="outline">
              {darkMode ? "☀️ 浅色模式" : "🌙 深色模式"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Brand Colors */}
        <section>
          <h2 className="text-medkey-h2 mb-6">品牌色彩</h2>
          <Card>
            <CardHeader>
              <CardTitle>主色调 - MEDkey Teal</CardTitle>
              <CardDescription>
                从 logo 提取的两种主色，传达专业、信任和现代感
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="h-32 rounded-xl bg-brand-teal-dark shadow-medkey-lg flex items-end p-4">
                    <span className="text-white font-medium">Teal Dark</span>
                  </div>
                  <div className="text-sm">
                    <p className="font-mono">#2D7A8A</p>
                    <p className="text-muted-foreground">HSL: 188° 50% 36%</p>
                    <p className="text-xs text-muted-foreground mt-1">用于：主按钮、重要文本、品牌强调</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-32 rounded-xl bg-brand-teal-light shadow-medkey-lg flex items-end p-4">
                    <span className="text-white font-medium">Teal Light</span>
                  </div>
                  <div className="text-sm">
                    <p className="font-mono">#5EC4D6</p>
                    <p className="text-muted-foreground">HSL: 188° 50% 60%</p>
                    <p className="text-xs text-muted-foreground mt-1">用于：次要按钮、高亮、图标</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Status Colors */}
        <section>
          <h2 className="text-medkey-h2 mb-6">状态色彩</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-success flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-success">Success</p>
                    <p className="text-xs text-muted-foreground">成功状态</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-warning flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-warning">Warning</p>
                    <p className="text-xs text-muted-foreground">警告状态</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-destructive flex items-center justify-center">
                    <X className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-destructive">Error</p>
                    <p className="text-xs text-muted-foreground">错误状态</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-info flex items-center justify-center">
                    <Info className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-info">Info</p>
                    <p className="text-xs text-muted-foreground">信息状态</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-medkey-h2 mb-6">按钮系统</h2>
          <Card>
            <CardHeader>
              <CardTitle>按钮变体</CardTitle>
              <CardDescription>不同的按钮样式用于不同的场景</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">主要按钮</Button>
                <Button variant="secondary">次要按钮</Button>
                <Button variant="accent">强调按钮</Button>
                <Button variant="outline">边框按钮</Button>
                <Button variant="ghost">幽灵按钮</Button>
                <Button variant="link">链接按钮</Button>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                <Button variant="success">成功按钮</Button>
                <Button variant="warning">警告按钮</Button>
                <Button variant="destructive">危险按钮</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>按钮尺寸</CardTitle>
              <CardDescription>从小到大的五种尺寸</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">小按钮</Button>
                <Button size="default">默认按钮</Button>
                <Button size="lg">大按钮</Button>
                <Button size="xl">超大按钮</Button>
                <Button size="icon">📧</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-medkey-h2 mb-6">排版系统</h2>
          <Card>
            <CardHeader>
              <CardTitle>字体层级</CardTitle>
              <CardDescription>基于 DM Sans 的排版系统</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h1 className="text-medkey-h1">H1 - 超大标题 (32-40px)</h1>
                <p className="text-xs text-muted-foreground mt-1">font-bold, leading-tight</p>
              </div>
              <div>
                <h2 className="text-medkey-h2">H2 - 大标题 (24-32px)</h2>
                <p className="text-xs text-muted-foreground mt-1">font-bold, leading-snug</p>
              </div>
              <div>
                <h3 className="text-medkey-h3">H3 - 中标题 (20-28px)</h3>
                <p className="text-xs text-muted-foreground mt-1">font-semibold, leading-snug</p>
              </div>
              <div>
                <h4 className="text-medkey-h4">H4 - 小标题 (18-24px)</h4>
                <p className="text-xs text-muted-foreground mt-1">font-semibold, leading-normal</p>
              </div>
              <div>
                <p className="text-medkey-body-lg">正文 Large (16px)</p>
                <p className="text-xs text-muted-foreground mt-1">leading-relaxed</p>
              </div>
              <div>
                <p className="text-medkey-body">正文 Regular (14px)</p>
                <p className="text-xs text-muted-foreground mt-1">leading-relaxed</p>
              </div>
              <div>
                <p className="text-medkey-caption">辅助文本/Caption (12px)</p>
                <p className="text-xs text-muted-foreground mt-1">leading-normal</p>
              </div>
              <div>
                <p className="text-medkey-tiny">极小文本 (10px)</p>
                <p className="text-xs text-muted-foreground mt-1">leading-tight</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Shadows */}
        <section>
          <h2 className="text-medkey-h2 mb-6">阴影系统</h2>
          <Card>
            <CardHeader>
              <CardTitle>阴影层级</CardTitle>
              <CardDescription>基于 MEDkey 主题色的阴影系统</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <div className="h-20 bg-card rounded-lg shadow-medkey-sm flex items-center justify-center">
                    <span className="text-xs">SM</span>
                  </div>
                  <p className="text-xs text-center font-mono">shadow-medkey-sm</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-card rounded-lg shadow-medkey-md flex items-center justify-center">
                    <span className="text-xs">MD</span>
                  </div>
                  <p className="text-xs text-center font-mono">shadow-medkey-md</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-card rounded-lg shadow-medkey-lg flex items-center justify-center">
                    <span className="text-xs">LG</span>
                  </div>
                  <p className="text-xs text-center font-mono">shadow-medkey-lg</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-card rounded-lg shadow-medkey-xl flex items-center justify-center">
                    <span className="text-xs">XL</span>
                  </div>
                  <p className="text-xs text-center font-mono">shadow-medkey-xl</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-card rounded-lg shadow-medkey-glow flex items-center justify-center">
                    <span className="text-xs">GLOW</span>
                  </div>
                  <p className="text-xs text-center font-mono">shadow-medkey-glow</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Spacing */}
        <section>
          <h2 className="text-medkey-h2 mb-6">间距系统</h2>
          <Card>
            <CardHeader>
              <CardTitle>基于 4px 网格的间距</CardTitle>
              <CardDescription>统一的间距规范</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map((size) => (
                  <div key={size} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-mono">
                      {size * 4}px
                    </div>
                    <div 
                      className="bg-brand-teal-light/30 border border-brand-teal-dark/20 rounded"
                      style={{ width: `${size * 4}px`, height: '32px' }}
                    />
                    <span className="text-xs text-muted-foreground">
                      space-medkey-{size}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Border Radius */}
        <section>
          <h2 className="text-medkey-h2 mb-6">圆角系统</h2>
          <Card>
            <CardHeader>
              <CardTitle>圆角层级</CardTitle>
              <CardDescription>从小到大的圆角选择</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="space-y-2">
                  <div className="h-20 bg-card border rounded-sm flex items-center justify-center">
                    <span className="text-xs">4px</span>
                  </div>
                  <p className="text-xs text-center font-mono">radius-medkey-sm</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-card border rounded-md flex items-center justify-center">
                    <span className="text-xs">8px</span>
                  </div>
                  <p className="text-xs text-center font-mono">radius-medkey-md</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-card border rounded-lg flex items-center justify-center">
                    <span className="text-xs">12px</span>
                  </div>
                  <p className="text-xs text-center font-mono">radius-medkey-lg</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-card border rounded-xl flex items-center justify-center">
                    <span className="text-xs">16px</span>
                  </div>
                  <p className="text-xs text-center font-mono">radius-medkey-xl</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-card border rounded-2xl flex items-center justify-center">
                    <span className="text-xs">24px</span>
                  </div>
                  <p className="text-xs text-center font-mono">radius-medkey-2xl</p>
                </div>
                <div className="space-y-2">
                  <div className="h-20 bg-card border rounded-full flex items-center justify-center">
                    <span className="text-xs">∞</span>
                  </div>
                  <p className="text-xs text-center font-mono">radius-medkey-full</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Input Fields */}
        <section>
          <h2 className="text-medkey-h2 mb-6">输入框</h2>
          <Card>
            <CardHeader>
              <CardTitle>表单元素</CardTitle>
              <CardDescription>带有 MEDkey 主题的输入框样式</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">默认输入框</label>
                <Input placeholder="请输入..." />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">带焦点样式的输入框</label>
                <Input placeholder="点击输入框查看焦点效果" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">禁用状态</label>
                <Input placeholder="已禁用" disabled />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Gradients */}
        <section>
          <h2 className="text-medkey-h2 mb-6">渐变效果</h2>
          <Card>
            <CardHeader>
              <CardTitle>MEDkey 渐变</CardTitle>
              <CardDescription>品牌特色的渐变效果</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="h-24 rounded-xl bg-gradient-medkey shadow-medkey-lg" />
                  <p className="text-xs text-center font-mono">bg-gradient-medkey</p>
                  <p className="text-xs text-center text-muted-foreground">深青 → 浅青</p>
                </div>
                <div className="space-y-2">
                  <div className="h-24 rounded-xl bg-gradient-medkey-subtle shadow-medkey-md" />
                  <p className="text-xs text-center font-mono">bg-gradient-medkey-subtle</p>
                  <p className="text-xs text-center text-muted-foreground">深青 → 中青</p>
                </div>
                <div className="space-y-2">
                  <div className="h-24 rounded-xl bg-gradient-medkey-light border" />
                  <p className="text-xs text-center font-mono">bg-gradient-medkey-light</p>
                  <p className="text-xs text-center text-muted-foreground">极浅青 → 浅青</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Usage Guidelines */}
        <section>
          <h2 className="text-medkey-h2 mb-6">使用指南</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-success flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  推荐做法
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>主按钮使用深青到浅青的渐变</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>重要操作使用深青色</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>卡片和容器保持白色/浅色背景</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>文本保持高对比度</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>图标使用浅青色增加活力</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <X className="w-5 h-5" />
                  避免做法
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span>避免在大面积背景使用深色</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span>不要混用多个主色调</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span>避免过度使用阴影</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span>不要在浅色背景使用浅色文字</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span>避免圆角大小不一致</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DesignSystem;
