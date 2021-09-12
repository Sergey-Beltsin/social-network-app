module.exports = {
  locales: ["en", "ru"],
  defaultLocale: "ru",
  pages: {
    "*": ["common"],
  },
  logger: true,
  loadLocaleFrom: (lang, ns) =>
    import(`./public/translations/${lang}/${ns}.json`).then((m) => m.default),
};
