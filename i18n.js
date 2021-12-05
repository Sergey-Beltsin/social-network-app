module.exports = {
  locales: ["ru", "en"],
  defaultLocale: "ru",
  pages: {
    "*": ["common", "navigation", "languages", "users"],
    "/login": ["auth"],
    "/register": ["auth"],
  },
  loadLocaleFrom: (lang, ns) =>
    import(`./src/shared/lib/lang/translations/${lang}/${ns}`).then(
      (m) => m.default,
    ),
};
