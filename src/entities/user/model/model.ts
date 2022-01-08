import { createEvent, combine, guard, forward } from "effector";
import { useStore } from "effector-react";

import { UsersStore } from "@/entities/user/model/model.types";
import {
  $friends,
  handleGetFriendsFx,
  handleResetFriends,
  handleSetIsFriendsLoading,
} from "./friends.model";
import {
  $searchUsers,
  handleGetUsersFx,
  handleResetUsers,
  handleSetIsUsersLoading,
} from "./users.model";
import {
  $incoming,
  handleGetIncomingRequestsFx,
  handleResetIncoming,
} from "./incoming.model";
import { $search, handleResetSearch, handleSetSearch } from "./search.model";

const handleSearch = createEvent<void>();
const handleReset = createEvent<void>();

const $users = combine<UsersStore>({
  search: $search,
  friends: $friends,
  users: $searchUsers,
  incoming: $incoming,
});

forward({
  from: handleSearch,
  to: [handleGetFriendsFx, handleGetUsersFx],
});
guard({
  clock: handleSetSearch,
  filter: (search) => !search,
  target: [handleResetUsers, handleResetFriends],
});
guard({
  clock: handleSetSearch,
  filter: (search) => !!search,
  target: [handleSetIsUsersLoading, handleSetIsFriendsLoading],
});
forward({
  from: handleReset,
  to: [
    handleResetSearch,
    handleResetUsers,
    handleResetFriends,
    handleResetIncoming,
  ],
});

const useUsersStore = (): UsersStore => useStore($users);

const store = {
  useUsersStore,
};
const actions = {
  handleGetFriendsFx,
  handleGetIncomingRequestsFx,
  handleSetSearch,
  handleSearch,
  handleReset,
};

export { store, actions };
