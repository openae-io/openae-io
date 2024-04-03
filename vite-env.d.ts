/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FEATURES_PLAYGROUND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
