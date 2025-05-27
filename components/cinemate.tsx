import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';

const logoVariants = cva('flex items-center gap-2', {
  variants: {
    variant: {
      default: 'text-primary text-2xl font-bold',
      small: 'text-primary text-lg font-semibold',
    },
    size: {
      default: 'size-10',
      sm: 'size-8',
      lg: 'size-12',
      icon: 'size-16',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export function Cinemate({
  className,
  size = 'default',
  variant = 'default',
  ...props
}: Omit<React.ComponentProps<typeof Link>, 'href'> & VariantProps<typeof logoVariants>) {
  return (
    <Link href="/" className={cn(logoVariants({ variant, className }))} {...props}>
      <Logo className={cn(logoVariants({ size }))} />
      <h1>Cinemate</h1>
    </Link>
  );
}

export function Logo({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100"
      height="100"
      {...props}
    >
      <circle cx="50" cy="50" r="48" fill="#f4e7e1" stroke="#d5451b" strokeWidth="2" />
      <circle cx="50" cy="50" r="30" fill="none" stroke="#521c0d" strokeWidth="4" />
      <circle cx="50" cy="50" r="5" fill="#521c0d" />
      <line x1="50" y1="20" x2="50" y2="35" stroke="#d5451b" strokeWidth="2" />
      <line x1="50" y1="65" x2="50" y2="80" stroke="#d5451b" strokeWidth="2" />
      <line x1="20" y1="50" x2="35" y2="50" stroke="#d5451b" strokeWidth="2" />
      <line x1="65" y1="50" x2="80" y2="50" stroke="#d5451b" strokeWidth="2" />
    </svg>
  );
}
