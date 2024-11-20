import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export function H2({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={twMerge('text-lg mb-4 font-semibold', className)}
      {...props}
    />
  );
}
