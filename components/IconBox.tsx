
import { cn } from '@/lib/utils';

interface IconBoxProps {
  children: React.ReactNode;
  className?: string;
}

export default function IconBox ({ children, className }: IconBoxProps) {
  return (
    <span className={cn('icon-box', className)}>
      {children}
    </span>
  );
};
