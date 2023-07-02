import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { deleter as _deleter, fetcher, poster } from "@/base/network";
import { IForm } from "@/base/types";

export function useForms(options) {
  const id = options?.id;
  // const { data, error, isLoading, mutate } = useSWR(
  //   id ? `/api/forms/${id}` : "/api/forms",
  //   fetcher
  // );

  // const deleter = useSWRMutation(`/api/forms/${id}`, _deleter);

  return {
    // data,
    // isLoading,
    // isError: error,
    // mutate: mutate,
    // deleter,
  };
}
