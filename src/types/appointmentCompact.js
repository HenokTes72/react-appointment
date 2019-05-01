// @flow
export type ICompactAppointment = {|
  id: number | string,
  doctor_id: number | string,
  patient: string,
  slot_date: Date | string,
  inicio: Date | string,
  fin: Date | string,
  duration: string,
  slot_status?: string | number,
  user_id: string | number,
  doctor_id: string | number,
  clinica: string,
  clinicaId?: string | number
|};
