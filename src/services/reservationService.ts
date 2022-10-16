import { ReservaionListDto, ReservationDto } from "../Dto/reservationDto";
import reservationDao from "../models/reservationDao";
import { BadRequestError } from "../middleware/error_creator";

const possibleListService = async () => {
  return await reservationDao.getPossibleList();
};

const reservationService = async (data: ReservationDto, userId: number) => {
  const [hospitaldata] = await reservationDao.getValidateTime(data.hospital_id);

  const date = new Date(data.date);
  const lunchTime = hospitaldata.lunch_time.split("~");
  const lunchStart = Number(lunchTime[0].split(":").join(""));
  const lunchEnd = Number(lunchTime[1].split(":").join(""));
  const time = Number(data.time.split(":").join(""));
  const validateInterval = data.time.split(":")[1];

  if (hospitaldata.is_active === 0) {
    throw new BadRequestError(`hospital is not open`);
  }

  if (date.getDay() === 6) {
    if (hospitaldata.saturday === 0) {
      throw new BadRequestError("inavailable in saturday");
    }
    if (data.time >= hospitaldata.saturday_close_time) {
      throw new BadRequestError("inavailable time");
    }
  }

  if (date.getDay() === 0) {
    if (hospitaldata.sunday === 0) {
      throw new BadRequestError("inavailable in sunday");
    }
    if (data.time >= hospitaldata.sunday_close_time) {
      throw new BadRequestError("inavailable time");
    }
  }

  if (data.time > hospitaldata.close || data.time < hospitaldata.open) {
    throw new BadRequestError("inavailable time");
  }
  if (time > lunchStart && time < lunchEnd) {
    throw new BadRequestError("hospital lunch time");
  }

  if (validateInterval !== "00" && validateInterval !== "30") {
    throw new BadRequestError("check time interval");
  }

  const [reservationData] = await reservationDao.getValidateReservation(
    data.hospital_id,
    data.date,
    data.time
  );
  if (reservationData) {
    throw new BadRequestError("already reserved");
  }

  return await reservationDao.createReservation(data, userId);
};

const reservationListService = async (data: ReservaionListDto) => {
  data.patient_name ? data.patient_name : (data.patient_name = "");
  data.reservation_name ? data.reservation_name : (data.reservation_name = "");
  data.reservation_number ? data.reservation_number : (data.reservation_number = "");
  const list = await reservationDao.getReservaionList(data);

  const dateToString = (date: Date) => {
    const dateString = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
    });
    return dateString;
  };

  list.map((val: any) => {
    val.created_at = dateToString(val.created_at);
    val.date = dateToString(val.date);
    if (val.updated_at) {
      val.updated_at = dateToString(val.updated_at);
    }
  });
  return list;
};

export default { possibleListService, reservationService, reservationListService };
