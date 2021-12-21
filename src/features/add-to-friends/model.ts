import { createEvent, createStore, createEffect, forward } from "effector";
import { useStore } from "effector-react";

import { AddToFriendsStore } from "./model.types";
import {
  addUserToFriends,
  respondOnFriendRequestById,
} from "@/shared/api/users";
import { Profile } from "@/shared/api/profile";
import { actions as userActions } from "@/entities/user";

const { handleSetSingleUser } = userActions;

const handleAddToFriends = createEvent<Profile>();
const handleRespondToRequest =
  createEvent<{ user: Profile; onSuccess?: () => void }>();
const handleDeleteFriendRequest = createEvent<Profile>();
const handleSetLoadingId = createEvent<string>();

const handleAddToFriendsFx = createEffect(async (user: Profile) => {
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
        handleSetSingleUser({
          ...user,
          friendRequest: {
            id: user.friendRequest?.id || "",
            status: "sent",
            isActionSentNow: true,
          },
        });
        handleSetLoadingId("");
      },
    });

    return;
  }
  try {
    const {
      data: { message },
    } = await addUserToFriends(user.id);

    handleSetSingleUser({
      ...user,
      friendRequest: {
        id: message.id,
        status: "sent",
        isActionSentNow: true,
      },
    });
  } catch (e) {
    console.log(e);
  }
});

const handleRespondToRequestFx = createEffect(
  async ({ user, onSuccess }: { user: Profile; onSuccess?: () => void }) => {
    if (!user.friendRequest) {
      return;
    }

    try {
      await respondOnFriendRequestById(
        user.friendRequest?.id || "",
        user.friendRequest?.status,
      );

      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      console.log(e);
    }
  },
);

const handleDeleteFriendRequestFx = createEffect(async (user: Profile) => {
  if (!user.friendRequest) {
    return;
  }

  try {
    await respondOnFriendRequestById(user.friendRequest.id || "", "not-sent");

    handleSetSingleUser({
      ...user,
      friendRequest: {
        ...user.friendRequest,
        status: "not-sent",
      },
    });
  } catch (e) {
    console.log(e);
  }
});

const $addToFriends = createStore<AddToFriendsStore>({
  loadingId: "",
})
  .on(handleSetLoadingId, (store, loadingId) => ({ ...store, loadingId }))
  .on(handleAddToFriends, (store, { id }) => ({ ...store, loadingId: id }))
  .on(handleAddToFriendsFx.doneData, (store) => ({ ...store, loadingId: "" }))
  .on(handleRespondToRequest, (store, { user: { id } }) => ({
    ...store,
    loadingId: id,
  }))
  .on(handleRespondToRequestFx.doneData, (store) => ({
    ...store,
    loadingId: "",
  }))
  .on(handleDeleteFriendRequest, (store, { id }) => ({
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
