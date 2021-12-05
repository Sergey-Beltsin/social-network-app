import { createEffect, createEvent, createStore, forward } from "effector";

import { useStore } from "effector-react";
import { ProfileStore } from "./model.types";
import { getProfile as getProfileRequest } from "@/shared/api/profile";
import { Auth } from "@/entities/profile";

const getProfile = createEvent<void>();
const setProfile = createEvent<ProfileStore>();
const resetProfile = createEvent<void>();

const handleGetProfileFx = createEffect(async () => {
  try {
    const { data } = await getProfileRequest();

    return data;
  } catch (e) {
    Auth.clear();

    return null;
  }
});

const $profile = createStore<ProfileStore>({
  id: -1,
  email: "",
  username: "",
  name: "",
  surname: "",
})
  .on(handleGetProfileFx.doneData, (state, profile) => profile || state)
  .on(setProfile, (state, profile) => profile)
  .reset(resetProfile);

forward({
  from: getProfile,
  to: handleGetProfileFx,
});

const useProfileStore = (): ProfileStore => useStore($profile);

const store = {
  useProfileStore,
};
const actions = {
  getProfile,
  resetProfile,
  setProfile,
};

export { store, actions };
