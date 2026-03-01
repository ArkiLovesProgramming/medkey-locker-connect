# 家庭成员管理功能文档

## 功能概述

家庭成员管理页面允许用户添加、编辑、删除和查看家庭成员的详细信息。该功能支持完整的家庭成员信息管理，包括基本信息、保险信息、过敏史和病史等。

## 主要功能

### 1. 查看家庭成员列表
- 按关系分组显示（账户持有人、配偶、子女、父母、其他）
- 支持搜索功能
- 显示关键信息（年龄、联系方式、过敏史、病史等）

### 2. 添加新家庭成员
- 基本信息：姓名、邮箱、电话、出生日期、关系
- 保险信息：支持预设保险公司或自定义
- 过敏信息：支持预设过敏原或自定义添加
- 病史信息：支持预设疾病或自定义添加

### 3. 编辑家庭成员信息
- 可修改所有基本信息
- 可更新保险信息
- 可管理过敏史和病史

### 4. 删除家庭成员
- 支持删除非主要账户持有人
- 删除前需要确认

## 文件结构

### 新增文件

1. **`src/data/mockFamilyMembers.ts`**
   - 扩展的家庭成员 mock 数据
   - 保险公司数据库
   - 常见过敏原数据库
   - 常见疾病数据库
   - CRUD 操作辅助函数

2. **`src/components/FamilyMemberCard.tsx`**
   - 家庭成员卡片展示组件
   - 显示成员基本信息和健康信息
   - 提供编辑和删除操作入口

3. **`src/components/FamilyMemberForm.tsx`**
   - 添加/编辑家庭成员的表单组件
   - 支持预设数据快速选择
   - 表单验证和错误处理

4. **`src/pages/FamilyManagement.tsx`**
   - 家庭成员管理主页面
   - 搜索和过滤功能
   - 分组显示家庭成员

### 修改文件

1. **`src/data/mockUsers.ts`**
   - 更新为从 `mockFamilyMembers` 导入数据
   - 保持向后兼容

2. **`src/data/index.ts`**
   - 导出新的家庭成员管理相关数据和函数

3. **`src/services/userService.ts`**
   - 实现实际的添加、修改、删除操作
   - 更新 mock 数据

4. **`src/hooks/useData.ts`**
   - 添加 `useAddFamilyMember`
   - 添加 `useUpdateFamilyMember`
   - 添加 `useRemoveFamilyMember`

5. **`src/App.tsx`**
   - 添加 `/family-management` 路由

6. **`src/components/ProfileScreen.tsx`**
   - 添加跳转到家庭成员管理的入口
   - 显示动态的家庭成员数量

## Mock 数据说明

### 保险公司数据
包含三种预设保险方案：
- Blue Cross Blue Shield - PPO Premium Plus
- Aetna - HMO Essential Care
- UnitedHealthcare - Choice Plus

### 过敏原数据
包含 10 种常见过敏原：
- Penicillin（青霉素）- 严重
- Peanuts（花生）- 严重
- Latex（乳胶）- 中等
- Shellfish（贝类）- 中等
- Aspirin（阿司匹林）- 中等
- Sulfa drugs（磺胺类药物）- 严重
- Codeine（可待因）- 中等
- Ibuprofen（布洛芬）- 轻微
- Dust mites（尘螨）- 轻微
- Pollen（花粉）- 轻微

### 疾病数据
包含 11 种常见疾病：
- Hypertension（高血压）
- Type 2 Diabetes（2 型糖尿病）
- Asthma（哮喘）
- High Cholesterol（高胆固醇）
- Seasonal Allergies（季节性过敏）
- GERD（胃酸反流）
- Hypothyroidism（甲状腺功能减退）
- Osteoarthritis（骨关节炎）
- Anxiety Disorder（焦虑症）
- Depression（抑郁症）
- Chronic Migraines（慢性偏头痛）

### 示例家庭成员
初始包含 6 个示例成员：
1. Sarah Jenkins - 账户持有人（本人）
2. David Jenkins - 配偶
3. Lily Jenkins - 女儿
4. Emma Jenkins - 女儿（新增）
5. Margaret Smith - 母亲
6. Robert Smith - 父亲

## 使用方法

### 访问家庭成员管理页面

1. 从 Profile 页面进入：
   - 点击 Profile 菜单中的 "Family Management"
   - 跳转到 `/family-management` 页面

2. 直接访问：
   - 在浏览器中访问 `http://localhost:5173/family-management`

### 添加家庭成员

1. 点击 "Add Family Member" 按钮
2. 填写基本信息（必填：姓名、出生日期、关系）
3. 可选填写保险信息
4. 可选添加过敏史和病史
5. 点击 "Add Member" 保存

### 编辑家庭成员

1. 点击家庭成员卡片或卡片菜单中的 "Edit"
2. 修改需要更新的信息
3. 点击 "Update Member" 保存

### 删除家庭成员

1. 点击卡片右上角的菜单按钮
2. 选择 "Delete"
3. 确认删除

### 搜索家庭成员

1. 在搜索框中输入关键词
2. 支持按姓名、邮箱、关系搜索
3. 实时过滤显示结果

## 技术特点

- **React Query**: 管理服务器状态和数据缓存
- **表单验证**: 前端验证确保数据完整性
- **Toast 通知**: 操作反馈
- **响应式设计**: 适配移动端
- **类型安全**: 完整的 TypeScript 类型定义

## 未来扩展

- [ ] 支持上传家庭成员头像
- [ ] 支持导入/导出家庭成员数据
- [ ] 添加家庭成员权限管理
- [ ] 支持为不同成员设置不同的保险计划
- [ ] 添加家庭成员健康报告功能
- [ ] 支持家庭成员分组标签
