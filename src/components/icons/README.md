# MEDkey 图标使用规范

## 概述

MEDkey 图标系统提供了一套统一的、符合医疗行业特点的图标组件，所有图标都基于品牌色彩系统进行设计。

## 核心组件

### Icon 基础组件

所有图标都基于 `Icon` 组件构建，支持以下属性：

```tsx
interface IconProps {
  variant?: 'default' | 'brand' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}
```

## 尺寸规范

| 尺寸 | 大小 | 使用场景 | 示例 |
|------|------|----------|------|
| `sm` | 16px | 辅助文本、标签、小按钮 | `<Icon size="sm" />` |
| `md` | 20px | 正文、标准按钮、列表项 | `<Icon size="md" />` |
| `lg` | 24px | 标题、导航、卡片 | `<Icon size="lg" />` |
| `xl` | 32px | 展示、强调、空状态 | `<Icon size="xl" />` |

## 颜色规范

### 品牌色

```tsx
// 深青色 - 主要操作、品牌强调
<Icon variant="brand" />
// 使用场景：主按钮、重要功能入口

// 浅青色 - 高亮、选中状态
<Icon variant="accent" />
// 使用场景：次级强调、链接
```

### 状态色

```tsx
// 绿色 - 成功、完成状态
<Icon variant="success" />
// 使用场景：已完成、健康指标正常

// 橙色 - 警告、注意提示
<Icon variant="warning" />
// 使用场景：待处理、需要注意

// 红色 - 错误、危险操作
<Icon variant="error" />
// 使用场景：删除、警告、错误状态

// 默认灰色 - 次要信息、禁用状态
<Icon variant="default" />
// 使用场景：辅助说明、未激活状态
```

## 医疗专用图标分类

### 1. 药物相关 (Medication)

```tsx
import { MedicationIcon, PrescriptionIcon, RefillIcon } from '@/components/icons/medical-icons';

// 药物图标 - 深青色
<MedicationIcon size="lg" />

// 处方图标 - 浅青色
<PrescriptionIcon size="lg" />

// 补药图标 - 深青色
<RefillIcon size="lg" />
```

### 2. 健康监测 (Health Monitoring)

```tsx
import { 
  HeartHealthIcon, 
  VitalSignsIcon, 
  TemperatureIcon,
  InjectionIcon 
} from '@/components/icons/medical-icons';

// 心脏健康 - 绿色
<HeartHealthIcon size="lg" />

// 生命体征 - 橙色
<VitalSignsIcon size="lg" />

// 体温 - 橙色
<TemperatureIcon size="lg" />

// 注射 - 深青色
<InjectionIcon size="lg" />
```

### 3. 预约与时间 (Appointments)

```tsx
import { 
  AppointmentIcon, 
  ReminderIcon, 
  TimeIcon 
} from '@/components/icons/medical-icons';

// 预约 - 绿色
<AppointmentIcon size="lg" />

// 提醒 - 橙色
<ReminderIcon size="lg" />

// 时间 - 灰色
<TimeIcon size="lg" />
```

### 4. 用户与家庭 (Users)

```tsx
import { UserProfileIcon, FamilyIcon } from '@/components/icons/medical-icons';

// 用户资料 - 深青色
<UserProfileIcon size="lg" />

// 家庭成员 - 浅青色
<FamilyIcon size="lg" />
```

### 5. 沟通 (Communication)

```tsx
import { 
  PhoneIcon, 
  EmailIcon, 
  ChatIcon, 
  VideoCallIcon 
} from '@/components/icons/medical-icons';

// 电话 - 绿色
<PhoneIcon size="lg" />

// 邮件 - 深青色
<EmailIcon size="lg" />

// 聊天 - 浅青色
<ChatIcon size="lg" />

// 视频通话 - 绿色
<VideoCallIcon size="lg" />
```

### 6. 位置与导航 (Location)

```tsx
import { LocationIcon, HomeIcon, PharmacyIcon } from '@/components/icons/medical-icons';

// 位置 - 橙色
<LocationIcon size="lg" />

// 首页 - 深青色
<HomeIcon size="lg" />

// 药房 - 深青色
<PharmacyIcon size="lg" />
```

