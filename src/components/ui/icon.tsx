import React from "react";
import { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

export interface IconProps extends LucideProps {
  variant?: 'default' | 'brand' | 'accent' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, variant = 'default', size = 'md', animated = false, ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
    };
    
    const variantClasses = {
      default: 'text-muted-foreground',
      brand: 'text-brand-teal-dark',
      accent: 'text-brand-teal-light',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-destructive',
    };
    
    return (
      <svg
        ref={ref}
        className={cn(
          sizeClasses[size],
          variantClasses[variant],
          "transition-colors duration-200",
          animated && "transition-transform duration-200 hover:scale-110",
          className
        )}
        {...props}
      />
    );
  },
);

Icon.displayName = "Icon";

export default Icon;
