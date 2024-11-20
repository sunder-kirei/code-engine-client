import Link, { LinkProps } from 'next/link';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export function LinkButton({
  className,
  ...props
}: LinkProps & HTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link
      className={twMerge(
        'bg-mantis-500 rounded-md p-3 text-mantis-50 text-xl transition-all duration-300 hover:scale-110 hover:bg-mantis-600 active:scale-100',
        className
      )}
      role="button"
      {...props}
    />
  );
}
