"use client";

import useSWR from "swr";
import Link from "next/link";
import { capitalize } from "lodash";

import { IForm } from "@/base/types";
import { fetcher } from "@/base/network";

import { Icons } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Button, buttonVariants } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/submissions/date-range-picker";
import { DataTable } from "@/components/submissions/data-table/data-table";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/submissions/data-table/data-table-column-header";

export function FormDetails({ formId }: { formId: string }) {
  const { data, error, isLoading } = useSWR<{
    form: IForm;
    submissions;
    submissionKeys: string[];
  }>(`/api/submissions?formId=${formId}`, fetcher);

  if (!data && isLoading) {
    return;
  }

  console.log(data);

  const columns = getSubmissionColumns(data?.submissionKeys || []);
  const tableBodyData = data?.submissions.map(
    (submission) => submission.fields
  );
  return (
    <div className="w-full flex flex-col ">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{data?.form.name}</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>
            <Icons.download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Link
            href={`/form/settings?id=${formId}`}
            className={buttonVariants({ variant: "secondary", width: "full" })}
          >
            <Icons.settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </div>
      </div>

      <DataTable columns={columns} data={tableBodyData} />
    </div>
  );
}

function getSubmissionColumns(data) {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    ...data.map((submissionKey) => ({
      accessorKey: submissionKey,
      header: ({ column }) => {
        console.log(submissionKey);
        return (
          // <Button
          //   variant="ghost"
          //   onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          // >
          //   {capitalize(submissionKey)}
          //   <Icons.ArrowUpDown className="ml-2 h-4 w-4" />
          // </Button>
          <DataTableColumnHeader
            column={column}
            title={capitalize(submissionKey)}
          />
        );
      },
      cell: ({ row }) => {
        // const amount = parseFloat(row.getValue("amount"));
        // const formatted = new Intl.NumberFormat("en-US", {
        //   style: "currency",
        //   currency: "USD",
        // }).format(amount);
        console.log({ row });
        const value = row.getValue(submissionKey);
        console.log({ value });
        return <div className="text-left font-medium">{value}</div>;
      },
      enableSorting: true,
      enableHiding: true,
    })),
    {
      id: "actions",
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <Icons.moreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
