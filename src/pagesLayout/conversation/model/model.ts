import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";

import { ConversationStore } from "./model.types";

const setConversation = createEvent<ConversationStore>();

const $conversation = createStore<ConversationStore>({
  user: {
    id: "",
    username: "",
    name: "",
    surname: "",
    created: new Date(),
    bio: "",
  },
  messages: [],
}).on(setConversation, (_, conversation) => conversation);

const useConversationStore = (): ConversationStore => useStore($conversation);

const store = { useConversationStore };
const actions = { setConversation };

export { store, actions };
