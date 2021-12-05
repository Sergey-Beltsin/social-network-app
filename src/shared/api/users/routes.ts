export const usersRoutes: Record<
  string,
  string | ((query: Partial<string>) => string)
> = {
  users: (query?: string) => `/users?q=${query || ""}`,
};
