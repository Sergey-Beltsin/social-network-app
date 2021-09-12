module.exports = {
  locales: ['en', 'ru'],
  defaultLocale: 'ru',
  pages: {
    '*': ['common'],
  },
  loadLocaleFrom: (lang, ns) => import(`./src/shared/lib/lang/translations/${lang}/${ns}.json`)
    .then((m) => m.default),
};
