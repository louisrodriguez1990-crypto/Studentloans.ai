import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'highlight';
  interactive?: boolean;
}

function Card({ className, variant = 'default', interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border bg-white',
        {
          'border-gray-200 shadow-sm': variant === 'default',
          'border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]': variant === 'elevated',
          'border-l-[3px] border-l-[#00C9A7] border-gray-200 shadow-sm': variant === 'highlight',
        },
        interactive && 'transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] cursor-pointer',
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pb-3', className)} {...props} />;
}

function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-lg font-semibold text-gray-900', className)} {...props} />;
}

function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 pt-0', className)} {...props} />;
}

function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
  );
}

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
