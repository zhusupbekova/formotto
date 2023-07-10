import { Icons } from "@/components/icons";

import { Table } from "@tanstack/react-table";
import qs from "query-string";

import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { IPagination } from "@/components/submissions/data-table/data-table";
import { SearchParameterTypes } from "@/base/types";
import { updateSearchParam } from "@/base/searchParams";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pagination: IPagination;
}

export function DataTablePagination<TData>({
  table,
  pagination,
}: DataTablePaginationProps<TData>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname() || "/";

  function onPaginationChange(param: SearchParameterTypes, value: any) {
    console.log(searchParams);
    if (searchParams?.entries()) {
      console.log({ searchParams });

      const updatedSearchParams = updateSearchParam(searchParams, param, value);
      console.log(updatedSearchParams);
      router.replace(`${pathName}?${updatedSearchParams.toString()}`);
    } else {
      router.replace(`${pathName}?${qs.stringify({ [param]: value })}`);
    }
  }

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pagination.pageSize}`}
            onValueChange={(value) => {
              onPaginationChange("perPage", value);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pagination.pageIndex + 1} of {pagination.pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPaginationChange("page", 0)}
            disabled={pagination.pageIndex === 0}
          >
            <span className="sr-only">Go to first page</span>
            <Icons.chevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPaginationChange("page", pagination.pageIndex)}
            disabled={pagination.pageIndex === 0}
          >
            <span className="sr-only">Go to previous page</span>
            <Icons.chevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPaginationChange("page", pagination.pageIndex + 2)}
            disabled={pagination.pageIndex + 1 === pagination.pageCount}
          >
            <span className="sr-only">Go to next page</span>
            <Icons.chevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPaginationChange("page", pagination.pageCount)}
            disabled={pagination.pageIndex + 1 === pagination.pageCount}
          >
            <span className="sr-only">Go to last page</span>
            <Icons.chevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
