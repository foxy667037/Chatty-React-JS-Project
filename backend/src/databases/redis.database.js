import Redis from "ioredis";

export const RedisClient = new Redis({
  host: `${process.env.REDIS_DEV_HOST}`,
  port: process.env.REDIS_DEV_PORT,
  username: `${process.env.REDIS_DEV_USERNAME}`,
  password: `${process.env.REDIS_DEV_PASSWORD}`,
});

RedisClient.on('error', (err) => {
  console.error('[Redis Error]', err.message);
});

export const connectRedis = async () => {
  try {
    if (RedisClient) {
      const pingResponse = await RedisClient.ping();
      console.log(
        `Redis connected: ${RedisClient.options.host}:${RedisClient.options.port} | ping response: ${pingResponse}`
      );
    } else {
      console.log(`Redis connection Error.`);
    }
  } catch (error) {
    console.log("Redis connection Error: ", error);
  }
};
