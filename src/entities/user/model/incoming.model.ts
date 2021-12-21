import { createEffect, createEvent, createStore } from "effector";

import { Profile } from "@/shared/api/profile";
import { getIncomingFriendRequests } from "@/shared/api/users";
import { deleteElementById } from "@/shared/lib/utils";
import { UsersEntityStore } from "./model.types";

const handleSetIncomingRequests = createEvent<Profile[]>();
export const handleSetSingleIncomingRequest = createEvent<Profile>();
export const handleDeleteIncomingRequest = createEvent<string>();
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
  .on(handleSetSingleIncomingRequest, (store, request) => ({
    ...store,
    list: deleteElementById(store.list, request.id, request),
  }))
  .on(handleDeleteIncomingRequest, (store, userId) => ({
    ...store,
    list: deleteElementById(store.list, userId),
  }))
  .reset(handleResetIncoming);
