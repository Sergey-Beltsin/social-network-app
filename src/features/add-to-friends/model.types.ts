import { Profile } from "@/shared/api/profile";

export type AddToFriendsStore = {
  loadingId: string;
};

export type ActionPayload = {
  user: Profile;
  onSuccess?: () => void;
};
