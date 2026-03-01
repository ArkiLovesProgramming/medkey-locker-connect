import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-12 items-center justify-center",
      "rounded-xl bg-gradient-medkey-light/30",
      "p-1.5 border border-brand-teal-light/20",
      "shadow-medkey-sm",
      "text-brand-teal-dark/70",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center",
      "whitespace-nowrap rounded-lg px-5 py-2.5",
      "text-sm font-semibold transition-all duration-300",
      "data-[state=active]:bg-gradient-medkey",
      "data-[state=active]:text-white",
      "data-[state=active]:shadow-medkey-md",
      "data-[state=active]:scale-105",
      "hover:bg-brand-teal-light/20",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-brand-teal-light",
      "disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-brand-teal-light focus-visible:ring-offset-2",
      "animate-in fade-in-0 slide-in-from-top-1 duration-200",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
