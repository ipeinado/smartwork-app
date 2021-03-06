const i18n = require('i18next');
const backend = require('i18next-fs-backend');
const LanguageDetector = require('i18next-electron-language-detector');

const config = require('./app.config');

const path = require('path');

const i18nextOptions = {
	backend: {
    // path where resources get loaded from
    loadPath: path.join(process.cwd(), '/locales/{{lng}}/{{ns}}.json')
  },
  saveMissing: true,
  fallbackLng: 'en',
  whitelist: config.languages
};

i18n
  .use(LanguageDetector)
  .use(backend)
  .init(i18nextOptions);

module.exports = i18n;