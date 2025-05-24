import { Skeleton } from '@/components/ui/skeleton';

export function HomeSkeleton() {
  return (
    <div className="py-8">
      <Skeleton className="mb-12 h-[60vh] w-full rounded-xl" />
    </div>
  );
}
