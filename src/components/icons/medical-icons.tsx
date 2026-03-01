import React from "react";
import { Icon, type IconProps } from "@/components/ui/icon";
import { 
  Pill, 
  FileText, 
  Calendar, 
  Activity, 
  Heart, 
  Stethoscope,
  Syringe,
  Thermometer,
  ClipboardList,
  User,
  Users,
  Phone,
  Mail,
  MapPin,
  Clock,
  Bell,
  Search,
  Filter,
  Download,
  Upload,
  Check,
  X,
  AlertCircle,
  Info,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  MoreVertical,
  Settings,
  LogOut,
  Home,
  MessageSquare,
  QrCode,
  Shield,
  Zap,
  Star,
  Bookmark,
  Share2,
  Printer,
  Eye,
  Lock,
  Unlock,
  Camera,
  Mic,
  Video
} from "lucide-react";

// ============================================================================
// Medication Icons
// ============================================================================

export const MedicationIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="brand" {...props}>
      <Pill />
    </Icon>
  ),
);
MedicationIcon.displayName = "MedicationIcon";

export const PrescriptionIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="accent" {...props}>
      <FileText />
    </Icon>
  ),
);
PrescriptionIcon.displayName = "PrescriptionIcon";

export const RefillIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="brand" {...props}>
      <ClipboardList />
    </Icon>
  ),
);
RefillIcon.displayName = "RefillIcon";

// ============================================================================
// Health & Medical Icons
// ============================================================================

export const HeartHealthIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="success" {...props}>
      <Heart />
    </Icon>
  ),
);
HeartHealthIcon.displayName = "HeartHealthIcon";

export const VitalSignsIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="warning" {...props}>
      <Activity />
    </Icon>
  ),
);
VitalSignsIcon.displayName = "VitalSignsIcon";

export const TemperatureIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="warning" {...props}>
      <Thermometer />
    </Icon>
  ),
);
TemperatureIcon.displayName = "TemperatureIcon";

export const InjectionIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="brand" {...props}>
      <Syringe />
    </Icon>
  ),
);
InjectionIcon.displayName = "InjectionIcon";

export const DoctorIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="accent" {...props}>
      <Stethoscope />
    </Icon>
  ),
);
DoctorIcon.displayName = "DoctorIcon";

// ============================================================================
// Appointment & Schedule Icons
// ============================================================================

export const AppointmentIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="success" {...props}>
      <Calendar />
    </Icon>
  ),
);
AppointmentIcon.displayName = "AppointmentIcon";

export const ReminderIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="warning" {...props}>
      <Bell />
    </Icon>
  ),
);
ReminderIcon.displayName = "ReminderIcon";

export const TimeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="default" {...props}>
      <Clock />
    </Icon>
  ),
);
TimeIcon.displayName = "TimeIcon";

// ============================================================================
// User & Family Icons
// ============================================================================

export const UserProfileIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="brand" {...props}>
      <User />
    </Icon>
  ),
);
UserProfileIcon.displayName = "UserProfileIcon";

export const FamilyIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="accent" {...props}>
      <Users />
    </Icon>
  ),
);
FamilyIcon.displayName = "FamilyIcon";

// ============================================================================
// Communication Icons
// ============================================================================

export const PhoneIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="success" {...props}>
      <Phone />
    </Icon>
  ),
);
PhoneIcon.displayName = "PhoneIcon";

export const EmailIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="brand" {...props}>
      <Mail />
    </Icon>
  ),
);
EmailIcon.displayName = "EmailIcon";

export const ChatIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="accent" {...props}>
      <MessageSquare />
    </Icon>
  ),
);
ChatIcon.displayName = "ChatIcon";

export const VideoCallIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="success" {...props}>
      <Video />
    </Icon>
  ),
);
VideoCallIcon.displayName = "VideoCallIcon";

// ============================================================================
// Location & Navigation Icons
// ============================================================================

export const LocationIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="warning" {...props}>
      <MapPin />
    </Icon>
  ),
);
LocationIcon.displayName = "LocationIcon";

export const HomeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="brand" {...props}>
      <Home />
    </Icon>
  ),
);
HomeIcon.displayName = "HomeIcon";

export const PharmacyIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="brand" {...props}>
      <Pill />
    </Icon>
  ),
);
PharmacyIcon.displayName = "PharmacyIcon";

// ============================================================================
// Action Icons
// ============================================================================

export const SearchIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="default" {...props}>
      <Search />
    </Icon>
  ),
);
SearchIcon.displayName = "SearchIcon";

export const FilterIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="default" {...props}>
      <Filter />
    </Icon>
  ),
);
FilterIcon.displayName = "FilterIcon";

export const DownloadIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="brand" {...props}>
      <Download />
    </Icon>
  ),
);
DownloadIcon.displayName = "DownloadIcon";

export const UploadIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="brand" {...props}>
      <Upload />
    </Icon>
  ),
);
UploadIcon.displayName = "UploadIcon";

