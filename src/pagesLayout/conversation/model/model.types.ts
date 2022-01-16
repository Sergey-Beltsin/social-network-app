import { Profile } from "@/shared/api/profile";
import { Message } from "@/shared/types/messages";

export type ConversationStore = {
  user: Profile;
  messages: Message[];
};