### 7. 操作按钮 (Actions)

```tsx
import { 
  SearchIcon, 
  FilterIcon, 
  DownloadIcon, 
  UploadIcon,
  PrintIcon,
  ShareIcon
} from '@/components/icons/medical-icons';

// 搜索 - 灰色
<SearchIcon size="md" />

// 筛选 - 灰色
<FilterIcon size="md" />

// 下载 - 深青色
<DownloadIcon size="md" />

// 上传 - 深青色
<UploadIcon size="md" />

// 打印 - 灰色
<PrintIcon size="md" />

// 分享 - 浅青色
<ShareIcon size="md" />
```

### 8. 状态反馈 (Status)

```tsx
import { 
  CheckIcon, 
  CloseIcon, 
  AlertIcon, 
  InfoIcon,
  StarIcon,
  BookmarkIcon
} from '@/components/icons/medical-icons';

// 完成 - 绿色
<CheckIcon size="md" />

// 关闭 - 灰色
<CloseIcon size="md" />

// 警告 - 橙色
<AlertIcon size="md" />

// 信息 - 浅青色
<InfoIcon size="md" />

// 收藏 - 橙色
<StarIcon size="md" />

// 书签 - 深青色
<BookmarkIcon size="md" />
```

### 9. 导航 (Navigation)

```tsx
import { 
  ChevronRightIcon, 
  ChevronLeftIcon, 
  PlusIcon, 
  MinusIcon,
  MoreIcon
} from '@/components/icons/medical-icons';

// 右箭头 - 灰色
<ChevronRightIcon size="md" />

// 左箭头 - 灰色
<ChevronLeftIcon size="md" />

// 添加 - 深青色
<PlusIcon size="md" />

// 移除 - 灰色
<MinusIcon size="md" />

// 更多 - 灰色
<MoreIcon size="md" />
```

### 10. 安全与设置 (Security)

```tsx
import { 
  SettingsIcon, 
  LogoutIcon, 
  SecurityIcon,
  LockIcon,
  UnlockIcon
} from '@/components/icons/medical-icons';

// 设置 - 灰色
<SettingsIcon size="md" />

// 退出 - 橙色
<LogoutIcon size="md" />

// 安全 - 绿色
<SecurityIcon size="md" />

// 锁定 - 橙色
<LockIcon size="md" />

// 解锁 - 绿色
<UnlockIcon size="md" />
```

### 11. 特色功能 (Special Features)

```tsx
import { 
  QRCodeIcon, 
  FastServiceIcon, 
  EyeIcon,
  CameraIcon,
  MicrophoneIcon
} from '@/components/icons/medical-icons';

// 二维码 - 深青色
<QRCodeIcon size="lg" />

// 快速服务 - 橙色
<FastServiceIcon size="lg" />

// 查看 - 深青色
<EyeIcon size="md" />

// 相机 - 浅青色
<CameraIcon size="md" />

// 麦克风 - 深青色
<MicrophoneIcon size="md" />
```

## 使用示例

### 基础使用

```tsx
import { Icon } from '@/components/ui/icon';
import { Pill } from 'lucide-react';

// 基础图标
<Icon>
  <Pill />
</Icon>

// 带变体
<Icon variant="brand">
  <Pill />
</Icon>

// 带动画
<Icon variant="success" animated>
  <Pill />
</Icon>
```

### 医疗图标使用

```tsx
import { MedicationIcon, PrescriptionIcon } from '@/components/icons/medical-icons';

// 药物列表项
<div className="flex items-center gap-3">
  <MedicationIcon size="lg" />
  <span>阿司匹林 100mg</span>
</div>

// 处方详情卡片
<Card>
  <CardHeader>
    <div className="flex items-center gap-2">
      <PrescriptionIcon size="lg" />
      <CardTitle>处方详情</CardTitle>
    </div>
  </CardHeader>
</Card>
```

### 按钮中的图标

```tsx
import { PlusIcon, SearchIcon } from '@/components/icons/medical-icons';

// 添加按钮
<Button>
  <PlusIcon size="md" />
  添加药物
</Button>

// 搜索按钮
<Button variant="outline">
  <SearchIcon size="md" />
  搜索
</Button>
```

