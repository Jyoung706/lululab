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

export default { getPossibleList };
