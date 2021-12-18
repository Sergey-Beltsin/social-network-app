import { Profile } from "@/shared/api/profile";

export type UsersStore = {
  search: string;
  friends: {
    isLoading: boolean;
    list: Profile[];
  };
  users: {
    isLoading: boolean;
    list: Profile[];
  };
  incoming: {
    isLoading: boolean;
    list: Profile[];
  };
};
