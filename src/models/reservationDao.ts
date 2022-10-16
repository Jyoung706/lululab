import { ReservaionChangeDto, ReservaionListDto, ReservationDto } from "../Dto/reservationDto";
import { myDataSource } from "../typeorm/typeorm";

const getPossibleList = async () => {
  return await myDataSource.query(
    `SELECT hospitals.id,hospitals.name, address, lunch_time, open, close, 
            time_interval,departments.name as department, saturday, saturday_close_time,
            sunday, sunday_close_time, holiday, holiday_close_time
      FROM hospitals
      JOIN departments ON department_id = departments.id
      LEFT JOIN options ON options.hospital_id = hospitals.id
      WHERE hospitals.is_active = 1; 
    `
  );
};

const getVerifyTime = async (id: number) => {
  return await myDataSource.query(
    `SELECT lunch_time, open, close, time_interval,is_active,
            saturday, saturday_close_time, sunday, sunday_close_time,
            holiday, holiday_close_time
        FROM hospitals 
        JOIN options ON options.hospital_id = hospitals.id
        WHERE hospitals.id = ?
      `,
    [id]
  );
};

const getReservation = async (hospitalId: number, date: string, time: string) => {
  return await myDataSource.query(
    `SELECT hospital_id, date, time 
      FROM reservations 
      WHERE hospital_id = ? AND date = ? AND time = ?
    `,
    [hospitalId, date, time]
  );
};

const createReservation = async (data: ReservationDto, userId: number) => {
  await myDataSource.query(
    `INSERT INTO 
            reservations(reservation_number,patient_name,date,time,user_id,hospital_id,clinic_type_id,status_id)
     VALUES (CONCAT(DATE_FORMAT(now(), '%m%d%H%i%s'),floor(rand()*1000)),?,?,?,?,?,?,1)
    `,
    [data.patient_name, data.date, data.time, userId, data.hospital_id, data.clinic_type_id]
  );

  return await myDataSource.query(
    `SELECT reservation_number FROM reservations 
      WHERE user_id = ? 
      ORDER by created_at desc limit 1;
    `,
    [userId]
  );
};

const getReservaionList = async (data: ReservaionListDto) => {
  return await myDataSource.query(
    `SELECT reservation_number,patient_name,date,time,users.name as reservation_name, 
            hospitals.name as hospital,clinic_types.name as clinic_type,statuses.name as status,created_at,updated_at
        FROM reservations
        JOIN users ON reservations.user_id = users.id
        JOIN hospitals ON reservations.hospital_id = hospitals.id
        JOIN clinic_types ON reservations.clinic_type_id = clinic_types.id
        JOIN statuses ON reservations.status_id = statuses.id
        WHERE users.name = ? OR reservation_number = ? OR patient_name = ?
        ORDER BY created_at DESC;
    `,
    [data.reservation_name, data.reservation_number, data.patient_name]
  );
};

const getHospitalId = async (id: string) => {
  return await myDataSource.query(
    `SELECT id,hospital_id 
      FROM reservations
      WHERE reservation_number = ?;
    `,
    [id]
  );
};

const checkDate = async (id: number, date: string, time: string) => {
  return await myDataSource.query(
    `SELECT date,time 
      FROM reservations 
      WHERE hospital_id = ? 
      AND date = ? 
      AND time = ?;
    `,
    [id, date, time]
  );
};

const modifyReservation = async (id: number, data: ReservaionChangeDto) => {
  await myDataSource.query(
    `UPDATE  reservations 
      SET patient_name = ?, date = ?, time = ?, clinic_type_id = ?
      WHERE id = ?;
    `,
    [data.patient_name, data.reservation_date, data.reservation_time, data.clinic_type_id, id]
  );
};

export default {
  getPossibleList,
  getVerifyTime,
  getReservation,
  createReservation,
  getReservaionList,
  getHospitalId,
  checkDate,
  modifyReservation,
};
