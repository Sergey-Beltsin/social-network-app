import { createEffect, createEvent, createStore } from "effector";

import { Profile } from "@/shared/api/profile";
import { getIncomingFriendRequests } from "@/shared/api/users";
import { UsersEntityStore } from "./model.types";

const handleSetIncomingRequests = createEvent<Profile[]>();
export const handleResetIncoming = createEvent<void>();

export const handleGetIncomingRequestsFx = createEffect(async () => {
  try {
    const {
      data: { message },
    } = await getIncomingFriendRequests();

    handleSetIncomingRequests(message);
  } catch (e) {
    console.log(e);
  }
});

export const $incoming = createStore<UsersEntityStore>({
  list: [],
  isLoading: true,
})
  .on(handleSetIncomingRequests, (store, incomingRequests) => ({
    ...store,
    list: incomingRequests,
  }))
  .on(handleGetIncomingRequestsFx, (store) => ({
    ...store,
    isLoading: true,
  }))
  .on(handleGetIncomingRequestsFx.doneData, (store) => ({
    ...store,
    isLoading: false,
  }))
  .reset(handleResetIncoming);
