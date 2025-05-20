import { cn } from "@/lib/utils";

interface RatingBadgeProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-6 w-6 text-xs",
  md: "h-8 w-8 text-sm",
  lg: "h-12 w-12 text-lg",
};

export function RatingBadge({
  rating,
  size = "md",
  className,
}: RatingBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-yellow-500 font-bold text-black",
        sizeClasses[size],
        className,
      )}
    >
      {rating.toFixed(1)}
    </div>
  );
}
