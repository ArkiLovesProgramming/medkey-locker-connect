import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // MEDkey Primary - Gradient Teal
        default: "bg-gradient-medkey text-white hover:opacity-90 shadow-medkey-md hover:shadow-medkey-lg active:scale-95",
        // MEDkey Secondary - Light Teal
        secondary: "bg-brand-teal-light/30 text-brand-teal-dark border border-brand-teal-dark/20 hover:bg-brand-teal-light/50 hover:border-brand-teal-dark/30",
        // Destructive - Red for errors/danger
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        // Outline - Minimal border
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-brand-teal-light/50",
        // Ghost - Subtle hover
        ghost: "hover:bg-accent hover:text-accent-foreground hover:bg-brand-teal-light/20",
        // Link - Text link
        link: "text-primary underline-offset-4 hover:underline hover:text-brand-teal-light",
        // MEDkey Accent - Light teal background
        accent: "bg-brand-teal-light text-brand-teal-dark hover:bg-brand-teal-light/80 shadow-sm",
        // Success - Green for positive actions
        success: "bg-success text-white hover:bg-success/90 shadow-sm",
        // Warning - Orange for cautions
        warning: "bg-warning text-white hover:bg-warning/90 shadow-sm",
      },
      size: {
        default: "h-11 px-6 py-2.5 radius-medkey-lg",
        sm: "h-9 radius-medkey-md px-4 text-xs",
        lg: "h-12 radius-medkey-xl px-8 text-base",
        icon: "h-10 w-10 radius-medkey-lg",
        // MEDkey Extra Large
        xl: "h-14 radius-medkey-xl px-10 text-base font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
