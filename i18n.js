module.exports = {
  locales: ["ru", "en"],
  defaultLocale: "ru",
  pages: {
    "*": [
      "common",
      "navigation",
      "languages",
      "profile",
      "errors",
      "friends",
      "messages",
    ],
    "/login": ["auth"],
    "/register": ["auth"],
    "/friends": ["friends"],
    "/news": ["news"],
    "/groups": ["groups"],
    "/settings": ["settings"],
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./src/shared/lib/lang/translations/${lang}/${ns}`).then(
      (m) => m.default,
    ),
};
