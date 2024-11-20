import { Clock } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface NoteTileProps {
  title: string;
  updated_at: Date;
  bgImg?: string;
}

export function NoteTile({ title, updated_at, bgImg }: NoteTileProps) {
  return (
    <div
      className={twMerge(
        ' backdrop-blur-sm bg-blend-multiply w-full h-16 shadow-mantis-300 shadow-md ring-mantis-300 rounded-md overflow-clip bg-cover bg-center hover:scale-110 transition-all  hover:shadow-2xl flex flex-col items-end justify-end p-2 ',
        bgImg ? 'bg-black/50' : 'bg-mantis-400/80'
      )}
      style={{
        backgroundImage: bgImg && `url(${bgImg})`,
      }}
      role="button"
    >
      <h3 className="text-mantis-50 text-sm font-medium max-w-[20ch] text-ellipsis overflow-hidden whitespace-nowrap">
        {title}
      </h3>
      <h4 className="text-mantis-100 text-xs font-medium flex items-center gap-1">
        <Clock size={12} />
        {updated_at.toLocaleDateString()}
      </h4>
    </div>
  );
}
