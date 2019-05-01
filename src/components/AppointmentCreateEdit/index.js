// @flow
import React, { useContext } from 'react';
import { Input, Select, Form, Icon, Modal } from 'antd';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import moment from 'moment';

import AppointmentSchema from './schema';
import AutoComplete from '../AutoComplete';
import StyledDatePicker from '../DatePicker';
import Error from '../Error';
import CustomSelect from './CustomSelect';
import withMobile from '../../utils/withMobile';
import Span from '../Span';
import FormItem from './FormItem';
import FormInline from './FormInline';
import Footer from './Footer';

import useFetchEmails from '../../hooks/fetchEmails';
import useFetchNames from '../../hooks/fetchNames';
import useFetchUserByEmail from '../../hooks/fetchUserByEmail';
import useAppointmentCreate from '../../hooks/createAppointment';
import ModalVisibilityContext from '../../contexts/visibilityContext';

import type { IAppointment } from '../../types/appointmentDetailed';
import type { ICompactAppointment } from '../../types/appointmentCompact';

import addDuration from '../../utils/addDuration';

import {
  Wrapper,
  StyledH2,
  SizeStyledH2,
  WidthStyledButton,
  StyledInput,
  StyledCheck,
  FormGroupLeft,
  FormGroupRight,
  FormWrapper,
  FormDetail,
  HeaderWrapper,
  CenteredH2
} from './style';

const { Option } = Select;
const { TextArea } = Input;

