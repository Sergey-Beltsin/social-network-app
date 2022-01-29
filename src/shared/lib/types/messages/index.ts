import { Profile } from "@/shared/api/profile";

export type Message = {
  id: string;
  message: string;
  user: Profile;
  created: Date;
  isOwnerMessage: boolean;
  conversation?: {
    id: string;
    created: Date;
    lastUpdated: Date;
  };
};

export type ConversationCard = {
  users: Profile[];
  messages: Message[];
  id: string;
  created: Date;
  lastUpdated: Date;
};
