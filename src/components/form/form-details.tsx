import useSWR from "swr";
import Link from "next/link";
import qs from "query-string";

import { IForm } from "@/base/types";
import { fetcher } from "@/base/network";

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/submissions/date-range-picker";
import { DataTable } from "@/components/submissions/data-table/data-table";
import { prisma } from "@/base/prisma";

async function getForm(formId) {
  const data = await prisma.form.findFirst({
    where: { id: formId },
  });

  return data;
}

export async function FormDetails({ formId }: { formId: string }) {
  const data = await getForm(formId);

  return (
    <div className="w-full flex flex-col ">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          {data?.name || ""}
        </h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>
            <Icons.download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Link
            href={`/form/${formId}/settings`}
            className={buttonVariants({ variant: "secondary", width: "full" })}
          >
            <Icons.settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </div>
      </div>
      <DataTable formId={formId} />
    </div>
  );
}
