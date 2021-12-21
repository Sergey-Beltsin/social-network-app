import { createEvent, createStore } from "effector";

export const handleSetSearch = createEvent<string>();
export const handleResetSearch = createEvent<void>();

export const $search = createStore<string>("")
  .on(handleSetSearch, (_, search) => search)
  .reset(handleResetSearch);
