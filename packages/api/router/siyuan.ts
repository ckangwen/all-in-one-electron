import { createTRPCRouter, procedure } from "../trpc";

const BASE_URL = "http://127.0.0.1:6806";
const BASE_URL_BACKUP = "http://127.0.0.1:16489";

interface SiYuanApiResponse<T = unknown> {
  code: number;
  msg: string;
  data: T;
}

export interface QuerySqlResponse {
  alias: string;
  box: string;
  content: string;
  created: string;
  fcontent: string;
  hash: string;
  hpath: string;
  ial: string;
  id: string;
  length: number;
  markdown: string;
  memo: string;
  name: string;
  parent_id: string;
  path: string;
  root_id: string;
  sort: number;
  subtype: string;
  tag: string;
  type: string;
  updated: string;
}

async function request<T>(url: string, data?: Record<string, string | number>) {
  const params = {
    method: "POST",
    headers: {
      Authorization: "Token 6tgunax7ic4com2b",
    },
    body: JSON.stringify(data || {}),
    cors: "cors",
  };

  try {
    const res = await fetch(`${BASE_URL}${url}`, params);

    return res.json() as unknown as Promise<SiYuanApiResponse<T>>;
  } catch (e) {
    const res = await fetch(`${BASE_URL_BACKUP}${url}`, params);
    return res.json() as unknown as Promise<SiYuanApiResponse<T>>;
  }
}

async function wrapRequest<T>(
  url: string,
  params: Record<string, string | number> = {}
) {
  const res = await request<T>(url, params);

  if (res.code !== 0) {
    return null;
  }
  return res.data;
}

export function querySql(sql: string) {
  return wrapRequest<QuerySqlResponse[]>("/api/query/sql", {
    stmt: sql,
  });
}

export function getBlockMd(id: string) {
  return wrapRequest<{
    content: string;
    hPath: string;
  }>("/api/export/exportMdContent", {
    id,
  });
}

export const siYuanRouter = createTRPCRouter({
  todoList: procedure.query(() => {
    return querySql(
      `select * from blocks where id in (select root_id from blocks where markdown like '%#TODO%')`
    );
  }),
  randomTodo: procedure.query(async () => {
    const data = await querySql(
      `select * from blocks where id in (select root_id from blocks where markdown like '%#TODO%')`
    );
    if (!data) return null;
    const item = data[Math.floor(Math.random() * data.length)];
    const mdRes = await getBlockMd(item.id);

    return {
      id: item.id,
      title: item.content,
      content: mdRes?.content,
    }
  }),
});
