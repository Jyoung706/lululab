import reservationDao from "../models/reservationDao";
import { BadRequestError } from "../middleware/error_creator";

export const checkTime = async (id: number, checkDate: string, checkTime: string) => {
  const [hospitaldata] = await reservationDao.getVerifyTime(id);

  const date = new Date(checkDate);
  const lunchTime = hospitaldata.lunch_time.split("~");
  const lunchStart = Number(lunchTime[0].split(":").join(""));
  const lunchEnd = Number(lunchTime[1].split(":").join(""));
  const time = Number(checkTime.split(":").join(""));
  const verifyInterval = checkTime.split(":")[1];

  if (hospitaldata.is_active === 0) {
    throw new BadRequestError(`hospital is not open`);
  }

  if (date.getDay() === 6) {
    if (hospitaldata.saturday === 0) {
      throw new BadRequestError("inavailable in saturday");
    }
    if (checkTime >= hospitaldata.saturday_close_time) {
      throw new BadRequestError("inavailable time");
    }
  }

  if (date.getDay() === 0) {
    if (hospitaldata.sunday === 0) {
      throw new BadRequestError("inavailable in sunday");
    }
    if (checkTime >= hospitaldata.sunday_close_time) {
      throw new BadRequestError("inavailable time");
    }
  }

  if (checkTime > hospitaldata.close || checkTime < hospitaldata.open) {
    throw new BadRequestError("inavailable time");
  }
  if (time > lunchStart && time < lunchEnd) {
    throw new BadRequestError("hospital lunch time");
  }

  if (verifyInterval !== "00" && verifyInterval !== "30") {
    throw new BadRequestError("check time interval");
  }
};
