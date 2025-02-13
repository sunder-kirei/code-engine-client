import Link from "next/link";
import { SVGAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface DashboardLinkProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  label: string;
  type: "code" | "note";
}

export function DashboardLink({
  icon: Icon,
  title,
  label,
  className,
  type,
  ...props
}: SVGAttributes<SVGElement> & DashboardLinkProps) {
  return (
    <Link
      className="flex group items-center flex-col gap-2"
      title={title}
      role="button"
      prefetch={false}
      href={`/new?type=${type}`}
    >
      <Icon
        className={twMerge(
          "bg-mantis-300 p-8 group-hover:bg-mantis-500 group-hover:text-mantis-50 transition-all duration-300 text-mantis-600 size-28 flex items-center justify-center rounded-md",
          className
        )}
        {...props}
      />
      <span className="text-sm">{label}</span>
    </Link>
  );
}
