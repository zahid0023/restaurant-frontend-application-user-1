import { api } from "./api";
import type { PageResponse } from "./common";

// ---------- Types ----------
export interface Locale {
  id: number;
  code: string;
  name: string;
  description?: string;
  sort_order: number;
}

export interface ListLocalesParams {
  page?: number;
  size?: number;
  sort_by?: "id" | "code" | "name" | "sortOrder" | "createdAt";
  sort_dir?: "ASC" | "DESC";
}

function buildQuery(params: Record<string, unknown> | object = {}): string {
  const qs = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");
  return qs ? `?${qs}` : "";
}

// ---------- API ----------
export const localesApi = {

  list: (params: ListLocalesParams = {}) =>
    api.get<PageResponse<Locale>>(`/locales${buildQuery(params as Record<string, unknown>)}`),

  get: (id: number) =>
    api.get<{ locale: Locale }>(`/locales/${id}`),
};