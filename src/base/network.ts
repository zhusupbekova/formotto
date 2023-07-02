import axios from "axios";

export async function poster<T, RType = any>(path: string, data: { arg: T }) {
  return axios.post(path, data.arg).then((d) => d.data as RType);
}

export async function fetcher<RType = any>(path: string) {
  return axios.get(path).then((d) => d.data as RType);
}

export async function deleter<T, RType = any>(path: string, data: { arg: T }) {
  return axios.delete(path).then((d) => d.data as RType);
}
