import { createStore, createEffect } from "effector";
import { useStore } from "effector-react";

import { MessagesStore } from "./model.types";

const fakeUser = {
  name: "Ashot",
  surname: "Vanshot",
  username: "AshotVanshot",
  id: "ashot-vanshot-1",
  bio: "",
  created: new Date(),
};
const otherFakeUser = {
  name: "Михаил",
  surname: "Михалыч",
  username: "MihailOtor",
  id: "mihail-otor-1",
  bio: "",
  created: new Date(),
};

const handleGetMessagesFx = createEffect(
  async (): Promise<MessagesStore> => [
    {
      user: fakeUser,
      messages: [
        {
          id: "message-1",
          message:
            "Здарова, пишу тебе потому что нужно протестить кое че, у тя найдется пару часов на этой неделе?",
          user: fakeUser,
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
          user: fakeUser,
          created: new Date(),
          isOwnerMessage: false,
        },
        {
          id: "message-5",
          message: "Можешь взяться?",
          user: fakeUser,
          created: new Date(),
          isOwnerMessage: false,
        },
      ],
    },
    {
      user: otherFakeUser,
      messages: [
        {
          id: "message-6",
          message:
            "Серег, не найдется сотки занять сегодня? Верну на этой неделе, обещаю",
          user: fakeUser,
          created: new Date(),
          isOwnerMessage: false,
        },
      ],
    },
    {
      user: fakeUser,
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
      user: otherFakeUser,
      messages: [
        {
          id: "message-8",
          message: "Ну типа да",
          user: fakeUser,
          created: new Date(),
          isOwnerMessage: false,
        },
      ],
    },
  ],
);

const $messages = createStore<MessagesStore>([]).on(
  handleGetMessagesFx.doneData,
  (_, messages) => messages,
);

const useMessagesStore = (): MessagesStore => useStore($messages);

const store = { useMessagesStore };
const actions = { handleGetMessagesFx };

export { store, actions };
