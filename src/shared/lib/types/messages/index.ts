import { Profile } from "@/shared/api/profile";

export type Message = {
  id: string;
  message: string;
  user: Profile;
  created: string;
  isOwnerMessage: boolean;
  conversation?: {
    id: string;
    created: string;
    lastUpdated: string;
  };
};

export type ConversationCard = {
  users: Profile[];
  messages: Message[];
  id: string;
  created: string;
  lastUpdated: string;
};
