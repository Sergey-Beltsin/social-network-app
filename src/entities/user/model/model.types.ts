import { Profile } from "@/shared/api/profile";

export type UsersEntityStore = {
  isLoading: boolean;
  list: Profile[];
};

export type UsersStore = {
  search: string;
  friends: UsersEntityStore;
  users: UsersEntityStore;
  incoming: UsersEntityStore;
};
