import { createStore, createEvent, createEffect, forward } from "effector";
import { useStore } from "effector-react";

import { User } from "./model.types";
import { getUsers as getUsersRequest } from "@/shared/api/users";

const getUsers = createEvent<void>();

const handleGetUsersFx = createEffect(async () => {
  try {
    const { data } = await getUsersRequest();

    return data;
  } catch (e) {
    console.log(e);

    return null;
  }
});

const $users = createStore<User[]>([]).on(
  handleGetUsersFx.doneData,
  (state, users) => users || state,
);

forward({
  from: getUsers,
  to: handleGetUsersFx,
});

const useUsersStore = (): User[] => useStore($users);

const store = {
  useUsersStore,
};
const actions = {
  getUsers,
};

export { store, actions };
