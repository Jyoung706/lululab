import { Request, Response } from "express";
import reservationService from "../services/reservationService";

const possibleListController = async (req: Request, res: Response) => {
  const list = await reservationService.possibleListService();
  res.status(200).json(list);
};

export default { possibleListController };
