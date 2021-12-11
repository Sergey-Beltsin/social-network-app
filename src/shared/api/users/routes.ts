export const usersRoutes = {
  users: (query?: string) => `/users?q=${query || ""}`,
  user: (id: string) => `/users/${id}`,
  posts: (id: string) => `/users/${id}/posts`,
};
