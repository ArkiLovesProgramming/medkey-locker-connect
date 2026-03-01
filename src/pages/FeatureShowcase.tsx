import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MedicationIcon, 
  PrescriptionIcon, 
  ReminderIcon, 
  AlertIcon,
  CheckIcon,
  InfoIcon,
  TimeIcon,
  HeartHealthIcon,
  VitalSignsIcon,
  AppointmentIcon,
  ChatIcon,
  QRCodeIcon,
  FamilyIcon,
  PhoneIcon,
  LocationIcon,
  SearchIcon,
  PlusIcon,
  SettingsIcon,
  SecurityIcon,
  HomeIcon,
  UserProfileIcon,
} from "@/components/icons/medical-icons";
import { Bell, Mail, Calendar } from "lucide-react";
import { notifications, getUnreadNotifications } from "@/data/mockNotifications";

const FeatureShowcase = () => {
  const [activeTab, setActiveTab] = useState("icons");
  const unreadCount = getUnreadNotifications().length;

  // 图标分类展示
  const iconCategories = [
    {
      category: "医疗健康",
      icons: [
        { name: "MedicationIcon", component: MedicationIcon, desc: "药物" },
        { name: "PrescriptionIcon", component: PrescriptionIcon, desc: "处方" },
        { name: "HeartHealthIcon", component: HeartHealthIcon, desc: "心脏健康" },
        { name: "VitalSignsIcon", component: VitalSignsIcon, desc: "生命体征" },
        { name: "AppointmentIcon", component: AppointmentIcon, desc: "预约" },
      ],
    },
    {
      category: "功能操作",
      icons: [
        { name: "ReminderIcon", component: ReminderIcon, desc: "提醒" },
        { name: "ChatIcon", component: ChatIcon, desc: "聊天" },
        { name: "QRCodeIcon", component: QRCodeIcon, desc: "扫码" },
        { name: "PhoneIcon", component: PhoneIcon, desc: "电话" },
        { name: "LocationIcon", component: LocationIcon, desc: "位置" },
      ],
    },
    {
      category: "状态反馈",
      icons: [
        { name: "CheckIcon", component: CheckIcon, desc: "成功" },
        { name: "AlertIcon", component: AlertIcon, desc: "警告" },
        { name: "InfoIcon", component: InfoIcon, desc: "信息" },
        { name: "TimeIcon", component: TimeIcon, desc: "时间" },
      ],
    },
    {
      category: "导航与用户",
      icons: [
        { name: "HomeIcon", component: HomeIcon, desc: "首页" },
        { name: "UserProfileIcon", component: UserProfileIcon, desc: "用户" },
        { name: "FamilyIcon", component: FamilyIcon, desc: "家庭" },
        { name: "SearchIcon", component: SearchIcon, desc: "搜索" },
        { name: "PlusIcon", component: PlusIcon, desc: "添加" },
      ],
    },
    {
      category: "设置与安全",
      icons: [
        { name: "SettingsIcon", component: SettingsIcon, desc: "设置" },
        { name: "SecurityIcon", component: SecurityIcon, desc: "安全" },
      ],
    },
  ];

  // 通知展示
  const notificationExamples = [
    {
      type: "prescription-ready",
      title: "处方已备好",
      message: "阿莫西林已备好，可在 MEDkey 储物柜 A-12 取药",
      icon: PrescriptionIcon,
      variant: "success" as const,
      time: "30 分钟前",
    },
    {
      type: "refill-reminder",
      title: "补药提醒",
      message: "David 的阿托伐他汀需要补药了",
      icon: MedicationIcon,
      variant: "warning" as const,
      time: "2 小时前",
    },
    {
      type: "medication-reminder",
      title: "服药时间到",
      message: "Sarah，该服用赖诺普利 10mg 了",
      icon: ReminderIcon,
      variant: "brand" as const,
      time: "4 小时前",
    },
    {
      type: "message",
      title: "药师消息",
      message: "陈医生发送了关于阿莫西林的消息",
      icon: ChatIcon,
      variant: "accent" as const,
      time: "5 小时前",
    },
  ];

  // 实际应用场景
  const useCases = [
    {
      title: "药物列表",
      description: "在药物列表中使用 MedicationIcon",
      component: (
        <div className="space-y-3">
          {[
            { name: "阿司匹林 100mg", dose: "每日一次", taken: true },
            { name: "阿托伐他汀 20mg", dose: "每晚一次", taken: false },
            { name: "赖诺普利 10mg", dose: "每日两次", taken: true },
          ].map((med, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-4 flex items-center gap-3">
                <MedicationIcon size="lg" variant={med.taken ? "success" : "brand"} />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{med.name}</p>
                  <p className="text-xs text-muted-foreground">{med.dose}</p>
                </div>
                {med.taken ? (
                  <CheckIcon size="md" variant="success" />
                ) : (
                  <TimeIcon size="md" variant="default" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ),
    },
    {
      title: "通知中心",
      description: "使用不同图标区分通知类型",
      component: (
        <div className="space-y-3">
          {notificationExamples.slice(0, 3).map((notif, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-4 flex gap-3">
                <notif.icon size="lg" variant={notif.variant} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{notif.title}</p>
                    <Badge variant="secondary" className="text-xs">{notif.time}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ),
    },
    {
      title: "底部导航",
      description: "使用医疗图标提升品牌感",
      component: (
        <div className="bg-card border-t rounded-lg p-4">
          <div className="flex justify-around">
            {[
              { icon: HomeIcon, label: "首页", active: true },
              { icon: MedicationIcon, label: "药物", active: false },
              { icon: QRCodeIcon, label: "取药", active: false },
              { icon: ChatIcon, label: "聊天", active: false },
              { icon: UserProfileIcon, label: "我的", active: false },
            ].map((item, i) => (
              <button
                key={i}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  item.active ? "text-brand-teal-dark" : "text-muted-foreground"
                }`}
              >
                <item.icon size="lg" variant={item.active ? "brand" : "default"} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "预约卡片",
      description: "组合使用多个图标",
      component: (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AppointmentIcon size="lg" variant="success" />
              <CardTitle className="text-base">预约医生</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <TimeIcon size="md" variant="default" />
              <span>明天 10:00</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <LocationIcon size="md" variant="warning" />
              <span>市中心诊所 3 楼</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <PhoneIcon size="md" variant="success" />
              <span>+1 234-567-8900</span>
            </div>
            <Button className="w-full mt-2" size="sm">
              确认预约
            </Button>
          </CardContent>
        </Card>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-medkey bg-clip-text text-transparent">
                MEDkey 功能展示
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                46+ 医疗图标 · 完整通知系统 · 品牌化 UI 组件
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="relative">
                <Bell className="w-4 h-4 mr-2" />
                通知
                {unreadCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full flex items-center justify-center p-0 bg-brand-teal-dark">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-2" />
                消息
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">医疗图标</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brand-teal-dark">46+</div>
              <p className="text-xs text-muted-foreground mt-1">覆盖 11 个分类</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">通知类型</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-brand-teal-dark">7</div>
              <p className="text-xs text-muted-foreground mt-1">完整通知系统</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">未读通知</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">{unreadCount}</div>
              <p className="text-xs text-muted-foreground mt-1">待处理</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">组件优化</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">4</div>
              <p className="text-xs text-muted-foreground mt-1">核心组件增强</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="icons">🎨 图标展示</TabsTrigger>
            <TabsTrigger value="notifications">🔔 通知系统</TabsTrigger>
            <TabsTrigger value="usecases">💡 实际场景</TabsTrigger>
          </TabsList>

          {/* 图标展示 */}
          <TabsContent value="icons" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">医疗图标集</h2>
              <p className="text-muted-foreground mb-6">
                46+ 专业医疗图标，支持 4 种尺寸和 6 种颜色变体
              </p>
            </div>

            {iconCategories.map((category, catIndex) => (
              <Card key={catIndex}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                  <CardDescription>
                    {category.icons.length} 个图标
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {category.icons.map((icon, iconIndex) => (
                      <div
                        key={iconIndex}
                        className="flex flex-col items-center p-4 rounded-lg border bg-card hover:border-brand-teal-light/50 transition-colors"
                      >
                        <icon.component size="xl" />
                        <p className="text-xs font-medium mt-2 text-center">{icon.desc}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{icon.name}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* 尺寸和颜色展示 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">尺寸规格</CardTitle>
                <CardDescription>4 种尺寸选择</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-6 py-4">
                  <div className="flex flex-col items-center gap-2">
                    <MedicationIcon size="sm" />
                    <span className="text-xs">sm (16px)</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <MedicationIcon size="md" />
                    <span className="text-xs">md (20px)</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <MedicationIcon size="lg" />
                    <span className="text-xs">lg (24px)</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <MedicationIcon size="xl" />
                    <span className="text-xs">xl (32px)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">颜色变体</CardTitle>
                <CardDescription>6 种颜色变体</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="flex flex-col items-center gap-2 p-3 rounded-lg border">
                    <CheckIcon variant="default" size="lg" />
                    <span className="text-xs">default</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 rounded-lg border">
                    <CheckIcon variant="brand" size="lg" />
                    <span className="text-xs">brand</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 rounded-lg border">
                    <CheckIcon variant="accent" size="lg" />
                    <span className="text-xs">accent</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 rounded-lg border">
                    <CheckIcon variant="success" size="lg" />
                    <span className="text-xs">success</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 rounded-lg border">
                    <CheckIcon variant="warning" size="lg" />
                    <span className="text-xs">warning</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 rounded-lg border">
                    <CheckIcon variant="error" size="lg" />
                    <span className="text-xs">error</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 通知系统 */}
          <TabsContent value="notifications" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">通知系统</h2>
              <p className="text-muted-foreground mb-6">
                7 种通知类型，完整的提醒功能
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {notificationExamples.map((notif, i) => (
                <Card key={i} className="border-l-4 border-l-brand-teal-dark">
                  <CardContent className="p-4 flex gap-4">
                    <div className="flex-shrink-0">
                      <notif.icon size="lg" variant={notif.variant} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="font-semibold">{notif.title}</p>
                          <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {notif.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-muted-foreground">{notif.time}</span>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          查看详情
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          标记已读
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">通知统计</CardTitle>
                <CardDescription>完整的通知数据支持</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg bg-brand-teal-light/10">
                    <p className="text-2xl font-bold text-brand-teal-dark">{notifications.length}</p>
                    <p className="text-xs text-muted-foreground mt-1">总通知数</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-warning-light/10">
                    <p className="text-2xl font-bold text-warning">{getUnreadNotifications().length}</p>
                    <p className="text-xs text-muted-foreground mt-1">未读通知</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-success-light/10">
                    <p className="text-2xl font-bold text-success">7</p>
                    <p className="text-xs text-muted-foreground mt-1">通知类型</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-accent/10">
                    <p className="text-2xl font-bold text-accent-foreground">100%</p>
                    <p className="text-xs text-muted-foreground mt-1">功能完整</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 实际场景 */}
          <TabsContent value="usecases" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">实际应用场景</h2>
              <p className="text-muted-foreground mb-6">
                图标和通知系统在实际业务中的使用示例
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {useCases.map((useCase, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-base">{useCase.title}</CardTitle>
                    <CardDescription>{useCase.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {useCase.component}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 快速集成指南 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🚀 快速开始</CardTitle>
                <CardDescription>3 步即可使用新图标</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-teal-dark text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-sm">导入图标</p>
                      <pre className="bg-muted p-2 rounded text-xs mt-1 overflow-x-auto">
                        <code>{`import { MedicationIcon } from '@/components/icons/medical-icons';`}</code>
                      </pre>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-teal-dark text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-sm">选择尺寸和颜色</p>
                      <pre className="bg-muted p-2 rounded text-xs mt-1 overflow-x-auto">
                        <code>{`<MedicationIcon size="lg" variant="brand" />`}</code>
                      </pre>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-teal-dark text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-sm">完成！</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        图标会自动应用品牌色和过渡动画
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center py-8 border-t">
          <p className="text-sm text-muted-foreground">
            MEDkey Design System · 46+ 医疗图标 · 完整通知系统
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            访问 /design-system 查看完整设计系统
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
