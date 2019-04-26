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
  mockAppointmentCancel,
  mockPatientByName
} from './mock';

const LOCAL_END_POINT = 'http://localhost:3000/api/v1/appointment';
const DEV_REMOTE_END_POINT = 'http://test1.saludvitale.com';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const IS_REMOTE = true;
const USE_MOCK = false;
const USE_PROXY = true;

const isRemote = remote => (remote === undefined ? IS_REMOTE : remote);
const completeRemoteUrl = endPoint =>
  `${CORS_PROXY}${DEV_REMOTE_END_POINT}${endPoint}`;
const completeLocalUrl = endPoint => `${LOCAL_END_POINT}${endPoint}`;

const mockedWith = ({
  urlGenerator,
  mocker,
  isNonGet = false,
  useMock = USE_MOCK
}) => async parameters => {
  const execApiCall = () =>
    isNonGet
      ? axios({ url: urlGenerator({ ...parameters }), ...parameters })
      : axios(urlGenerator({ ...parameters }));
  return useMock ? mocker({ ...parameters }) : execApiCall();
};

const urlFetchAll = () => completeLocalUrl(`/`);

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
      completeRemoteUrl(
        `/getDisponibleIdinst?id=${professionalId}&fecha=${selectedDate}&inst=${institutionId}&_=${token}`
      )
    : completeLocalUrl(`/${selectedDate}`);

export const getAppointmentByDate = mockedWith({
  urlGenerator: urlAppointmentByDate,
  mocker: mockAppointmentByDate,
  useMock: true
});

const urlAppointmentById = ({ id, secret, remote = IS_REMOTE }) =>
  isRemote(remote)
    ? completeRemoteUrl(`/getUserDocinst?slot_id=${id}&_=${secret}`)
    : completeLocalUrl(`/details/${id}`);

export const getAppointmentById = mockedWith({
  urlGenerator: urlAppointmentById,
  mocker: mockAppointmentById
});

const urlFetchEmails = ({ query, remote = IS_REMOTE }) =>
  isRemote(remote)
    ? completeRemoteUrl(`/citas/buscaruserL?email=${query}`)
    : completeLocalUrl(`/emails`);

export const getEmails = mockedWith({
  urlGenerator: urlFetchEmails,
  mocker: mockEmailInfo
});

const urlFetchUserByEmail = ({ query, remote = IS_REMOTE }) =>
  isRemote(remote)
    ? completeRemoteUrl(`/buscaruser?email=${query}`)
    : completeLocalUrl(`/user/${query}`);

export const getUserByEmail = mockedWith({
  urlGenerator: urlFetchUserByEmail,
  mocker: mockUserInfo
});

const urlFetchBasicInfo = ({ remote = false }) =>
  isRemote(remote)
    ? completeRemoteUrl(`/CitaBasic`)
    : completeLocalUrl(`/basics`);

export const getBasicInfo = mockedWith({
  urlGenerator: urlFetchBasicInfo,
  mocker: mockBasicInfo,
  useMock: true
});

const urlAppointmentCreate = ({ remote = false }) =>
  isRemote(remote)
    ? completeRemoteUrl(`/crearcitainst`)
    : completeLocalUrl(`/`);

export const doAppointmentCreate = mockedWith({
  urlGenerator: urlAppointmentCreate,
  mocker: mockAppointmentCreate,
  useMock: true
});

const urlAppointmentUpdate = ({ remote = false }) =>
  isRemote(remote)
    ? completeRemoteUrl(`/updatecitainst`)
    : completeLocalUrl(`/update`);

export const doAppointmentUpdate = mockedWith({
  urlGenerator: urlAppointmentUpdate,
  mocker: mockAppointmentUpdate,
  useMock: true
});

const urlAppointmentCancel = ({ remote = false }) =>
  isRemote(remote)
    ? completeRemoteUrl(`/cancelcitainst`)
    : completeLocalUrl(`/cancel`);

export const doAppointmentCancel = mockedWith({
  urlGenerator: urlAppointmentCancel,
  mocker: mockAppointmentCancel,
  useMock: true
});

const urlPatientByName = ({ name, remote = true }) =>
  isRemote(remote)
    ? completeRemoteUrl(`/citas/buscarpacienteL?paciente=${name}`)
    : completeLocalUrl(`/name`);

export const getUserByName = mockedWith({
  urlGenerator: urlPatientByName,
  mocker: mockPatientByName,
  useMock: false
});

export default { IS_REMOTE, USE_MOCK, USE_PROXY };
