import express from "express";
import reservationController from "../controllers/reservationController";

const router = express.Router();

router.get("/list", reservationController.possibleListController);

export default router;
