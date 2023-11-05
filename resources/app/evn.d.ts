/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EXAMPLE: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_PUSHER_APP_KEY: string;
  readonly VITE_PUSHER_HOST: string;
  readonly VITE_PUSHER_PORT: string;
  readonly VITE_PUSHER_SCHEME: string;
  readonly VITE_PUSHER_APP_CLUSTER: string;

  readonly VITE_ENDPOINT_URL: string;
  readonly VITE_REQUEST_TIMEOUT: number;
  readonly VITE_DEBOUNCE_TIME: string;

  readonly VITE_CLOUDINARY_CLOUD_NAME: string;
  readonly VITE_CLOUDINARY_API_KEY: string;
  readonly VITE_CLOUDINARY_API_SECRET: string;
  readonly VITE_CLOUDINARY_UPLOAD_PRESET: string;

  readonly VITE_PASSPORT_PASSWORD_GRANT_CLIENT_ID: number;
  readonly VITE_PASSPORT_PASSWORD_GRANT_CLIENT_SECRET: string;
  readonly VITE_PASSPORT_PASSWORD_GRANT_TYPE_LOGIN: string;
  readonly VITE_PASSPORT_PASSWORD_GRANT_TYPE_REFRESH: string;
  readonly PASSPORT_AUTH_GRANT_PASSWORD: boolean;

  //add more env variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
