"use client";
import useSWR from "swr";
import { IForm } from "@/base/types";
import { fetcher } from "@/base/network";

export function FormDetails({ formId }: { formId: string }) {
  const { data, error, isLoading } = useSWR<{ form: IForm }>(
    `/api/forms?formId=${formId}`,
    fetcher
  );
  console.log(data);
  return <div>ololo</div>;
}
