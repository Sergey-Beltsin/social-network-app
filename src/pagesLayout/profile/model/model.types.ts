import { Profile } from "@/shared/api/profile";

export type UserPageStore = {
  isLoading: boolean;
  profile: Profile;
};
