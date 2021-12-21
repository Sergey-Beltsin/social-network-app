import { createEffect, createEvent, createStore } from "effector";

import { attach } from "effector/effector.umd";
import { Profile } from "@/shared/api/profile";
import { getUsers } from "@/shared/api/users";
import { deleteElementById } from "@/shared/lib/utils";
import { $search } from "@/entities/user/model/search.model";
import { UsersEntityStore } from "./model.types";

const handleSetUsers = createEvent<Profile[]>();
export const handleSetSingleUser = createEvent<Profile>();
export const handleDeleteUser = createEvent<string>();
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
  .on(handleSetSingleUser, (store, user) => ({
    ...store,
    list: deleteElementById<Profile>(store.list, user.id, user),
  }))
  .on(handleDeleteUser, (store, userId) => ({
    ...store,
    list: deleteElementById<Profile>(store.list, userId),
  }))
  .on(handleSetIsUsersLoading, (store, isLoading) => ({
    ...store,
    isLoading: !!isLoading,
  }))
  .reset(handleResetUsers);
