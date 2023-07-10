import { DataTableColumnHeader } from "@/components/submissions/data-table/data-table-column-header";
import { capitalize, isArray } from "lodash";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export function getSubmissionColumns(data) {
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

    ...data.map((submissionKey) => getColumnByType(submissionKey)),

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

function getColumnByType(submissionKey) {
  return {
    accessorKey: submissionKey,
    header: ({ column }) => {
      return (
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
      const value = row.getValue(submissionKey);
      const formattedValue = formatValue(submissionKey, value);
      return <div className="text-left font-medium">{formattedValue}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  };
}

function formatValue(key, value) {
  if (key === "created_at") {
    return formatDate(value);
  }
  if (isArray(value)) {
    return value.join(", ");
  }
  return value;
}

function formatDate(date) {
  return format(new Date(date), "LLL dd y, H:mm");
}
