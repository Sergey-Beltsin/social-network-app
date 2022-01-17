import { createStore, createEffect, createEvent, sample } from "effector";
import { useStore } from "effector-react";

import { MessagesStore } from "./model.types";
import { MessagesCard } from "@/shared/types/messages";

const handleGetMessagesFx = createEffect(
  async (): Promise<MessagesStore> => [
    {
      id: "message-card-1",
      user: {
        name: "Ashot",
        surname: "Vanshot",
        username: "AshotVanshot",
        id: "ashot-vanshot-1",
        bio: "",
        created: new Date(),
      },
      messages: [
        {
          id: "message-1",
          message:
            "Здарова, пишу тебе потому что нужно протестить кое че, у тя найдется пару часов на этой неделе?",
          user: {
            name: "Ashot",
            surname: "Vanshot",
            username: "AshotVanshot",
            id: "ashot-vanshot-1",
            bio: "",
            created: new Date(),
          },
          created: new Date(),
          isOwnerMessage: false,
        },
        {
          id: "message-2",
          message: "Да найдется немного времени",
          user: {
            id: "31900c93-c47c-4512-a484-f8bd5bac389b",
            created: new Date(),
            bio: "",
            username: "SergeyBeltsin",
            name: "Sergey",
            surname: "Beltsin",
          },
          created: new Date(),
          isOwnerMessage: true,
        },
        {
          id: "message-3",
          message: "Че надо то?",
          user: {
            id: "31900c93-c47c-4512-a484-f8bd5bac389b",
            created: new Date(),
            bio: "",
            username: "SergeyBeltsin",
            name: "Sergey",
            surname: "Beltsin",
          },
          created: new Date(),
          isOwnerMessage: true,
        },
        {
          id: "message-4",
          message: "Есть лендинг, нужно проверить соответствие верстки макету",
          user: {
            name: "Ashot",
            surname: "Vanshot",
            username: "AshotVanshot",
            id: "ashot-vanshot-1",
            bio: "",
            created: new Date(),
          },
          created: new Date(),
          isOwnerMessage: false,
        },
        {
          id: "message-5",
          message: "Можешь взяться?",
          user: {
            name: "Ashot",
            surname: "Vanshot",
            username: "AshotVanshot",
            id: "ashot-vanshot-1",
            bio: "",
            created: new Date(),
          },
          created: new Date(),
          isOwnerMessage: false,
        },
      ],
    },
    {
      id: "message-card-2",
      user: {
        name: "Михаил",
        surname: "Михалыч",
        username: "MihailOtor",
        id: "mihail-otor-1",
        bio: "",
        created: new Date(),
      },
      messages: [
        {
          id: "message-6",
          message:
            "Серег, не найдется сотки занять сегодня? Верну на этой неделе, обещаю",
          user: {
            name: "Михаил",
            surname: "Михалыч",
            username: "MihailOtor",
            id: "mihail-otor-1",
            bio: "",
            created: new Date(),
          },
          created: new Date(),
          isOwnerMessage: false,
        },
      ],
    },
    {
      id: "message-card-3",
      user: {
        name: "Роналду",
        surname: "Косой",
        username: "RonalduKosoy",
        id: "ronaldu-kosoy-1",
        bio: "",
        created: new Date(),
      },
      messages: [
        {
          id: "message-7",
          message: "Ладно",
          user: {
            id: "31900c93-c47c-4512-a484-f8bd5bac389b",
            created: new Date(),
            bio: "",
            username: "SergeyBeltsin",
            name: "Sergey",
            surname: "Beltsin",
          },
          created: new Date(),
          isOwnerMessage: true,
        },
      ],
    },
    {
      id: "message-card-4",
      user: {
        name: "Макс",
        surname: "Максимыч",
        username: "MaxMaxim",
        id: "max-maxim-1",
        bio: "",
        created: new Date(),
      },
      messages: [
        {
          id: "message-8",
          message: "Ну типа да",
          user: {
            name: "Макс",
            surname: "Максимыч",
            username: "MaxMaxim",
            id: "max-maxim-1",
            bio: "",
            created: new Date(),
          },
          created: new Date(),
          isOwnerMessage: false,
        },
      ],
    },
  ],
);

const handlePushMessage =
  createEvent<{ conversationId: string; message: string }>();
const handleSetActiveConversation = createEvent<string>();
const forwardedConversation = createEvent<MessagesCard | null>();

const $messages = createStore<MessagesStore>([])
  .on(handleGetMessagesFx.doneData, (_, messages) => messages)
  .on(handlePushMessage, (store, { conversationId, message }) => {
    const newStore = [...store];

    newStore[
      newStore.findIndex((conversation) => conversation.id === conversationId)
    ].messages.push({
      id: "message",
      message,
      isOwnerMessage: true,
      created: new Date(),
      user: {
        id: "31900c93-c47c-4512-a484-f8bd5bac389b",
        created: new Date(),
        bio: "",
        username: "SergeyBeltsin",
        name: "Sergey",
        surname: "Beltsin",
      },
    });

    return newStore;
  });

const $activeConversation = createStore<MessagesCard | null>(null).on(
  forwardedConversation,
  (_, conversation) => conversation,
);

sample({
  source: $messages,
  target: forwardedConversation,
  clock: handleSetActiveConversation,
  fn: (store, id) =>
    store.find((conversation) => conversation.id === id) || null,
});

const useMessagesStore = (): MessagesStore => useStore($messages);
const useActiveConversationStore = (): MessagesCard | null =>
  useStore($activeConversation);

const store = { useMessagesStore, useActiveConversationStore };
const actions = {
  handleGetMessagesFx,
  handlePushMessage,
  handleSetActiveConversation,
};

export { store, actions };