### 导航图标

```tsx
import { 
  HomeIcon, 
  MedicationIcon, 
  QRCodeIcon, 
  ChatIcon, 
  UserProfileIcon 
} from '@/components/icons/medical-icons';

// 底部导航
<nav className="flex justify-around">
  <button className="flex flex-col items-center">
    <HomeIcon variant={isActive ? 'brand' : 'default'} size="lg" />
    <span>首页</span>
  </button>
  <button className="flex flex-col items-center">
    <MedicationIcon variant={isActive ? 'brand' : 'default'} size="lg" />
    <span>药物</span>
  </button>
  <button className="flex flex-col items-center">
    <QRCodeIcon variant={isActive ? 'brand' : 'default'} size="lg" />
    <span>取药</span>
  </button>
</nav>
```

### 状态指示

```tsx
import { CheckIcon, AlertIcon, InfoIcon } from '@/components/icons/medical-icons';

// 成功状态
<div className="flex items-center gap-2 text-success">
  <CheckIcon size="md" />
  <span>已服药</span>
</div>

// 警告状态
<div className="flex items-center gap-2 text-warning">
  <AlertIcon size="md" />
  <span>待补药</span>
</div>

// 信息提示
<div className="flex items-center gap-2 text-info">
  <InfoIcon size="md" />
  <span>饭后服用</span>
</div>
```

## 最佳实践

### ✅ 推荐做法

1. **保持一致性**
```tsx
// 好 - 统一使用 lg 尺寸
<MedicationIcon size="lg" />
<PrescriptionIcon size="lg" />

// 避免 - 混用尺寸
<MedicationIcon size="md" />
<PrescriptionIcon size="xl" />
```

2. **合理使用颜色**
```tsx
// 好 - 成功操作用绿色
<CheckIcon variant="success" />

// 避免 - 成功操作用红色
<CheckIcon variant="error" />
```

3. **适当的间距**
```tsx
// 好 - 图标和文本有适当间距
<div className="flex items-center gap-2">
  <MedicationIcon size="md" />
  <span>药物名称</span>
</div>

// 避免 - 没有间距
<div className="flex items-center">
  <MedicationIcon size="md" />
  <span>药物名称</span>
</div>
```

### ❌ 避免做法

1. 不要过度使用动画
2. 不要在浅色背景使用浅色图标
3. 不要混用不同风格的图标
4. 不要使用过小的尺寸（< sm）

## 性能优化

### 按需导入

```tsx
// 推荐 - 按需导入
import { MedicationIcon } from '@/components/icons/medical-icons';

// 避免 - 导入全部
import * as Icons from '@/components/icons/medical-icons';
```

### 使用 React.memo

对于频繁渲染的图标组件：

```tsx
import React from 'react';
import { MedicationIcon } from '@/components/icons/medical-icons';

const MedicationListItem = React.memo(({ medication }) => (
  <div>
    <MedicationIcon size="md" />
    <span>{medication.name}</span>
  </div>
));
```

## 无障碍支持

### 添加 aria-label

```tsx
// 图标按钮需要添加 aria-label
<button aria-label="添加药物">
  <PlusIcon size="md" />
</button>

// 装饰性图标添加 aria-hidden
<Icon aria-hidden="true">
  <Pill />
</Icon>
```

## 完整图标列表

医疗图标系统包含 45+ 个专用图标：

- 药物相关：3 个
- 健康监测：5 个
- 预约时间：3 个
- 用户家庭：2 个
- 沟通交流：4 个
- 位置导航：3 个
- 操作按钮：6 个
- 状态反馈：6 个
- 导航：5 个
- 安全设置：5 个
- 特色功能：5 个

所有图标都支持 4 种尺寸和 6 种颜色变体。

## 更新日志

### v1.0.0 (2026-03-01)
- ✨ 初始版本
- 🎨 45+ 医疗专用图标
- 📐 完整的尺寸和颜色系统
- ♿ 无障碍支持
- 📱 移动端优化

---

**MEDkey Icon System**
专业 · 清晰 · 一致 · 关怀
