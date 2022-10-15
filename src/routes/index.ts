import express from "express";
import reservationRouter from "./reservation_router";

const router = express.Router();

router.use("/reservation", reservationRouter);

export default router;
