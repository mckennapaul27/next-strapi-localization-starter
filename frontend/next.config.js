const nextTranslate = require('next-translate');

module.exports = nextTranslate({
    webpack: (config, { isServer, webpack }) => {
        return config;
    },
    i18n: {
        locales: ['en', 'de', 'es'],
        defaultLocale: 'en',
    },
});
