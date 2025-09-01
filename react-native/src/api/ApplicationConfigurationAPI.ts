import i18n from 'i18n-js';
import api from './API';
import { ApplicationConfiguration } from '../types';

export const getApplicationConfiguration = (): Promise<ApplicationConfiguration> =>
  api
    .get('/api/abp/application-configuration')
    .then(({ data }) => data)
    .then(async (config: ApplicationConfiguration) => {
      const { cultureName } = config.localization.currentCulture;
      i18n.locale = cultureName;

      Object.keys(config.localization.values).forEach((key: string) => {
        const resource = config.localization.values[key];

        if (typeof resource !== 'object') return;

        Object.keys(resource).forEach((key2: string) => {
          if (/'{|{/g.test(resource[key2])) {
            resource[key2] = resource[key2].replace(/'{|{/g, '{{').replace(/}'|}/g, '}}');
          }
        });
      });

      // Flatten the localization values structure
      const flattenedTranslations: Record<string, string> = {};
      Object.keys(config.localization.values).forEach((resourceKey) => {
        const resource = config.localization.values[resourceKey];
        if (typeof resource === 'object') {
          Object.keys(resource).forEach((key) => {
            flattenedTranslations[key] = resource[key];
          });
        }
      });

      i18n.translations[cultureName] = {
        ...flattenedTranslations,
        ...(i18n.translations[cultureName] || {}),
      };

      return config;
    });
