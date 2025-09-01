declare module 'i18n-js' {
  interface I18n {
    t(key: string, options?: any): string;
    locale: string;
    defaultLocale: string;
    defaultSeparator: string;
    fallbacks: boolean;
    translations: any;
    localize(scope: string, value: any, options?: any): string;
  }

  const i18n: I18n;
  export = i18n;
}