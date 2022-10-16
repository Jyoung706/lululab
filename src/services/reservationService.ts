import { ReservaionChangeDto, ReservaionListDto, ReservationDto } from "../Dto/reservationDto";
import reservationDao from "../models/reservationDao";
import { BadRequestError, NotExistError } from "../middleware/error_creator";
import { checkDate, checkTime } from "../common_function/checkDate";
import { sendGMail } from "../common_function/nodeemailer";

const possibleListService = async () => {
  return await reservationDao.getPossibleList();
};

const reservationService = async (data: ReservationDto, userId: number) => {
  checkDate(data.date);

  const [timeInterval] = await reservationDao.getHospitalIntervalTime(data.hospital_id);
  await checkTime(data.hospital_id, data.date, data.time, timeInterval.time_interval);

  const [reservationData] = await reservationDao.getReservation(
    data.hospital_id,
    data.date,
    data.time
  );
  if (reservationData) {
    throw new BadRequestError("already reserved");
  }

  const [email] = await reservationDao.getUserEmail(userId);
  const [hospital] = await reservationDao.getHospitalName(data.hospital_id);
  sendGMail({
    to: `${email.email}`,
    subject: `${hospital.name}에 예약이 완료되었습니다.`,
    text: `lululab 병원예약 서비스를 이용해주셔서 감사합니다.
    ${hospital.name}에 ${data.date} ${data.time} 에 정상적으로 예약이 완료되었습니다.
    예약된 시간에 병원에 방문하지 않을 시 어플 이용에 제한이 있습니다.`,
  });

  return await reservationDao.createReservation(data, userId);
};

const reservationListService = async (data: ReservaionListDto) => {
  data.patient_name ? data.patient_name : (data.patient_name = "");
  data.reservation_name ? data.reservation_name : (data.reservation_name = "");
  data.reservation_number ? data.reservation_number : (data.reservation_number = "");
  const list = await reservationDao.getReservaionList(data);

  const dateToString1 = (date: Date) => {
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

  const dateToString2 = (date: Date) => {
    const dateString = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
    return dateString;
  };

  list.map((val: any) => {
    val.created_at = dateToString1(val.created_at);
    val.date = dateToString2(val.date) + " " + val.time;
    if (val.updated_at) {
      val.updated_at = dateToString1(val.updated_at);
    }
  });
  return list;
};

const reservationChangeService = async (data: ReservaionChangeDto) => {
  const [hospitalId] = await reservationDao.getHospitalId(data.reservation_number);
  if (!hospitalId) {
    throw new NotExistError("Not exist data");
  }

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

  const [interval] = await reservationDao.getHospitalIntervalTime(hospitalId.hospital_id);

  await checkTime(
    hospitalId.hospital_id,
    data.reservation_date,
    data.reservation_time,
    interval.time_interval
  );

  await reservationDao.modifyReservation(hospitalId.id, data);
};

export default {
  possibleListService,
  reservationService,
  reservationListService,
  reservationChangeService,
};
