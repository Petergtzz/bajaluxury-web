import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface UpdateDataTableProps
  extends React.ComponentPropsWithRef<typeof Sheet> {}

export function UpdateDataTable({ ...props }: UpdateDataTableProps) {
  return (
    <Sheet {...props}>
      <SheetContent className="flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>Update task</SheetTitle>
          <SheetDescription>
            Update the task details and save the changes
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
