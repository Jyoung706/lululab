import express from "express";
import logger from "morgan";
import routes from "./routes/reservation_router";

export const createApp = () => {
  const app = express();
  app.use(logger("tiny"), express.json(), routes);
  return app;
};
