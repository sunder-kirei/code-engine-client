import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export function Page({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <main
      className={twMerge(
        'w-full h-full grow px-6 py-3 max-w-screen-2xl mx-auto',
        className
      )}
      {...props}
    />
  );
}
