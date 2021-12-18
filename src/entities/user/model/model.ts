import {
  createStore,
  createEvent,
  createEffect,
  forward,
  sample,
} from "effector";
import { useStore } from "effector-react";

import {
  getIncomingFriendRequests,
  getUserFriendsById,
  getUsers,
} from "@/shared/api/users";
import { Profile } from "@/shared/api/profile";
import { UsersStore } from "@/entities/user/model/model.types";
import { deleteElementById } from "@/shared/lib/utils";

const handleGetUsers = createEvent<void>();
const handleGetFriends = createEvent<string>();
const handleGetIncomingRequests = createEvent<void>();
const handleSetUsers = createEvent<Profile[]>();
const handleSetFriends = createEvent<Profile[]>();
const handleSetIncomingRequests = createEvent<Profile[]>();
const handleSetSingleUser = createEvent<Profile>();
const handleDeleteUser = createEvent<string>();
const handleAddFriend = createEvent<Profile>();
const handleDeleteFriend = createEvent<string>();
const handleDeleteIncomingRequest = createEvent<string>();
const handleSetSearch = createEvent<string>();
const handleSearch = createEvent<void>();
const handleReset = createEvent<void>();

const handleGetFriendsFx = createEffect(async (userId: string) => {
  try {
    const {
      data: { message },
    } = await getUserFriendsById(userId);

    handleSetFriends(message);
  } catch (e) {
    console.log(e);
  }
});

const handleGetUsersFx = createEffect(async (search?: string) => {
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

const handleGetIncomingRequestsFx = createEffect(async () => {
  try {
    const {
      data: { message },
    } = await getIncomingFriendRequests();

    handleSetIncomingRequests(message);
  } catch (e) {
    console.log(e);
  }
});

// TODO refactor store to multiple store using combine
const $users = createStore<UsersStore>({
  search: "",
  friends: {
    isLoading: true,
    list: [],
  },
  users: {
    isLoading: true,
    list: [],
  },
  incoming: {
    isLoading: true,
    list: [],
  },
})
  .on(handleSetSearch, (store, search) => ({ ...store, search }))
  .on(handleSetFriends, (store, friends) => ({
    ...store,
    friends: { ...store.friends, list: friends },
  }))
  .on(handleSetUsers, (store, users) => ({
    ...store,
    users: { ...store.users, list: users },
  }))
  .on(handleSetIncomingRequests, (store, incomingRequests) => ({
    ...store,
    incoming: { ...store.incoming, list: incomingRequests },
  }))
  .on(handleGetFriendsFx, (store) => ({
    ...store,
    friends: { ...store.friends, isLoading: true },
  }))
  .on(handleGetFriendsFx.doneData, (store) => ({
    ...store,
    friends: { ...store.friends, isLoading: false },
  }))
  .on(handleGetUsersFx, (store) => ({
    ...store,
    users: { ...store.users, isLoading: true },
  }))
  .on(handleGetUsersFx.doneData, (store) => ({
    ...store,
    users: { ...store.users, isLoading: false },
  }))
  .on(handleGetIncomingRequestsFx, (store) => ({
    ...store,
    incoming: { ...store.incoming, isLoading: true },
  }))
  .on(handleGetIncomingRequestsFx.doneData, (store) => ({
    ...store,
    incoming: { ...store.incoming, isLoading: false },
  }))
  .on(handleSetSingleUser, (store, user) => ({
    ...store,
    users: {
      ...store.users,
      list: deleteElementById<Profile>(store.users.list, user.id, user),
    },
  }))
  .on(handleDeleteIncomingRequest, (store, userId) => ({
    ...store,
    incoming: {
      ...store.incoming,
      list: deleteElementById(store.incoming.list, userId),
    },
  }))
  .on(handleDeleteUser, (store, userId) => ({
    ...store,
    users: {
      ...store.users,
      list: deleteElementById<Profile>(store.users.list, userId),
    },
  }))
  .on(handleAddFriend, (store, friend) => ({
    ...store,
    friends: { ...store.friends, list: [...store.friends.list, friend] },
  }))
  .on(handleDeleteFriend, (store, friendId) => ({
    ...store,
    friends: {
      ...store.friends,
      list: deleteElementById(store.friends.list, friendId),
    },
  }))
  .reset(handleReset);

forward({
  from: handleGetFriends,
  to: handleGetFriendsFx,
});
forward({
  from: handleGetUsers,
  to: handleGetUsersFx,
});
sample({
  clock: handleSearch,
  source: $users,
  fn: ({ search }) => search,
  target: handleGetUsersFx,
});
forward({
  from: handleGetIncomingRequests,
  to: handleGetIncomingRequestsFx,
});

const useUsersStore = (): UsersStore => useStore($users);

const store = {
  useUsersStore,
};
const actions = {
  handleGetUsers,
  handleGetFriends,
  handleGetIncomingRequests,
  handleSetSingleUser,
  handleDeleteUser,
  handleAddFriend,
  handleDeleteFriend,
  handleDeleteIncomingRequest,
  handleSetSearch,
  handleSearch,
  handleReset,
};

export { store, actions };
