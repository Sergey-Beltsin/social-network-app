import { createEvent, createStore, createEffect, forward } from "effector";
import { useStore } from "effector-react";

import { ActionPayload, AddToFriendsStore } from "./model.types";
import {
  addUserToFriends,
  respondOnFriendRequestById,
} from "@/shared/api/users";

const handleAddToFriends = createEvent<ActionPayload>();
const handleRespondToRequest = createEvent<ActionPayload>();
const handleDeleteFriendRequest = createEvent<ActionPayload>();
const handleSetLoadingId = createEvent<string>();

const handleAddToFriendsFx = createEffect(
  async ({ user, onSuccess }: ActionPayload) => {
    if (user.friendRequest?.id) {
      handleSetLoadingId(user.id);

      handleRespondToRequest({
        user: {
          ...user,
          friendRequest: {
            ...user.friendRequest,
            status: "waiting-for-response",
          },
        },
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          }
          handleSetLoadingId("");
        },
      });

      return;
    }
    try {
      await addUserToFriends(user.id);

      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      console.log(e);
    }
  },
);

const handleRespondToRequestFx = createEffect(
  async ({ user, onSuccess }: ActionPayload) => {
    if (!user.friendRequest || !user.friendRequest.id) {
      return;
    }

    try {
      await respondOnFriendRequestById(
        user.friendRequest.id,
        user.friendRequest.status,
      );

      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      console.log(e);
    }
  },
);

const handleDeleteFriendRequestFx = createEffect(
  async ({ user, onSuccess }: ActionPayload) => {
    if (!user.friendRequest) {
      return;
    }

    try {
      await respondOnFriendRequestById(user.friendRequest.id || "", "not-sent");

      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      console.log(e);
    }
  },
);

const $addToFriends = createStore<AddToFriendsStore>({
  loadingId: "",
})
  .on(handleSetLoadingId, (store, loadingId) => ({ ...store, loadingId }))
  .on(handleAddToFriends, (store, { user: { id } }) => ({
    ...store,
    loadingId: id,
  }))
  .on(handleAddToFriendsFx.doneData, (store) => ({ ...store, loadingId: "" }))
  .on(handleRespondToRequest, (store, { user: { id } }) => ({
    ...store,
    loadingId: id,
  }))
  .on(handleRespondToRequestFx.doneData, (store) => ({
    ...store,
    loadingId: "",
  }))
  .on(handleDeleteFriendRequest, (store, { user: { id } }) => ({
    ...store,
    loadingId: id,
  }))
  .on(handleDeleteFriendRequestFx.doneData, (store) => ({
    ...store,
    loadingId: "",
  }));

forward({
  from: handleAddToFriends,
  to: handleAddToFriendsFx,
});
forward({
  from: handleRespondToRequest,
  to: handleRespondToRequestFx,
});
forward({
  from: handleDeleteFriendRequest,
  to: handleDeleteFriendRequestFx,
});

const useAddToFriendsStore = (): AddToFriendsStore => useStore($addToFriends);

const store = {
  useAddToFriendsStore,
};
const actions = {
  handleAddToFriends,
  handleRespondToRequest,
  handleDeleteFriendRequest,
};

export { store, actions };
