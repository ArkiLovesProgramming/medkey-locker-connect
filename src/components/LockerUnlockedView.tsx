import { useState, useEffect } from "react";
import {
  LockOpen,
  Clock,
  Package,
  Pill,
  User,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LockerUnlockedViewProps {
  onNavigate: (screen: number) => void;
  onBack: () => void;
  orderNumber?: string;
}

interface Locker {
  id: string;
  label: string;
  isOpen: boolean;
  hasMedication: boolean;
}

interface Medication {
  id: string;
  patientName: string;
  medicationName: string;
  quantity: number;
}

const LockerUnlockedView = ({ onNavigate, onBack, orderNumber }: LockerUnlockedViewProps) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCollecting, setIsCollecting] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // 倒计时
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 震动反馈
  useEffect(() => {
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  }, []);

  // 最后 10 秒震动提醒
  useEffect(() => {
    if (timeLeft <= 10 && timeLeft > 0) {
      navigator.vibrate?.(100);
    }
  }, [timeLeft]);

  // 超时提示
  useEffect(() => {
    if (timeLeft === 0) {
      toast({
        title: "⏰ Time Expired",
        description: "Please re-scan the QR code to unlock the locker.",
        duration: 5000,
      });
    }
  }, [timeLeft]);

  const handleCollectPackage = () => {
    setIsCollecting(true);
    toast({
      title: "✅ Thank you!",
      description: "Returning to pickup screen...",
    });
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  const handleBack = () => {
    if (timeLeft > 30) {
      // 时间充裕，直接返回
      onBack();
    } else {
      // 时间紧张，显示确认对话框
      setShowExitConfirm(true);
    }
  };

  const handleRescan = () => {
    toast({
      title: "Re-scanning Required",
      description: "Please scan the QR code again.",
    });
    onBack();
  };

  // 储物柜数据
  const lockerGrid: Locker[] = [
    { id: 'A1', label: 'A1', isOpen: false, hasMedication: false },
    { id: 'A2', label: 'A2', isOpen: false, hasMedication: false },
    { id: 'A3', label: 'A3', isOpen: false, hasMedication: false },
    { id: 'A4', label: 'A4', isOpen: false, hasMedication: false },
    { id: 'B1', label: 'B1', isOpen: false, hasMedication: false },
    { id: 'B2', label: 'B2', isOpen: false, hasMedication: false },
    { id: 'B3', label: 'B3', isOpen: false, hasMedication: false },
    { id: 'B4', label: 'B4', isOpen: false, hasMedication: false },
    { id: 'B11', label: 'B11', isOpen: true, hasMedication: true },
    { id: 'B12', label: 'B12', isOpen: true, hasMedication: true },
    { id: 'B13', label: 'B13', isOpen: false, hasMedication: false },
    { id: 'B14', label: 'B14', isOpen: false, hasMedication: false },
    { id: 'C1', label: 'C1', isOpen: false, hasMedication: false },
    { id: 'C2', label: 'C2', isOpen: false, hasMedication: false },
    { id: 'C3', label: 'C3', isOpen: false, hasMedication: false },
    { id: 'C4', label: 'C4', isOpen: false, hasMedication: false },
  ];

  // 药品数据
  const medications: Medication[] = [
    { id: 'med-1', patientName: 'Lily Jenkins', medicationName: 'Amoxicillin 500mg', quantity: 14 },
    { id: 'med-2', patientName: 'David Jenkins', medicationName: 'Atorvastatin 20mg', quantity: 30 },
  ];

  const minutes = Math.floor(timeLeft / 60);
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* 顶部导航栏 */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <button
          onClick={handleBack}
          className="p-2 active:scale-90 transition-transform"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h2 className="font-semibold text-base text-foreground">Pickup</h2>
        <div className="w-10" /> {/* 占位保持居中 */}
      </div>

      {/* 成功状态区 */}
      <div className="text-center py-4 bg-gradient-to-b from-teal-light/20 to-transparent rounded-b-3xl">
        <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
          <LockOpen className="w-10 h-10 text-teal-dark" />
        </div>
        <h1 className="text-2xl font-bold text-teal-dark mb-2">Locker Unlocked!</h1>
        <p className="text-muted-foreground mb-4 text-sm">Please retrieve your medication below</p>
        
        {/* 倒计时 */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
          timeLeft === 0 
            ? 'bg-red-100 text-red-700 animate-pulse' 
            : timeLeft <= 10 
              ? 'bg-red-100 text-red-700' 
              : 'bg-teal-dark text-white'
        }`}>
          <Clock className="w-4 h-4" />
          <span className="font-bold tabular-nums">
            {minutes}:{seconds}
          </span>
        </div>
        
        {/* 超时提示文字 */}
        {timeLeft === 0 && (
          <p className="text-red-700 text-sm font-semibold mt-3 animate-pulse">
            ⏰ Time expired - Please re-scan the QR code
          </p>
        )}
      </div>

      {/* 储物柜可视化区域 */}
      <div className="bg-white rounded-2xl p-5 shadow-medkey-md border border-border mx-5 my-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            MEDLOCKD UNIT 04
          </span>
          <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
        </div>
        
        {/* 4x4 网格 */}
        <div className="grid grid-cols-4 gap-3">
          {lockerGrid.map((locker) => (
            <div
              key={locker.id}
              className={`aspect-square rounded-xl flex items-center justify-center font-semibold text-xs transition-all duration-500 ${
                locker.isOpen
                  ? 'bg-teal-dark text-white shadow-lg scale-105 animate-pulse'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {locker.isOpen && <Package className="w-3 h-3 mr-0.5" />}
              {locker.label}
            </div>
          ))}
        </div>
      </div>

      {/* 药品清单预览区 */}
      <div className="bg-white rounded-2xl p-5 shadow-medkey-sm border border-border mx-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Pill className="w-5 h-5 text-teal-dark" />
          <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">
            Your Medications ({medications.length})
          </h3>
        </div>
        
        <div className="space-y-2">
          {medications.map((med) => (
            <div key={med.id} className="flex items-start gap-3 p-3 bg-teal-light/10 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-teal-light/30 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-teal-dark" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-sm truncate">{med.patientName}</p>
                <p className="text-xs text-muted-foreground">
                  {med.medicationName} • Qty: {med.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 操作按钮区 */}
      <div className="px-5 pb-6">
        {/* 主按钮 - 已收集确认按钮（始终显示） */}
        <button
          onClick={handleCollectPackage}
          disabled={isCollecting || timeLeft === 0}
          className="w-full bg-teal-dark text-white font-bold py-4 rounded-2xl shadow-medkey-md active:scale-[0.98] transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mb-3"
        >
          <CheckCircle className="w-6 h-6" />
          {isCollecting ? 'Collected!' : "I've collected my package"}
          {!isCollecting && <ArrowRight className="w-5 h-5" />}
        </button>
        
        {/* 超时重新扫描按钮 */}
        {timeLeft === 0 && (
          <button
            onClick={handleRescan}
            className="w-full bg-teal-dark text-white font-bold py-4 rounded-2xl shadow-medkey-md active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5 rotate-180" />
            Re-scan QR Code
          </button>
        )}
        
        {/* 帮助链接 */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="text-muted-foreground hover:text-teal-dark text-sm font-medium flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            Door didn't open? Need Help
            <ChevronDown className={`w-4 h-4 transition-transform ${showHelp ? 'rotate-180' : ''}`} />
          </button>
          
          {/* 展开的帮助面板 */}
          {showHelp && (
            <div className="mt-3 p-4 bg-muted rounded-xl text-sm space-y-2 animate-fade-in">
              <p className="font-semibold text-foreground">Try these steps:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Wait 5 seconds and try again</li>
                <li>Check if the green light is on</li>
                <li>Call pharmacy: <a href="tel:+15551234567" className="text-teal-dark font-bold hover:underline">(555) 123-4567</a></li>
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* 退出确认对话框 */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 mx-5 max-w-sm animate-slide-up">
            <div className="w-16 h-16 mx-auto mb-4 bg-amber/10 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-amber" />
            </div>
            <h3 className="text-xl font-bold text-center text-foreground mb-2">
              Leave Now?
            </h3>
            <p className="text-muted-foreground text-center mb-6">
              The locker may automatically lock if you leave before time expires.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 bg-muted text-foreground font-semibold py-3 rounded-xl active:scale-[0.98] transition-transform"
              >
                Stay Here
              </button>
              <button
                onClick={() => {
                  setShowExitConfirm(false);
                  onBack();
                }}
                className="flex-1 bg-teal-dark text-white font-semibold py-3 rounded-xl active:scale-[0.98] transition-transform"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LockerUnlockedView;
