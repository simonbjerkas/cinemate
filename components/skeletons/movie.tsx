import { Skeleton } from '@/components/ui/skeleton';

export function MovieSkeleton() {
  return (
    <div className="py-8">
      <Skeleton className="mb-8 h-[50vh] w-full rounded-xl" />
      <div className="grid h-40 gap-8 md:grid-cols-3">
        <Skeleton className="h-full md:col-span-2" />
        <Skeleton className="h-full" />
      </div>
    </div>
  );
}
