import { Request, Response } from "express";
import { validateUser } from "../common_function/validate_user";
import { ReservaionListDto, ReservationDto } from "../Dto/reservationDto";
import { NotExistError } from "../middleware/error_creator";
import reservationService from "../services/reservationService";

const possibleListController = async (req: Request, res: Response) => {
  const list = await reservationService.possibleListService();
  res.status(200).json(list);
};

const reservationController = async (req: Request, res: Response) => {
  const userId: any = req.headers.userid;
  const data: ReservationDto = req.body;
  await validateUser(userId);
  const [reservationNumber] = await reservationService.reservationService(data, userId);

  res.status(200).json({
    message: "reservation success",
    reservaion_number: reservationNumber.reservation_number,
  });
};

const reservationListController = async (req: Request, res: Response) => {
  const data: ReservaionListDto = req.query;
  const list = await reservationService.reservationListService(data);
  if (!list.length) {
    throw new NotExistError("not exist list");
  }
  res.status(200).json(list);
};

export default { possibleListController, reservationController, reservationListController };