const AppointmentCreateEdit = ({
  isMobileScreen,
  specialists,
  branches,
  durations,
  times,
  addToSchedules,
  addToAppointmentCache,
  scheduleIds,
  isCreate,
  updateAppointmentCache,
  updateScheduleCache,
  data
}) => {
  const { emails, setQuery } = useFetchEmails();
  const { namedUsersData, setName } = useFetchNames();
  const { setEmailAndCallback } = useFetchUserByEmail();
  const { setNewAppointmentData } = useAppointmentCreate();
  const {
    setCreateModalVisibility,
    setEditModalVisibility,
    setEventModalVisibility
  } = useContext(ModalVisibilityContext);

  const dataForSchedules = ({
    id,
    place,
    date,
    start,
    end,
    patient,
    patientId,
    doctorId,
    clinicaId
  }): ICompactAppointment => {
    return {
      id,
      slot_date: date,
      patient,
      inicio: start,
      fin: end,
      duration: '',
      slot_status: 1,
      user_id: patientId,
      doctor_id: doctorId,
      clinica: place,
      clinicaId
    };
  };

  const setSubmit = (actions, values) => (success, message) => {
    if (success) {
      const {
        specialist: { id: doctorId },
        patient: { id: patientId, firstName, lastName },
        appointment: {
          startTime,
          endTime,
          date,
          place: { id: clinicaId, name: clinica }
        }
      } = values;
      const dataToSchedules = dataForSchedules({
        id: values.id,
        patient: `${firstName} ${lastName}`,
        place: clinica,
        date,
        start: startTime,
        end: endTime,
        doctorId,
        patientId,
        clinicaId
      });
      if (isCreate) {
        addToAppointmentCache(values);
        addToSchedules(dataToSchedules);
        Modal.success({
          title: 'Successfully Booked',
          content:
            'Your appointment is recorded, but is waiting for a working API'
        });
        actions.setSubmitting(success);
        setCreateModalVisibility(false);
      } else {
        updateAppointmentCache(values);
        updateScheduleCache(dataToSchedules);
        Modal.success({
          title: 'Successfully Updated',
          content:
            'The appointment is updated, but is waiting for a working API'
        });
        actions.setSubmitting(success);
        setEditModalVisibility(false);
        setEventModalVisibility(false);
      }
    } else if (isCreate) {
      Modal.error({
        title: 'Error Booking',
        content: `Error creating an appointment ${message || ''}`
      });
      setCreateModalVisibility(true);
    } else {
      Modal.error({
        title: 'Error Updating',
        content: `Error updating an appointment ${message || ''}`
      });
      setEditModalVisibility(true);
    }
  };

  const defaultCreateAppointment: IAppointment = {
    // $FlowFixMe
    id: Array.sort(scheduleIds)[scheduleIds.length - 1] + 1,
    specialist: { id: '', name: '' },
    patient: { id: '', email: '', firstName: '', lastName: '', phone: '' },
    appointment: {
      place: { id: '', name: '' },
      date: moment(Date.now()),
      startTime: '',
      endTime: '',
      duration: '30 minutos',
      detail: 'Prueba',
      consulta: 'Presencial'
    },
    emailCheck: false
  };

  const defaultEditAppointment = (): IAppointment => {
    const {
      specialist: incomingSpecialist,
      id: incomingId,
      appointment: incomingAppointment,
      patient: incomingPatient
    } = data;

    return {
      id: incomingId,
      specialist: incomingSpecialist,
      patient: { ...incomingPatient },
      appointment: {
        ...incomingAppointment,
        date: moment(incomingAppointment.date, 'YYYY-MM-DD')
      },
      emailCheck: false
    };
  };
  return (
    <Wrapper isMobileScreen={isMobileScreen}>
      {isCreate ? (
        <StyledH2>CREAR CITA</StyledH2>
      ) : (
        <HeaderWrapper>
          <Icon
            onClick={() => setEditModalVisibility(false)}
            style={{ fontSize: '20px', cursor: 'pointer' }}
            type="left"
          />
          <CenteredH2>EDIT CITA</CenteredH2>
        </HeaderWrapper>
      )}

      <Formik
        initialValues={
          isCreate ? defaultCreateAppointment : defaultEditAppointment()
        }
        onSubmit={(values, actions) => {
          const { id, specialist, patient, appointment } = values;
          const updatedValues = {
            id,
            specialist,
            patient: { ...patient },
            appointment: {
              ...appointment,
              date: appointment.date.format('YYYY-MM-DD'),
              endTime: addDuration(appointment.startTime, appointment.duration)
            }
          };
          // eslint-disable-next-line no-console
          console.log('UPDATED VALUES:', JSON.stringify(updatedValues));
          setNewAppointmentData({
            data: updatedValues,
            submitter: setSubmit(actions, updatedValues)
          });
        }}
        validationSchema={AppointmentSchema}
      >
        {({ values, errors, handleChange, handleSubmit, setFieldValue }) => {
          const populatePatientFields = ({
            id,
            nombre,
            apellido,
            telefono,
            email
          }) => {
            setFieldValue('patient.id', id);
            setFieldValue('patient.lastName', apellido);
            setFieldValue('patient.firstName', nombre);
            setFieldValue('patient.phone', `${telefono}`);
            setFieldValue('patient.email', email);
          };
          const handleNameSelect = id => {
            const patient = namedUsersData.find(
              usr => usr.id === parseInt(id, 10)
            );
            populatePatientFields(patient);
          };
          const getNameDataSource = () =>
            namedUsersData.map(({ id, nombre, apellido }) => (
              <AutoComplete.Option key={id} name={`${nombre} ${apellido}`}>
                {`${nombre} ${apellido}`}
              </AutoComplete.Option>
            ));
          return (
            <Form onSubmit={handleSubmit}>
              <FormItem>
                <Span>Seleccione un Especialista</Span>
                <CustomSelect
                  id="specialist.name"
                  value={values.specialist.name}
                  onChange={doctorId => {
                    const specialist = specialists.find(
                      doctor => doctor.user_id === doctorId
                    );
                    setFieldValue(
                      'specialist.name',
                      `${specialist.first_name} ${specialist.last_name}`
                    );
                    setFieldValue('specialist.id', doctorId);
                  }}
                >
                  {specialists.map((specialist, index) => (
                    <Option key={index} value={specialist.user_id}>
                      {`${specialist.first_name} ${specialist.first_name}`}
                    </Option>
                  ))}
                </CustomSelect>
                {errors.specialist && errors.specialist.name && (
                  <Error>{errors.specialist.name}</Error>
                )}
              </FormItem>
              <SizeStyledH2>Introduzca datos del paciente</SizeStyledH2>
              <FormDetail>
                <FormWrapper isMobileScreen={isMobileScreen}>
                  <FormGroupLeft isMobileScreen={isMobileScreen}>
                    <FormItem>
                      <Span>Email</Span>
                      <FormInline>
                        {values.emailCheck ? (
                          <StyledInput
                            id="patient.email"
                            value={values.patient.email}
                            onChange={handleChange}
                            placeholder="Buscar"
                            type="text"
                          />
                        ) : (
                          <AutoComplete
                            style={
                              !isMobileScreen
                                ? { width: '66%' }
                                : { width: '100%' }
                            }
                            placeholder="Email"
                            id="patient.email"
                            value={values.patient.email}
                            onSelect={email => {
                              setEmailAndCallback({
                                email,
                                callback: patient => {
                                  populatePatientFields(patient);
                                }
                              });
                            }}
                            dataSource={emails}
                            onSearch={value => {
                              setFieldValue('patient.email', value);
                              setQuery(value);
                            }}
                          />
                        )}
                        <StyledCheck
                          id="emailCheck"
                          onChange={handleChange}
                          isMobileScreen
                        >
                          No tiene email
                        </StyledCheck>
                      </FormInline>
                      {errors.patient && errors.patient.email && (
                        <Error>{errors.patient.email}</Error>
                      )}
                    </FormItem>
                    <FormItem>
                      <Span>Apellido</Span>
                      <AutoComplete
                        style={
                          !isMobileScreen ? { width: '66%' } : { width: '100%' }
                        }
                        placeholder="Last Name"
                        id="patient.lastName"
                        value={values.patient.lastName}
                        onChange={handleChange}
                        onSelect={handleNameSelect}
                        dataSource={getNameDataSource()}
                        optionLabelProp="name"
                        onSearch={value => {
                          setFieldValue('patient.lastName', value);
                          setName(value);
                        }}
                      />
                      {errors.patient && errors.patient.lastName && (
                        <Error>{errors.patient.lastName}</Error>
                      )}
                    </FormItem>
                  </FormGroupLeft>
                  <FormGroupRight isMobileScreen={isMobileScreen}>
                    <FormItem>
                      <Span>Nombre</Span>

                      <AutoComplete
                        style={
                          !isMobileScreen ? { width: '66%' } : { width: '100%' }
                        }
                        placeholder="First Name"
                        id="patient.firstName"
                        value={values.patient.firstName}
                        onChange={handleChange}
                        onSelect={handleNameSelect}
                        dataSource={getNameDataSource()}
                        optionLabelProp="name"
                        onSearch={value => {
                          setFieldValue('patient.firstName', value);
                          setName(value);
                        }}
                      />
                      {errors.patient && errors.patient.firstName && (
                        <Error>{errors.patient.firstName}</Error>
                      )}
                    </FormItem>
                    <FormItem>
                      <Span>Telefono</Span>
                      <StyledInput
                        id="patient.phone"
                        value={values.patient.phone}
                        onChange={handleChange}
                        placeholder="Telefono"
                        type="text"
                      />
                      {errors.patient && errors.patient.phone && (
                        <Error>{errors.patient.phone}</Error>
                      )}
                    </FormItem>
                  </FormGroupRight>
                </FormWrapper>
                <SizeStyledH2>Seleccione cuando sera la cita</SizeStyledH2>
                <FormWrapper isMobileScreen={isMobileScreen}>
                  <FormGroupLeft isMobileScreen={isMobileScreen}>
                    <FormItem>
                      <Span>Seleccione un lugar</Span>
                      <CustomSelect
                        id="appointment.place.name"
                        value={values.appointment.place.name}
                        onChange={branchId => {
                          const clinica = branches.find(
                            clinic => clinic.id === branchId
                          );
                          setFieldValue(
                            'appointment.place.name',
                            clinica.nombre
                          );
                          setFieldValue('appointment.place.id', branchId);
                        }}
                      >
                        {branches.map((clinica, index) => (
                          <Option key={index} value={clinica.id}>
                            {clinica.nombre}
                          </Option>
                        ))}
                      </CustomSelect>
                      {errors.appointment &&
                        errors.appointment.place &&
                        errors.appointment.place.name && (
                          <Error>{errors.appointment.place.name}</Error>
                        )}
                    </FormItem>
                    <FormItem>
                      <Span>Hora de Inicio</Span>
                      <CustomSelect
                        id="appointment.startTime"
                        value={values.appointment.startTime}
                        onChange={e =>
                          setFieldValue('appointment.startTime', e)
                        }
                      >
                        {times.map((name, index) => (
                          <Option key={index} value={name}>
                            {name}
                          </Option>
                        ))}
                      </CustomSelect>
                      {errors.appointment && errors.appointment.startTime && (
                        <Error>{errors.appointment.startTime}</Error>
                      )}
                    </FormItem>
                  </FormGroupLeft>
                  <FormGroupRight isMobileScreen={isMobileScreen}>
                    <FormItem>
                      <Span>Fecha</Span>
                      <StyledDatePicker
                        id="appointment.date"
                        value={values.appointment.date}
                        onChange={e => setFieldValue('appointment.date', e)}
                      />
                      {errors.appointment && errors.appointment.date && (
                        <Error>{errors.appointment.date}</Error>
                      )}
                    </FormItem>
                    <FormItem>
                      <Span>Duracion de la cita</Span>
                      <CustomSelect
                        id="appointment.duration"
                        value={values.appointment.duration}
                        onChange={e => {
                          setFieldValue('appointment.duration', e);
                        }}
                      >
                        {durations.map((name, index) => (
                          <Option key={index} value={name}>
                            {name}
                          </Option>
                        ))}
                      </CustomSelect>
                      {errors.appointment && errors.appointment.duration && (
                        <Error>{errors.appointment.duration}</Error>
                      )}
                    </FormItem>
                  </FormGroupRight>
                </FormWrapper>
              </FormDetail>
              <FormItem>
                <Span>Asunto de la cita</Span>
                <TextArea
                  id="appointment.detail"
                  value={values.appointment.detail}
                  onChange={handleChange}
                  placeholder="Ingrese informacion adicional de la cita"
                  rows={4}
                />
                {errors.appointment && errors.appointment.detail && (
                  <Error>{errors.appointment.detail}</Error>
                )}
              </FormItem>
              <Footer>
                <WidthStyledButton htmlType="submit">GUARDAR</WidthStyledButton>
              </Footer>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

AppointmentCreateEdit.propTypes = {
  isMobileScreen: PropTypes.bool.isRequired,
  specialists: PropTypes.array.isRequired,
  branches: PropTypes.array.isRequired,
  durations: PropTypes.array.isRequired,
  times: PropTypes.array.isRequired,
  addToSchedules: PropTypes.func,
  addToAppointmentCache: PropTypes.func,
  scheduleIds: PropTypes.array.isRequired,
  isCreate: PropTypes.bool.isRequired,
  updateScheduleCache: PropTypes.func,
  updateAppointmentCache: PropTypes.func,
  data: PropTypes.object
};

export default withMobile(AppointmentCreateEdit);
