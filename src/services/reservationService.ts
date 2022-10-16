import { ReservaionChangeDto, ReservaionListDto, ReservationDto } from "../Dto/reservationDto";
import reservationDao from "../models/reservationDao";
import { BadRequestError, NotExistError } from "../middleware/error_creator";
import { checkTime } from "../common_function/checkDate";

const possibleListService = async () => {
  return await reservationDao.getPossibleList();
};

const reservationService = async (data: ReservationDto, userId: number) => {
  await checkTime(data.hospital_id, data.date, data.time);

  const [reservationData] = await reservationDao.getReservation(
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

const reservationChangeService = async (data: ReservaionChangeDto) => {
  const [hospitalId] = await reservationDao.getHospitalId(data.reservation_number);

  const checkDate = await reservationDao.checkDate(
    hospitalId.hospital_id,
    data.reservation_date,
    data.reservation_time
  );

  if (checkDate.length) {
    throw new BadRequestError("already reserved time");
  }

  if (data.clinic_type_id > 3) {
    throw new NotExistError("not exist clinic_type");
  }

  await checkTime(hospitalId.hospital_id, data.reservation_date, data.reservation_time);

  await reservationDao.modifyReservation(hospitalId.id, data);
};

export default {
  possibleListService,
  reservationService,
  reservationListService,
  reservationChangeService,
};
