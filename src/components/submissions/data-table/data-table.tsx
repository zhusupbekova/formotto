"use client";

import React, { useState } from "react";

import qs from "query-string";
import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  VisibilityState,
  getFilteredRowModel,
  ColumnFiltersState,
  getFacetedUniqueValues,
  getFacetedRowModel,
  PaginationState,
  OnChangeFn,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableToolbar } from "@/components/submissions/data-table/data-table-toolbar";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { DataTablePagination } from "@/components/submissions/data-table/data-table-pagination";
import useSWR from "swr";
import { fetcher } from "@/base/network";
import { getSubmissionColumns } from "@/components/submissions/data-table/data-table-column";
import { IForm } from "@/base/types";
import { fromPairs } from "lodash";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination: IPagination;
}
export interface IPagination extends PaginationState {
  pageCount: number;
}
export type PaginationState = {
  pageIndex: number;
  pageSize: number;
};

export type PaginationTableState = {
  pagination: PaginationState;
};

export type PaginationInitialTableState = {
  pagination?: Partial<PaginationState>;
};
interface ISubmissionsDataRes {
  form: IForm;
  submissions;
  submissionKeys: string[];
  pagination: {
    pageCount: number;
    pageIndex: number;
    pageSize: number;
  };
}

export function DataTable<TData, TValue>({ formId }: { formId: string }) {
  const searchParams = useSearchParams();
  // const sp = fromPairs(searchParams.entries());
  // console.log({ sp }, sp.perPage);
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const perPage = searchParams.get("perPage");
  const sortKey = searchParams.get("sortKey");
  const sortBy = searchParams.get("sortBy");
  const { data, error, isLoading } = useSWR<ISubmissionsDataRes>(
    `/api/forms/${formId}/submissions?${qs.stringify(
      {
        search,
        page,
        perPage,
        sortKey,
        sortBy,
      },
      {
        skipNull: true,
      }
    )}`,
    fetcher
  );

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = getSubmissionColumns(data?.submissionKeys || []);
  const tableBodyData = data?.submissions ?? [];
  const pagination = data?.pagination ?? {
    pageSize: 0,
    pageCount: 1,
    pageIndex: 0,
  };

  const table = useReactTable<any>({
    data: tableBodyData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      // pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    debugTable: true,
  } as any);

  if (!data && isLoading) {
    return;
  }
  return (
    <div className="my-10">
      <DataTableToolbar table={table as any} isFetching={isLoading} />
      <div className="rounded-md border my-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef?.header,
                        header.getContext()
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table as any} pagination={pagination} />
    </div>
  );
}
