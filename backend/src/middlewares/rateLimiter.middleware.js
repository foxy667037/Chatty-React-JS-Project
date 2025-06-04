import moment from "moment";
import { generateHash } from "../utils/generateHash.js";
import { RedisClient } from "../databases/redis.database.js";

export const rateLimiter = async (req, res, next) => {
  const RATE_LIMIT_DURATION = 60; // Duration in seconds
  const RATE_LIMIT_REQUEST_ALLOWED = 10; // Max requests allowed

  const userIp = req.ip || req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress;

  const rateLimitIp = `rate_limit:${generateHash(userIp)}`;
  const currentTime = moment().unix();

  try {
    const result = await RedisClient.hgetall(rateLimitIp);

    if (Object.keys(result).length === 0) {
      await RedisClient.hset(rateLimitIp, {
        createdAt: currentTime,
        attempt: 1,
      });
      return next();
    }

    const diff = currentTime - result["createdAt"];

    if (diff > RATE_LIMIT_DURATION) {
      RedisClient.del(rateLimitIp)
      await RedisClient.hset(rateLimitIp, {
        createdAt: currentTime,
        attempt: 1,
      });
      return next();
    }

    if (parseInt(result["attempt"]) >= RATE_LIMIT_REQUEST_ALLOWED) {
      return res.status(429).json({
        msg: `User Rate-Limited. Allowed Only ${RATE_LIMIT_REQUEST_ALLOWED} Request in ${RATE_LIMIT_DURATION} seconds.`,
      });
    }

    await RedisClient.hset(rateLimitIp, {
      attempt: parseInt(result["attempt"]) + 1,
    });
    return next();
  } catch (err) {
    console.error("Rate Limiter Error: ", err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};