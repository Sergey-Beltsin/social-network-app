import {
  createStore,
  createEffect,
  createEvent,
  sample,
  attach,
} from "effector";
import { useStore } from "effector-react";

import { Socket } from "socket.io-client";
import { ConversationsStore } from "./model.types";
import { ConversationCard, Message } from "@/shared/lib/types/messages";
import { Profile } from "@/shared/api/profile";
import { deleteElementById } from "@/shared/lib/utils";

const handleSendMessageEffectFx = createEffect(
  async ({
    conversationId,
    message,
    socket,
    user,
  }: {
    conversationId: string | null;
    message: string;
    socket: Socket | null;
    user: Profile | null;
  }) => {
    socket?.emit("sendMessage", { message, user, conversationId });
  },
);

const handleSetActiveConversation = createEvent<string>();
const forwardedConversation = createEvent<ConversationCard | null>();
const handleReset = createEvent<void>();
const handleSetSocket = createEvent<Socket>();
const handleSetConversations = createEvent<ConversationsStore>();
const handlePrependConversation = createEvent<ConversationCard>();
const handlePushMessage = createEvent<Required<Message>>();

const $conversations = createStore<ConversationsStore>([])
  .on(handleSetConversations, (_, conversations) => conversations)
  .on(handlePrependConversation, (store, conversation) => [
    conversation,
    ...store,
  ])
  .on(handlePushMessage, (store, { conversation: { id }, ...message }) => {
    const newStore = deleteElementById([...store], id);
    const currentConversation = store.find(
      (conversation) => conversation.id === id,
    );

    if (!currentConversation) {
      throw new Error(`No conversation find with the same id: ${id}`);
    }

    currentConversation?.messages.push(message);

    return [currentConversation, ...newStore];
  });

const $activeConversation = createStore<ConversationCard | null>(null)
  .on(forwardedConversation, (_, conversation) => conversation)
  .reset(handleReset);

const $socket = createStore<Socket | null>(null).on(
  handleSetSocket,
  (_, socket) => socket,
);

sample({
  source: $conversations,
  target: forwardedConversation,
  clock: handleSetActiveConversation,
  fn: (store, id) =>
    store.find((conversation) => conversation.id === id) || null,
});

const handleSendMessageFx = attach({
  source: $socket,
  effect: handleSendMessageEffectFx,
  mapParams: (
    params: {
      conversationId: string | null;
      message: string;
      user: Profile | null;
    },
    socket,
  ) => ({ ...params, socket }),
});

const useMessagesStore = (): ConversationsStore => useStore($conversations);
const useActiveConversationStore = (): ConversationCard | null =>
  useStore($activeConversation);
const useMessagesSocketStore = (): Socket | null => useStore($socket);

const store = {
  useMessagesStore,
  useActiveConversationStore,
  useMessagesSocketStore,
  $socket,
};
const actions = {
  handleSetConversations,
  handlePrependConversation,
  handleSetActiveConversation,
  handleReset,
  handleSetSocket,
  handleSendMessageFx,
  handlePushMessage,
};

export { store, actions };
