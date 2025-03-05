import { Separator } from "./ui/separator";

export function Header({ title }: { title: string }) {
  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-6 px-8 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 w-full">
        <div className="flex-1 space-y-4 pt-7">
          <div className="flex items-center justify-between space-x-6">
            <h2 className="text-3xl font-semibold tracking-tight p2-1 px-0">
              {title}
            </h2>
          </div>
        </div>
      </header>
      <Separator className="my-7" />
    </div>
  );
}
