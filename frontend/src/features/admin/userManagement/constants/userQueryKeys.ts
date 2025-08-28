export const userQueryKeys = {
  all: ["users"] as const,
  list: () => [...userQueryKeys.all, "list"] as const,
  detail: (id: string) => [...userQueryKeys.all, "detail", id] as const,
}