export const PrintIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="default" {...props}>
      <Printer />
    </Icon>
  ),
);
PrintIcon.displayName = "PrintIcon";

export const ShareIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="accent" {...props}>
      <Share2 />
    </Icon>
  ),
);
ShareIcon.displayName = "ShareIcon";

// ============================================================================
// Status & Feedback Icons
// ============================================================================

export const CheckIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="success" {...props}>
      <Check />
    </Icon>
  ),
);
CheckIcon.displayName = "CheckIcon";

export const CloseIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="default" {...props}>
      <X />
    </Icon>
  ),
);
CloseIcon.displayName = "CloseIcon";

export const AlertIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="warning" {...props}>
      <AlertCircle />
    </Icon>
  ),
);
AlertIcon.displayName = "AlertIcon";

export const InfoIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="accent" {...props}>
      <Info />
    </Icon>
  ),
);
InfoIcon.displayName = "InfoIcon";

export const StarIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="warning" {...props}>
      <Star />
    </Icon>
  ),
);
StarIcon.displayName = "StarIcon";

export const BookmarkIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="brand" {...props}>
      <Bookmark />
    </Icon>
  ),
);
BookmarkIcon.displayName = "BookmarkIcon";

// ============================================================================
// Navigation Icons
// ============================================================================

export const ChevronRightIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="default" {...props}>
      <ChevronRight />
    </Icon>
  ),
);
ChevronRightIcon.displayName = "ChevronRightIcon";

export const ChevronLeftIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="default" {...props}>
      <ChevronLeft />
    </Icon>
  ),
);
ChevronLeftIcon.displayName = "ChevronLeftIcon";

export const PlusIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="brand" {...props}>
      <Plus />
    </Icon>
  ),
);
PlusIcon.displayName = "PlusIcon";

export const MinusIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="default" {...props}>
      <Minus />
    </Icon>
  ),
);
MinusIcon.displayName = "MinusIcon";

export const MoreIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="default" {...props}>
      <MoreVertical />
    </Icon>
  ),
);
MoreIcon.displayName = "MoreIcon";

// ============================================================================
// Security & Settings Icons
// ============================================================================

export const SettingsIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="default" {...props}>
      <Settings />
    </Icon>
  ),
);
SettingsIcon.displayName = "SettingsIcon";

export const LogoutIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="warning" {...props}>
      <LogOut />
    </Icon>
  ),
);
LogoutIcon.displayName = "LogoutIcon";

export const SecurityIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="success" {...props}>
      <Shield />
    </Icon>
  ),
);
SecurityIcon.displayName = "SecurityIcon";

export const LockIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="warning" {...props}>
      <Lock />
    </Icon>
  ),
);
LockIcon.displayName = "LockIcon";

export const UnlockIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="success" {...props}>
      <Unlock />
    </Icon>
  ),
);
UnlockIcon.displayName = "UnlockIcon";

// ============================================================================
// Special Features Icons
// ============================================================================

export const QRCodeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="brand" {...props}>
      <QrCode />
    </Icon>
  ),
);
QRCodeIcon.displayName = "QRCodeIcon";

export const FastServiceIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="warning" {...props}>
      <Zap />
    </Icon>
  ),
);
FastServiceIcon.displayName = "FastServiceIcon";

export const EyeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="brand" {...props}>
      <Eye />
    </Icon>
  ),
);
EyeIcon.displayName = "EyeIcon";

export const CameraIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="accent" {...props}>
      <Camera />
    </Icon>
  ),
);
CameraIcon.displayName = "CameraIcon";

export const MicrophoneIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => (
    <Icon ref={ref} variant="brand" {...props}>
      <Mic />
    </Icon>
  ),
);
MicrophoneIcon.displayName = "MicrophoneIcon";

// Export all icons as a record for easy iteration
export const MedicalIcons = {
  MedicationIcon,
  PrescriptionIcon,
  RefillIcon,
  HeartHealthIcon,
  VitalSignsIcon,
  TemperatureIcon,
  InjectionIcon,
  DoctorIcon,
  AppointmentIcon,
  ReminderIcon,
  TimeIcon,
  UserProfileIcon,
  FamilyIcon,
  PhoneIcon,
  EmailIcon,
  ChatIcon,
  VideoCallIcon,
  LocationIcon,
  HomeIcon,
  PharmacyIcon,
  SearchIcon,
  FilterIcon,
  DownloadIcon,
  UploadIcon,
  PrintIcon,
  ShareIcon,
  CheckIcon,
  CloseIcon,
  AlertIcon,
  InfoIcon,
  StarIcon,
  BookmarkIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  PlusIcon,
  MinusIcon,
  MoreIcon,
  SettingsIcon,
  LogoutIcon,
  SecurityIcon,
  LockIcon,
  UnlockIcon,
  QRCodeIcon,
  FastServiceIcon,
  EyeIcon,
  CameraIcon,
  MicrophoneIcon,
};

export type IconName = keyof typeof MedicalIcons;
