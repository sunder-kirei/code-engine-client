import { SVGAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface DashboardTileProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  label: string;
}

export function DashboardTile({
  icon: Icon,
  title,
  label,
  className,
  ...props
}: SVGAttributes<SVGElement> & DashboardTileProps) {
  return (
    <div
      className="flex group items-center flex-col gap-2"
      title={title}
      role="button"
    >
      <Icon
        className={twMerge(
          "bg-mantis-300 p-8 group-hover:bg-mantis-500 group-hover:text-mantis-50 transition-all duration-300 text-mantis-600 size-28 flex items-center justify-center rounded-md",
          className
        )}
        {...props}
      />
      <span className="text-sm">{label}</span>
    </div>
  );
}
