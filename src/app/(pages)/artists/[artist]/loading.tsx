import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="flex justify-center pt-12">
      <div className="p-2 rounded-lg bg-primary-foreground aspect-[1.4/1] min-w-80 max-w-[500px] flex justify-start items-start flex-col">
        <Skeleton className="w-12 h-4 pb-2" />
        <Skeleton className="w-32 h-2 pt-2 pb-2 text-muted-foreground" />
        <div className="flex w-full justify-center">
          <div className="border h-24 xl:h-32 aspect-square rounded-lg overflow-hidden object-cover">
            <Skeleton className="h-full" />
          </div>
        </div>
        <div className="w-full flex justify-center gap-x-4 mt-4">
          <Skeleton className="w-12 h-4" />
          <Skeleton className="w-12 h-4" />
          <Skeleton className="w-12 h-4" />
        </div>
      </div>
    </div>
  );
}
