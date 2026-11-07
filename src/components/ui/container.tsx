import React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "narrow" | "wide" | "full";
  as?: React.ElementType;
}

export function Container({
  className,
  size = "default",
  as: Component = "div",
  children,
  ...props
}: ContainerProps) {
  const sizeStyles = {
    narrow: "max-w-4xl",
    default: "max-w-7xl",
    wide: "max-w-[1440px]",
    full: "max-w-full",
  };

  return (
    <Component
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-12", sizeStyles[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
