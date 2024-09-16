/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_CHATWOOT_ENABLED:string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
