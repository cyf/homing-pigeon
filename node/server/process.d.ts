declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string
    POSTGRES_PRISMA_URL: string
    POSTGRES_URL_NON_POOLING: string
    KV_HOST: string
    KV_PORT: string
    KV_USERNAME: string
    KV_PASSWORD: string
    JWT_SECRET: string
    SESSION_SECRET: string
    ENCRYPT_KEY: string
    ENCRYPT_IV: string
    REQUEST_SIGN_KEY: string
    RENDER_GIT_BRANCH: string
    RENDER_GIT_COMMIT: string
    RENDER_GIT_REPO_SLUG: string
  }
}
