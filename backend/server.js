import app from "./src/app.js";
import { connectMongoDb } from "./src/databases/mongo.database.js";
import { connectRedis } from "./src/databases/redis.database.js";

const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectMongoDb();
  connectRedis();
});
