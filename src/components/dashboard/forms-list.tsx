"use client";

import { FormCard } from "@/components/dashboard/form-card";
import useSWR from "swr";
import { fetcher } from "@/base/network";
import { IForm } from "@/base/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export function FormsList() {
  const { data, error, isLoading } = useSWR<{ forms: IForm[] }>(
    "/api/forms",
    fetcher
  );

  return (
    <div className="w-full flex flex-col space-y-6 pt-12 items-center">
      {data &&
        data.forms?.map((formItem) => (
          <FormCard formItem={formItem} key={formItem.id} />
        ))}

      {!data && !isLoading && (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center">
              Create your first form
            </CardTitle>
            <CardDescription className="text-center">
              Start receiving submissions.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Link
              href="/form/new"
              className={buttonVariants({ variant: "default", width: "full" })}
            >
              Create new form
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
