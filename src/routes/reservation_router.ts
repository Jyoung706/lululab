import express from "express";
import reservationController from "../controllers/reservationController";
import { errorHandler } from "../middleware/errorHandler";

const router = express.Router();

router.get("/list", reservationController.possibleListController);

router.get("/time", reservationController.impossibleTimeController);

router.post("/reservation", errorHandler(reservationController.reservationController));

router.get("/reservation-list", errorHandler(reservationController.reservationListController));

router.patch(
  "/change-reservation",
  errorHandler(reservationController.reservationChangeController)
);

export default router;
