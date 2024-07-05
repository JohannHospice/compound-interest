import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  endAdornment?: React.ForwardRefExoticComponent<any> | string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, endAdornment: EndAdornment, ...props }, ref) => {
    return (
      <div className='relative'>
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
            EndAdornment ? 'pr-10' : undefined
          )}
          ref={ref}
          {...props}
        />
        {EndAdornment && (
          <div className='absolute right-0 top-0 m-2'>
            {typeof EndAdornment === 'string' ? (
              EndAdornment
            ) : (
              <EndAdornment className='h-6 w-6 text-muted-foreground' />
            )}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
