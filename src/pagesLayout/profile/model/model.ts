import { createEffect, createEvent, createStore, forward } from "effector";
import { useStore } from "effector-react";

import { UserPageStore } from "./model.types";
import { getUserById } from "@/shared/api/users";
import { Profile } from "@/shared/api/profile";

const handleSetUser = createEvent<Profile>();
const handleReset = createEvent<void>();
const handleSetIsLoading = createEvent<boolean>();
const handleGetUser = createEvent<string>();

const handleGetUserFx = createEffect(async (userId: string) => {
  try {
    handleSetIsLoading(true);

    const {
      data: { message },
    } = await getUserById(userId);

    handleSetUser(message);
  } catch (e) {
    console.log(e);
  } finally {
    handleSetIsLoading(false);
  }
});

const $userPage = createStore<UserPageStore>({
  isLoading: false,
  profile: {
    id: "",
    created: new Date(),
    bio: "",
    username: "",
    name: "",
    surname: "",
  },
})
  .on(handleSetUser, (store, profile) => ({ ...store, profile }))
  .on(handleSetIsLoading, (store, isLoading) => ({ ...store, isLoading }))
  .reset(handleReset);

forward({
  from: handleGetUser,
  to: handleGetUserFx,
});

const useUserPageStore = (): UserPageStore =>
  useStore<UserPageStore>($userPage);

const actions = {
  handleSetUser,
  handleReset,
  handleGetUser,
};
const store = {
  useUserPageStore,
};

export { actions, store };
