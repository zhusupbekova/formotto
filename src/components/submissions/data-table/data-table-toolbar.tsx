"use client";

import { Table } from "@tanstack/react-table";

import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTableViewOptions } from "@/components/submissions/data-table/data-table-view-options";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateSearchParam } from "@/base/searchParams";
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchParameterTypes } from "@/base/types";
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  isFetching: boolean;
}

export function DataTableToolbar<TData>({
  table,
  isFetching,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname() || "/";
  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSearchSubmit)}
            className="relative"
          >
            <span className="absolute top-[calc(50%)] left-0 transform -translate-y-1/2">
              <Button type="submit" variant="subtle" size="icon">
                {isFetching ? (
                  <Icons.spinner className="animate-spin h-4 w-4" />
                ) : (
                  <Icons.search className="h-4 w-4" />
                )}
              </Button>
            </span>

            <FormField
              name="search"
              render={({ field }) => (
                <Input
                  {...field}
                  className="pl-8"
                  placeholder="Search text..."
                />
              )}
            />
          </form>
        </Form>
        {/*<Input*/}
        {/*  placeholder="Filter tasks..."*/}
        {/*  value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}*/}
        {/*  onChange={(event) =>*/}
        {/*    table.getColumn("title")?.setFilterValue(event.target.value)*/}
        {/*  }*/}
        {/*  className="h-8 w-[150px] lg:w-[250px]"*/}
        {/*/>*/}
        {/*{table.getColumn("status") && (*/}
        {/*  <DataTableFacetedFilter*/}
        {/*    column={table?.getColumn("status")}*/}
        {/*    title="Status"*/}
        {/*    options={statuses}*/}
        {/*  />*/}
        {/*)}*/}
        {/*{table.getColumn("priority") && (*/}
        {/*  <DataTableFacetedFilter*/}
        {/*    column={table?.getColumn("priority")}*/}
        {/*    title="Priority"*/}
        {/*    options={priorities}*/}
        {/*  />*/}
        {/*)}*/}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Icons.close className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );

  function onSearchSubmit(values) {
    console.log(values);
    if (searchParams?.entries()) {
      const updatedSearchParams = updateSearchParam(
        searchParams,
        "search",
        values.search
      );
      console.log(updatedSearchParams);
      router.replace(`${pathName}?${updatedSearchParams.toString()}`);
    } else {
      router.replace(`${pathName}?${qs.stringify({ search: values.search })}`);
    }
  }
}
