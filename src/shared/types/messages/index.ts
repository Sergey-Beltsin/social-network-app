import { Profile } from "@/shared/api/profile";

export type Message = {
  id: string;
  message: string;
  user: Profile;
  created: Date;
  isOwnerMessage: boolean;
};

export type MessagesCard = {
  user: Profile;
  messages: Message[];
  id: string;
};
