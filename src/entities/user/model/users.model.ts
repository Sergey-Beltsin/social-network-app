import { createEffect, createEvent, createStore, attach } from "effector";

import { Profile } from "@/shared/api/profile";
import { getUsers } from "@/shared/api/users";
import { $search } from "@/entities/user/model/search.model";
import { UsersEntityStore } from "./model.types";

const handleSetUsers = createEvent<Profile[]>();
export const handleResetUsers = createEvent<void>();
export const handleSetIsUsersLoading = createEvent<string | boolean>();

const handleGetUsersEffectFx = createEffect(async (search?: string) => {
  if (!search) {
    handleSetUsers([]);

    return;
  }

  try {
    const {
      data: { message },
    } = await getUsers(search);

    handleSetUsers(message);
  } catch (e) {
    console.log(e);
  }
});

export const handleGetUsersFx = attach({
  effect: handleGetUsersEffectFx,
  source: $search,
  mapParams: (_, search) => search,
});

export const $searchUsers = createStore<UsersEntityStore>({
  list: [],
  isLoading: true,
})
  .on(handleSetUsers, (store, users) => ({
    ...store,
    list: users,
  }))
  .on(handleGetUsersFx, (store) => ({
    ...store,
    isLoading: true,
  }))
  .on(handleGetUsersFx.doneData, (store) => ({
    ...store,
    isLoading: false,
  }))
  .on(handleSetIsUsersLoading, (store, isLoading) => ({
    ...store,
    isLoading: !!isLoading,
  }))
  .reset(handleResetUsers);
