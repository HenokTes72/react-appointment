// @flow
export type IAppointment = {
  id: string | number,
  specialist: {
    id: string | number,
    name: string
  },
  patient: {
    id: string | number,
    email: string,
    firstName: string,
    lastName: string,
    phone: string
  },
  appointment: {
    place: {
      id: string | number,
      name: string
    },
    date: string | Date,
    startTime: string | Date,
    endTime: string | Date,
    duration: string,
    detail: string,
    consulta: string
  },
  emailCheck?: boolean
};
