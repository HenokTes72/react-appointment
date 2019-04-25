import axios from 'axios';

import {
  mockAllAppointments,
  mockBasicInfo,
  mockEmailInfo,
  mockUserInfo,
  mockAppointmentById,
  mockAppointmentByDate,
  mockAppointmentCreate,
  mockAppointmentUpdate,
  mockAppointmentCancel
} from './mock';

const LOCAL_END_POINT = 'http://localhost:3000/api/v1/appointment';
const DEV_REMOTE_END_POINT = 'http://test1.saludvitale.com';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const IS_REMOTE = true;
const USE_MOCK = true;
const USE_PROXY = true;

const isRemote = remote => (remote === undefined ? IS_REMOTE : remote);

const mockedWith = ({
  urlGenerator,
  mocker,
  isNonGet = false,
  useMock = USE_MOCK
}) => async parameters => {
  const handleNonMock = () =>
    isNonGet
      ? axios({ url: urlGenerator({ ...parameters }), ...parameters })
      : axios(urlGenerator({ ...parameters }));
  return useMock ? mocker() : handleNonMock();
};

const urlFetchAll = () => `${LOCAL_END_POINT}/`;

export const getAllAppointments = mockedWith(urlFetchAll, mockAllAppointments);

const urlAppointmentByDate = ({
  professionalId,
  selectedDate,
  institutionId,
  token,
  remote = IS_REMOTE
}) =>
  isRemote(remote)
    ? // eslint-disable-next-line max-len
      `${CORS_PROXY}${DEV_REMOTE_END_POINT}/getDisponibleIdinst?id=${professionalId}&fecha=${selectedDate}&inst=${institutionId}&_=${token}`
    : `${LOCAL_END_POINT}/${selectedDate}`;

export const getAppointmentByDate = mockedWith({
  urlGenerator: urlAppointmentByDate,
  mocker: mockAppointmentByDate,
  useMock: true
});

const urlAppointmentById = ({ id, secret, remote = IS_REMOTE }) =>
  isRemote(remote)
    ? `${CORS_PROXY}${DEV_REMOTE_END_POINT}/getUserDocinst?slot_id=${id}&_=${secret}`
    : `${LOCAL_END_POINT}/details/${id}`;

export const getAppointmentById = mockedWith({
  urlGenerator: urlAppointmentById,
  mocker: mockAppointmentById
});

const urlFetchEmails = ({ query, remote = IS_REMOTE }) =>
  isRemote(remote)
    ? `${CORS_PROXY}${DEV_REMOTE_END_POINT}/citas/buscaruserL?email=${query}`
    : `${LOCAL_END_POINT}/emails`;

export const getEmails = mockedWith({
  urlGenerator: urlFetchEmails,
  mocker: mockEmailInfo
});

const urlFetchUserByEmail = ({ query, remote = IS_REMOTE }) =>
  isRemote(remote)
    ? `${CORS_PROXY}${DEV_REMOTE_END_POINT}/buscaruser?email=${query}`
    : `${LOCAL_END_POINT}/user/${query}`;

export const getUserByEmail = mockedWith({
  urlGenerator: urlFetchUserByEmail,
  mocker: mockUserInfo
});

const urlFetchBasicInfo = ({ remote = false }) =>
  isRemote(remote)
    ? `${CORS_PROXY}${DEV_REMOTE_END_POINT}/CitaBasic`
    : `${LOCAL_END_POINT}/basics`;

export const getBasicInfo = mockedWith({
  urlGenerator: urlFetchBasicInfo,
  mocker: mockBasicInfo,
  useMock: true
});

const urlAppointmentCreate = ({ remote = false }) =>
  isRemote(remote)
    ? `${CORS_PROXY}${DEV_REMOTE_END_POINT}/crearcitainst`
    : `${LOCAL_END_POINT}/`;

export const doAppointmentCreate = mockedWith({
  urlGenerator: urlAppointmentCreate,
  mocker: mockAppointmentCreate,
  useMock: true
});

const urlAppointmentUpdate = ({ remote = false }) =>
  isRemote(remote)
    ? `${CORS_PROXY}${DEV_REMOTE_END_POINT}/updatecitainst`
    : `${LOCAL_END_POINT}/update`;

export const doAppointmentUpdate = mockedWith({
  urlGenerator: urlAppointmentUpdate,
  mocker: mockAppointmentUpdate,
  useMock: true
});

const urlAppointmentCancel = ({ remote = false }) =>
  isRemote(remote)
    ? `${CORS_PROXY}${DEV_REMOTE_END_POINT}/cancelcitainst`
    : `${LOCAL_END_POINT}/cancel`;

export const doAppointmentCancel = mockedWith({
  urlGenerator: urlAppointmentCancel,
  mocker: mockAppointmentCancel,
  useMock: true
});

export default { IS_REMOTE, USE_MOCK, USE_PROXY };
