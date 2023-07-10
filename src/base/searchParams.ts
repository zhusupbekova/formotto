import { ReadonlyURLSearchParams } from "next/navigation";
import { SearchParameterTypes } from "@/base/types";

export function updateSearchParam(
  searchParams: ReadonlyURLSearchParams,
  param: SearchParameterTypes,
  value: string
) {
  const currentSearchParams = new URLSearchParams(
    Array.from(searchParams.entries())
  );
  currentSearchParams.set(param, value);

  return currentSearchParams;
}
