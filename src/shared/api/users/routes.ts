export const usersRoutes = {
  users: (query?: string) => `/users?q=${query || ""}`,
  user: (id: string) => `/users/${id}`,
  posts: (id: string) => `/users/${id}/posts`,
  friends: (id: string) => `/users/${id}/friends`,
  friendRequests: "/users/friend-request",
  friendRequest: (id: string) => `/users/friend-request/${id}`,
  incomingRequests: "/users/friend-request/incoming",
};
