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
    const {
      data: { message },
    } = await getProfileRequest();

    return message;
  } catch (e) {
    Auth.clear();

    return null;
  }
});

const $profile = createStore<ProfileStore>({
  id: "",
  created: new Date(),
  bio: "",
  username: "",
  name: "",
  surname: "",
})
  .on(handleGetProfileFx.doneData, (store, profile) => profile || store)
  .on(setProfile, (store, profile) => profile)
  .reset(resetProfile);

forward({
  from: getProfile,
  to: handleGetProfileFx,
});

const useProfileStore = (): ProfileStore => useStore($profile);

const store = {
  useProfileStore,
  $profile,
};
const actions = {
  getProfile,
  resetProfile,
  setProfile,
};

export { store, actions };
