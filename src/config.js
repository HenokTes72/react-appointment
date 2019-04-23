import axios from 'axios';

import {
  mockAllAppointments,
  mockBasicInfo,
  mockEmailInfo,
  mockUserInfo,
  mockAppointmentById,
  mockAppointmentByDate,
  mockAppointmentCreate,
  mockAppointmentUpdate
} from './mock';

const LOCAL_END_POINT = 'http://localhost:3000/api/v1/appointment';
const DEV_REMOTE_END_POINT = 'http://test1.saludvitale.com';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const IS_REMOTE = false;
const USE_MOCK = true;
const USE_PROXY = false;

const isRemote = remote => (remote === undefined ? IS_REMOTE : remote);

const mockedWith = (
  urlGenerator,
  mocker,
  isPost = false
) => async parameters => {
  const handleNonMock = () =>
    isPost
      ? axios({ url: urlGenerator({ ...parameters }), ...parameters })
      : axios(urlGenerator({ ...parameters }));
  return USE_MOCK ? mocker() : handleNonMock();
};

const urlFetchAll = () => `${LOCAL_END_POINT}/`;

export const getAllAppointments = mockedWith(urlFetchAll, mockAllAppointments);

const urlAppointmentByDate = ({
  professionalId,
  selectedDate,
  institutionId,
  token,
  remote
}) =>
  isRemote(remote)
    ? // eslint-disable-next-line max-len
      `${CORS_PROXY}${DEV_REMOTE_END_POINT}/getDisponibleIdinst?id=${professionalId}&fecha=${selectedDate}&inst=${institutionId}&_=${token}`
    : `${LOCAL_END_POINT}/${selectedDate}`;

export const getAppointmentByDate = mockedWith(
  urlAppointmentByDate,
  mockAppointmentByDate
);

const urlAppointmentById = ({ id, secret, remote }) =>
  isRemote(remote)
    ? `${CORS_PROXY}${DEV_REMOTE_END_POINT}getUserDocinst?slot_id=${id}&_=${secret}`
    : `${LOCAL_END_POINT}/details/${id}`;

export const getAppointmentById = mockedWith(
  urlAppointmentById,
  mockAppointmentById
);

const urlFetchEmails = ({ query, remote }) =>
  isRemote(remote)
    ? `${CORS_PROXY}${DEV_REMOTE_END_POINT}/citas/buscaruserL?email=${query}`
    : `${LOCAL_END_POINT}/emails`;

export const getEmails = mockedWith(urlFetchEmails, mockEmailInfo);

const urlFetchUserByEmail = ({ query, remote }) =>
  isRemote(remote)
    ? `${CORS_PROXY}${DEV_REMOTE_END_POINT}/buscaruser?email=${query}`
    : `${LOCAL_END_POINT}/user/${query}`;

export const getUserByEmail = mockedWith(urlFetchUserByEmail, mockUserInfo);

const urlFetchBasicInfo = ({ remote = false }) =>
  isRemote(remote)
    ? `${CORS_PROXY}${DEV_REMOTE_END_POINT}/CitaBasic`
    : `${LOCAL_END_POINT}/basics`;

export const getBasicInfo = mockedWith(urlFetchBasicInfo, mockBasicInfo);

const urlAppointmentCreate = ({ remote }) =>
  isRemote(remote)
    ? `${CORS_PROXY}${DEV_REMOTE_END_POINT}/crearcitainst`
    : `${LOCAL_END_POINT}/`;

export const doAppointmentCreate = mockedWith(
  urlAppointmentCreate,
  mockAppointmentCreate
);

const urlAppointmentUpdate = ({ remote }) =>
  isRemote(remote)
    ? `${CORS_PROXY}${DEV_REMOTE_END_POINT}/updatecitainst`
    : `${LOCAL_END_POINT}/update`;

export const doAppointmentUpdate = mockedWith(
  urlAppointmentUpdate,
  mockAppointmentUpdate
);

export default { IS_REMOTE, USE_MOCK, USE_PROXY };
