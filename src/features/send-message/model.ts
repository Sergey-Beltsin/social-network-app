import { createEvent, createStore } from "effector";
import { useStore } from "effector-react";

const handleChange = createEvent<string>();
const handleReset = createEvent<void>();

const $message = createStore<string>("")
  .on(handleChange, (_, value) => value)
  .reset(handleReset);

const useMessageStore = (): string => useStore($message);

const store = { useMessageStore };
const actions = { handleChange, handleReset };

export { store, actions };
