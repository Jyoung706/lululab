export class ReservationDto {
  patient_name: string;
  date: string;
  time: string;
  hospital_id: number;
  clinic_type_id: number;
}

export class ReservaionListDto {
  reservation_number?: string;
  reservation_name?: string;
  patient_name?: string;
}

export class ReservaionChangeDto {
  reservation_number: string;
  patient_name: string;
  reservation_date: string;
  reservation_time: string;
  clinic_type_id: number;
}
