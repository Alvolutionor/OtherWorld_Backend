import {RedisClientOptions} from 'redis'
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: string;
      SOCKET_PORT: string;
      REDIS_URL: RedisClientOptions;
      MONGO_URL : string;
      AWS_ACCESS_KEY_ID: string;
      AWS_ACCESS_KEY_SECRET: string;
      AWS_BUCKET_NAME: string;

    }
  }
}
export {}