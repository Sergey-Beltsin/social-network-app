import { attach, createEffect, createEvent, createStore } from "effector";

import { Profile } from "@/shared/api/profile";
import { getUserFriendsById } from "@/shared/api/users";
import { handleSetIsUsersLoading } from "@/entities/user/model/users.model";
import { $profile } from "@/entities/profile/model";
import { $search } from "@/entities/user/model/search.model";
import { UsersEntityStore } from "@/entities/user/model/model.types";

const handleSetFriends = createEvent<Profile[]>();
export const handleResetFriends = createEvent<void>();
export const handleSetIsFriendsLoading = createEvent<string | boolean>();

const handleGetFriendsEffectFx = createEffect(
  async ({ search, userId }: { search: string; userId: string }) => {
    try {
      const {
        data: { message },
      } = await getUserFriendsById(userId, search);

      handleSetFriends(message);
    } catch (e) {
      console.log(e);
    }
  },
);

export const handleGetFriendsFx = attach({
  effect: handleGetFriendsEffectFx,
  source: [$profile, $search],
  mapParams: (_, [{ id }, search]) => ({ search, userId: id }),
});

export const $friends = createStore<UsersEntityStore>({
  list: [],
  isLoading: true,
})
  .on(handleSetFriends, (store, friends) => ({
    ...store,
    list: friends,
  }))
  .on(handleGetFriendsFx, (store) => ({
    ...store,
    isLoading: true,
  }))
  .on(handleGetFriendsFx.doneData, (store) => ({
    ...store,
    isLoading: false,
  }))
  .on(handleSetIsUsersLoading, (store, isLoading) => ({
    ...store,
    isLoading: !!isLoading,
  }))
  .reset(handleResetFriends);
