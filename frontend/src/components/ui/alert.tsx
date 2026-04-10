import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const alertVariants = cva("w-full rounded-lg border px-4 py-3 text-sm", {
  variants: {
    variant: {
      default: "border-border bg-card text-card-foreground",
      destructive: "border-destructive/50 bg-destructive/10 text-destructive",
      success: "border-emerald-600/40 bg-emerald-900/30 text-emerald-300",
      warning: "border-amber-600/40 bg-amber-900/20 text-amber-300",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

export function Alert({ className, variant, ...props }: AlertProps) {
  return <div role="alert" className={cn(alertVariants({ variant }), className)} {...props} />;
}
