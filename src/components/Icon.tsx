import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";

interface IconProps {
  icon: IconSvgElement;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export default function Icon({ icon, className, size, strokeWidth = 1.5 }: IconProps) {
  return (
    <HugeiconsIcon
      icon={icon}
      className={className}
      size={size}
      strokeWidth={strokeWidth}
      color="currentColor"
    />
  );
}
