import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-[#00C9A7] text-white hover:bg-[#00b396] focus-visible:ring-[#00C9A7] shadow-sm hover:shadow-md rounded-lg':
              variant === 'primary',
            'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 focus-visible:ring-gray-400 rounded-lg':
              variant === 'secondary',
            'bg-white text-[#00C9A7] border border-[#00C9A7] hover:bg-[#e6faf6] focus-visible:ring-[#00C9A7] rounded-lg':
              variant === 'outline',
            'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400 rounded-lg': variant === 'ghost',
            'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600 rounded-lg':
              variant === 'destructive',
          },
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-sm': size === 'md',
            'h-12 px-6 text-base': size === 'lg',
            'h-14 px-8 text-lg rounded-xl': size === 'xl',
          },
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
