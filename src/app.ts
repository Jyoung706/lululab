import express from "express";
import logger from "morgan";

export const createApp = () => {
  const app = express();
  app.use(logger("tiny"), express.json());
  return app;
};
