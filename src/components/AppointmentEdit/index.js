import React, { useContext, useState } from 'react';
import { Input, Select, Form, Icon } from 'antd';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import AutoComplete from '../AutoComplete';
import StyledDatePicker from '../DatePicker';
import Error from '../Error';
import CustomSelect from '../AppointmentCreate/CustomSelect';
import withMobile from '../../utils/withMobile';
import Span from '../Span';
import FormItem from '../AppointmentCreate/FormItem';
import FormInline from '../AppointmentCreate/FormInline';
import Footer from '../AppointmentCreate/Footer';

import useFetchEmails from '../../hooks/fetchEmails';
import useFetchNames from '../../hooks/fetchNames';
import useFetchUserByEmail from '../../hooks/fetchUserByEmail';
import useUpdateAppointment from '../../hooks/updateAppointment';
import ModalVisibilityContext from '../../contexts/visibilityContext';
import addDuration from '../../utils/addDuration';

import {
  Wrapper,
  CenteredH2,
  HeaderWrapper,
  SizeStyledH2,
  WidthStyledButton,
  StyledInput,
  StyledCheck,
  FormGroupLeft,
  FormGroupRight,
  FormWrapper,
  FormDetail
} from './style';

const { Option } = Select;
const { TextArea } = Input;

const createAppointmentSchema = Yup.object().shape({
  specialist: Yup.string().required('Required'),
  patient: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    phone: Yup.string().required('Required')
  }),
  appointment: Yup.object().shape({
    place: Yup.string().required('Required'),
    date: Yup.date().required('Required'),
    startTime: Yup.string().required('Required'),
    duration: Yup.string().required('Required'),
    detail: Yup.string().required('Required')
  })
});

const AppointmentEdit = ({
  isMobileScreen,
  specialists,
  branches,
  durations,
  times,
  updateAppointmentCache,
  updateScheduleCache,
  data: {
    specialist: incomingSpecialist,
    id: incomingId,
    appointment: incomingAppointment,
    patient: incomingPatient
  }
}) => {
  const { emails, setQuery } = useFetchEmails();
  const { namedUsersData, setName } = useFetchNames();
  const { setEmailAndCallback } = useFetchUserByEmail();
  const { setEditModalVisibility } = useContext(ModalVisibilityContext);

  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedClinica, setSelectedClinica] = useState(null);

  const { setUpdatedAppointmentData } = useUpdateAppointment();

  const dataForSchedules = ({ id, place, date, start, end }) => {
    return {
      id,
      slot_date: date,
      inicio: start,
      fin: end,
      slot_status: 1,
      user_id: selectedPatient && selectedPatient.id,
      doctor_id: selectedSpecialist && selectedSpecialist.user_id,
      clinica: place,
      clinicaId: selectedClinica && selectedClinica.id
    };
  };

  const setSubmit = (actions, values) => (success, message) => {
    if (success) {
      // eslint-disable-next-line no-console
      console.log('SET SUBMITT RUNNING CALLBACK:', JSON.stringify(values));

      const {
        appointment: { startTime, endTime, date, place }
      } = values;
      // eslint-disable-next-line no-console
      console.log('DATA TO SCHEDULES CALLING');
      const dataToSchedules = dataForSchedules({
        id: values.id,
        place,
        date,
        start: startTime,
        end: endTime
      });
      // eslint-disable-next-line no-console
      console.log('UPDATEING CAHCED AND SCHEDULE');
      updateAppointmentCache(values);
      updateScheduleCache(dataToSchedules);
      // eslint-disable-next-line no-alert
      alert('The appointment is updated, but is waiting for a working API');
      actions.setSubmitting(success);
      setEditModalVisibility(false);
    } else {
      // eslint-disable-next-line no-alert
      alert(`Error creating an appointment ${message || ''}`);
      setEditModalVisibility(true);
    }
  };

  return (
    <Wrapper isMobileScreen={isMobileScreen}>
      <HeaderWrapper>
        <Icon
          onClick={() => setEditModalVisibility(false)}
          style={{ fontSize: '20px', cursor: 'pointer' }}
          type="left"
        />
        <CenteredH2>EDIT CITA</CenteredH2>
      </HeaderWrapper>

      <Formik
        initialValues={{
          id: incomingId,
          specialist: incomingSpecialist,
          patient: { ...incomingPatient },
          appointment: {
            ...incomingAppointment,
            date: moment(incomingAppointment.date, 'YYYY-MM-DD')
          },
          emailCheck: false
        }}
        onSubmit={(values, actions) => {
          // eslint-disable-next-line no-console
          console.log('ON SUBMIT CALLED');
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
          setUpdatedAppointmentData({
            data: updatedValues,
            submitter: setSubmit(actions, updatedValues)
          });
        }}
        validationSchema={createAppointmentSchema}
      >
        {({ values, errors, handleChange, handleSubmit, setFieldValue }) => {
          const populatePatientFields = ({
            nombre,
            apellido,
            telefono,
            email
          }) => {
            setFieldValue('patient.lastName', apellido);
            setFieldValue('patient.firstName', nombre);
            setFieldValue('patient.phone', telefono);
            setFieldValue('patient.email', email);
          };
          const handleNameSelect = userId => {
            const patient = namedUsersData.find(
              usr => usr.id === parseInt(userId, 10)
            );
            populatePatientFields(patient);
            setSelectedPatient(patient);
          };
          const getNameDataSource = () =>
            namedUsersData.map(({ id: userId, nombre, apellido }) => (
              <AutoComplete.Option key={userId} name={`${nombre} ${apellido}`}>
                {`${nombre} ${apellido}`}
              </AutoComplete.Option>
            ));
          return (
            <Form onSubmit={handleSubmit}>
              <FormItem>
                <Span>Seleccione un Especialista</Span>
                <CustomSelect
                  id="specialist"
                  value={values.specialist}
                  onChange={doctorId => {
                    const specialist = specialists.find(
                      doctor => doctor.user_id === doctorId
                    );
                    setFieldValue(
                      'specialist',
                      `${specialist.first_name} ${specialist.last_name}`
                    );
                    setSelectedSpecialist(specialist);
                  }}
                >
                  {specialists.map((specialist, index) => (
                    <Option key={index} value={specialist.user_id}>
                      {`${specialist.first_name} ${specialist.first_name}`}
                    </Option>
                  ))}
                </CustomSelect>
                {errors.specialist && <Error>{errors.specialist}</Error>}
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
                                  setSelectedPatient(patient);
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
                        id="appointment.place"
                        value={values.appointment.place}
                        onChange={branchId => {
                          const clinica = branches.find(
                            clinic => clinic.id === branchId
                          );
                          setFieldValue('appointment.place', clinica.nombre);
                          setSelectedClinica(clinica);
                        }}
                      >
                        {branches.map((clinica, index) => (
                          <Option key={index} value={clinica.id}>
                            {clinica.nombre}
                          </Option>
                        ))}
                      </CustomSelect>
                      {errors.appointment && errors.appointment.place && (
                        <Error>{errors.appointment.place}</Error>
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
                        onChange={e => setFieldValue('appointment.duration', e)}
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

AppointmentEdit.propTypes = {
  isMobileScreen: PropTypes.bool.isRequired,
  specialists: PropTypes.array.isRequired,
  branches: PropTypes.array.isRequired,
  durations: PropTypes.array.isRequired,
  times: PropTypes.array.isRequired,
  updateScheduleCache: PropTypes.func.isRequired,
  updateAppointmentCache: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default withMobile(AppointmentEdit);
