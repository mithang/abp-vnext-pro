// const yourIP = '192.168.1.8'; // See the docs https://docs.abp.io/en/abp/latest/Getting-Started-React-Native?Tiered=No
// const port = 44323;
// const apiUrl = `http://${yourIP}:${port}`;
const apiUrl = "https://000d0e2bc1ea.ngrok-free.app";

interface OAuthConfig {
  issuer: string;
  clientId: string;
  scope: string;
}

interface LocalizationConfig {
  defaultResourceName: string;
}

interface EnvConfig {
  apiUrl: string;
  oAuthConfig: OAuthConfig;
  localization: LocalizationConfig;
}

interface Environment {
  dev: EnvConfig;
  prod: EnvConfig;
}

const ENV: Environment = {
  dev: {
    apiUrl: apiUrl,
    oAuthConfig: {
      issuer: apiUrl,
      clientId: 'Solution_App',
      scope: 'offline_access Solution',
    },
    localization: {
      defaultResourceName: 'Solution',
    },
  },
  prod: {
    apiUrl: 'https://571bd294cfa0.ngrok-free.app',
    oAuthConfig: {
      issuer: 'https://571bd294cfa0.ngrok-free.app',
      clientId: 'Solution_App',
      scope: 'offline_access Solution',
    },
    localization: {
      defaultResourceName: 'Solution',
    },
  },
};

export const getEnvVars = (): EnvConfig => {
  // eslint-disable-next-line no-undef
  return __DEV__ ? ENV.dev : ENV.prod;
};