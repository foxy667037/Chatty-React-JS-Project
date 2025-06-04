import { RedisClient } from "../databases/redis.database.js";
import { generateHash } from "../utils/generateHash.js";

export const loginLimiter = async (req, res, next) => {
  const MAX_REQUEST_ATTEMPTS = 10;
  const BLOCK_TIME = 60 * 15; // 15 minutes
  const currentTime = Date.now();

  const userIp = req.ip || req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress;
  
  const loginBlockIp = `login_block:${generateHash(userIp)}`;

  try {
    const result = await RedisClient.hgetall(loginBlockIp);

    if (Object.keys(result).length === 0) {
      await RedisClient.hset(loginBlockIp, {
        blockedAt: currentTime,
        attempts: 1,
      });
      await RedisClient.expire(loginBlockIp, BLOCK_TIME);
      return next();
    }

    const currentAttempt = parseInt(result["attempts"]) || 0;

    if (currentAttempt >= MAX_REQUEST_ATTEMPTS) {
      const ttl = await RedisClient.ttl(loginBlockIp);
      return res.status(429).json({
        msg: `Too many failed login attempts. Try again in ${ttl} seconds.`,
      });
    }

    await RedisClient.hset(loginBlockIp, { attempts: currentAttempt + 1 });
    return next();

  } catch (error) {
    console.error("Login Limiter Error: ", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
