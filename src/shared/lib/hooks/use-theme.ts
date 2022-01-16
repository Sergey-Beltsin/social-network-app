import { useEffect } from "react";
import { createEffect, createEvent, createStore, sample } from "effector";
import { useStore } from "effector-react";

type Theme = "light" | "auto" | "dark";
let media: MediaQueryList;

export const handleChangeTheme = createEvent<Theme>();
const handleChangeProvidedTheme = createEvent<"light" | "dark">();
const handleCheckMedia = createEvent<MediaQueryListEvent>();

const handleMediaFx = createEffect(
  ({ event, theme }: { event: MediaQueryListEvent; theme: Theme }) => {
    if (theme === "auto") {
      if (event.matches) {
        handleChangeProvidedTheme("dark");
      } else {
        handleChangeProvidedTheme("light");
      }
    }
  },
);

const $theme = createStore<{ value: Theme; providedValue: "light" | "dark" }>({
  value: "auto",
  providedValue: "light",
})
  .on(handleChangeTheme, (store, value) => {
    localStorage.setItem("theme", value);
    let providedValue: Theme;

    if (value === "light" || value === "dark") {
      providedValue = value;
    } else if (media?.matches) {
      providedValue = "dark";
    } else {
      providedValue = "light";
    }

    return { value, providedValue };
  })
  .on(handleChangeProvidedTheme, (store, providedValue) => ({
    ...store,
    providedValue: store.value === "auto" ? providedValue : store.providedValue,
  }));

sample({
  clock: handleCheckMedia,
  source: $theme,
  fn: (store, event) => ({
    event,
    theme: store.value,
  }),
  target: handleMediaFx,
});

export const useTheme = () => {
  const theme = useStore($theme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      handleChangeTheme(savedTheme as Theme);
    }

    media = window.matchMedia("(prefers-color-scheme: dark)");
    if (media.matches && theme.value === "auto") {
      handleChangeProvidedTheme("dark");
    }
    media.addListener(handleCheckMedia);

    return () => {
      media.removeListener(handleCheckMedia);
    };
  }, []);

  return theme;
};
