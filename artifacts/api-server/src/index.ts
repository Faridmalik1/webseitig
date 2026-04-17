import app from "./app";
import { logger } from "./lib/logger";
import { connectMongoDB } from "./lib/mongodb";

const rawPort = process.env["API_SERVER_PORT"] ?? process.env["PORT"] ?? "3000";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid API_SERVER_PORT/PORT value: "${rawPort}"`);
}

// Connect to MongoDB (non-fatal if URI not set)
connectMongoDB();

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }
  logger.info({ port }, "Server listening");
});
