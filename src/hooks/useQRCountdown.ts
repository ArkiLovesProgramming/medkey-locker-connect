import { useState, useEffect, useCallback } from 'react';

interface UseQRCountdownProps {
  expiresAt: string;
  refreshThreshold?: number; // Seconds before expiry to refresh (default: 60)
  onRefresh?: () => Promise<void>;
}

export const useQRCountdown = ({
  expiresAt,
  refreshThreshold = 60,
  onRefresh,
}: UseQRCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpiring, setIsExpiring] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const calculateTimeLeft = useCallback(() => {
    const expiry = new Date(expiresAt).getTime();
    const now = new Date().getTime();
    const difference = expiry - now;

    if (difference <= 0) {
      setTimeLeft(0);
      setIsExpired(true);
      setIsExpiring(false);
      return 0;
    }

    setTimeLeft(difference);
    setIsExpired(false);
    
    // Warn when less than threshold seconds remaining
    if (difference < refreshThreshold * 1000) {
      setIsExpiring(true);
    } else {
      setIsExpiring(false);
    }

    return difference;
  }, [expiresAt, refreshThreshold]);

  // Initial calculation and interval
  useEffect(() => {
    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      
      // Auto-refresh if we have a refresh function and we're expiring
      if (remaining < refreshThreshold * 1000 && remaining > 0 && onRefresh && !isRefreshing) {
        handleRefresh();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt, calculateTimeLeft, onRefresh, isRefreshing, refreshThreshold]);

  const handleRefresh = async () => {
    if (isRefreshing || !onRefresh) return;

    setIsRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error('Failed to refresh QR code:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Format time left as MM:SS
  const formattedTime = (() => {
    const totalSeconds = Math.floor(timeLeft / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  })();

  return {
    timeLeft,
    formattedTime,
    isExpiring,
    isExpired,
    isRefreshing,
    refresh: handleRefresh,
  };
};

// Helper function to parse QR code pattern string to 2D array
export const parseQRCodePattern = (patternString: string): number[][] => {
  return patternString.split('|').map(row => 
    row.split('').map(cell => parseInt(cell, 10))
  );
};

// Hook for managing QR code state with auto-refresh
export const useQRCodeManager = (
  qrCodeData?: { qrCode: string; expiresAt: string; isValid: boolean },
  refreshFn?: () => Promise<void>
) => {
  const countdown = useQRCountdown({
    expiresAt: qrCodeData?.expiresAt || '',
    refreshThreshold: 120, // Start warning 2 minutes before expiry
    onRefresh: refreshFn,
  });

  const pattern = qrCodeData?.qrCode ? parseQRCodePattern(qrCodeData.qrCode) : null;

  return {
    pattern,
    isValid: qrCodeData?.isValid && !countdown.isExpired,
    ...countdown,
  };
};
