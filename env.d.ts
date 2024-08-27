declare namespace NodeJS {
    interface ProcessEnv {
        DATABASE_URL: string;
        DATABASE_HOST: string;
        DATABASE_USER: string;
        DATABASE_PASSWORD: passwor;
        COOKIE_SECRET: string;
        REDIS_URL: string;
        NODE_ENV: 'development' | 'production';
        PORT: number;
        PUBLIC_URL: string;
        DEVELOPMENT_URL: string;
        COOKIE_SECRET: string;
    }
}
