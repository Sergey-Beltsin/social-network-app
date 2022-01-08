module.exports = {
  locales: ["ru", "en"],
  defaultLocale: "ru",
  pages: {
    "*": ["common", "navigation", "languages", "profile", "errors", "friends"],
    "/login": ["auth"],
    "/register": ["auth"],
    "/friends": ["friends"],
    "/news": ["news"],
    "/messages": ["messages"],
    "/groups": ["groups"],
    "/settings": ["settings"],
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./src/shared/lib/lang/translations/${lang}/${ns}`).then(
      (m) => m.default,
    ),
};
