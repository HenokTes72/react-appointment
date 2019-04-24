/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Checkbox, Input, Select, Form } from 'antd';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import AutoComplete from '../AutoComplete';
import StyledDatePicker from '../DatePicker';
import Error from '../Error';
import CustomSelect from './CustomSelect';
import withMobile from '../../utils/withMobile';
import H2 from '../H2';
import Span from '../Span';
import FormItem from './FormItem';
import FormInline from './FormInline';
import MyInput from '../Input';
import Footer from './Footer';
import { StyledButton } from '../Button';

import useFetchEmails from '../../hooks/fetchEmails';
import useFetchUserByEmail from '../../hooks/fetchUserByEmail';
import useAppointmentCreate from '../../hooks/createAppointment';

const { Option } = Select;
const { TextArea } = Input;

const Wrapper = styled.div`
  margin-top: 10px;
  padding-left: ${props => (props.isMobileScreen ? '0px' : '25px')};
  padding-right: ${props => (props.isMobileScreen ? '0px' : '25px')};
  display: flex;
  flex-direction: column;
`;

const StyledH2 = styled(H2)`
  text-align: center;
  font-weight: bold;
`;

const SizeStyledH2 = styled(StyledH2)`
  font-size: 16px;
  text-align: start;
  margin-bottom: 15px;
`;

const FormDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

const FormGroup = styled.div`
  display: flex;
  flex: ${props => (props.isMobileScreen ? '1' : '0.5')};
  flex-direction: column;
  min-width: 150px;
`;

const FormWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
  ${props =>
    props.isMobileScreen &&
    css`
      width: 100%;
      flex-wrap: wrap;
    `}
`;

const FormGroupLeft = styled(FormGroup)`
  margin-right: ${props => (props.isMobileScreen ? '5px' : '10px')};
`;

const FormGroupRight = styled(FormGroup)`
  margin-left: ${props => (props.isMobileScreen ? '5px' : '10px')};
`;

const StyledCheck = styled(Checkbox)`
  margin-left: ${props => (props.isMobileScreen ? '0px' : '10px')};
`;

const StyledInput = styled(MyInput)`
  flex-grow: 1;
  margin-bottom: 5px;
`;

const WidthStyledButton = styled(StyledButton)`
  width: 250px;
`;

// eslint-disable-next-line max-len
// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const createAppointmentSchema = Yup.object().shape({
  specialist: Yup.string().required('Required'),
  patient: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
    firstName: Yup.string()
      .min(2, 'Too short')
      .max(50, 'Too Long')
      .required('Required'),
    surName: Yup.string()
      .min(2, 'Too short')
      .max(50, 'Too Long')
      .required('Required'),
    phone: Yup.string().required('Required')
  }),
  appointment: Yup.object().shape({
    place: Yup.string().required('Required'),
    date: Yup.date().required('Required'),
    startTime: Yup.string().required('Required'),
    duration: Yup.string().required('Required'),
    subject: Yup.string().required('Required')
  })
});

const AppointmentCreate = ({
  isMobileScreen,
  specialists,
  branches,
  durations,
  times,
  toggleModal
}) => {
  const { emails, setQuery } = useFetchEmails();

  const handleSearch = value => {
    setQuery(value);
  };

  const {
    userData: { user, paciente },
    setEmail,
    setFieldNameAndFunc
  } = useFetchUserByEmail();

  const { setNewAppointmentData } = useAppointmentCreate();

  const [doctor, setDoctor] = useState({});
  const [branch, setBranch] = useState({});

  const getPatientInfo = attr => {
    if (user) {
      return user[attr];
    }
    return paciente ? paciente[attr] : undefined;
  };

  return (
    <Wrapper isMobileScreen={isMobileScreen}>
      <StyledH2>CREAR CITA</StyledH2>
      <Formik
        initialValues={{
          specialist: '',
          patient: { email: '', firstName: '', surName: '', phone: '' },
          appointment: {
            place: '',
            date: moment(Date.now()),
            startTime: '',
            duration: '30 minutos',
            subject: ''
          },
          emailCheck: false
        }}
        onSubmit={(values, actions) => {
          const data = {
            entre: values.appointment.duration,
            idUser: doctor.user_id,
            id_user: doctor.user_id,
            doctorId: doctor.user_id,
            buscador_paciente: `${values.patient.firstName} ${
              values.patient.lastName
            }`,
            _token: '1j2VstsP7oyPr7Jf3ELzgLkaJb8zWlHnxPSxv2Yk',
            id_paciente: getPatientInfo('id'),
            Email: values.patient.email,
            checkemail1: 0,
            Cedula: getPatientInfo('cedula'),
            Nombre: values.patient.firstName,
            Apellido: values.patient.lastName,
            telefono: values.patient.phone,
            clinica: branch.id,
            date1: values.appointment.date,
            date2: values.appointment.date,
            desdeD: values.appointment.startTime,
            time_slot: values.appointment.duration,
            hastaD: '08:10 AM',
            fecha2: values.appointment.date,
            fecha1: values.appointment.date,
            slotH: values.appointment.duration,
            desde: values.appointment.startTime,
            hasta: '08:10 AM',
            detalle: values.appointment.subject
          };
          const setSubmitting = success => {
            actions.setSubmitting(success);
            if (success) {
              toggleModal();
            }
          };
          toggleModal();
          setNewAppointmentData(data, setSubmitting);
          // eslint-disable-next-line no-alert
          alert(
            'Your appointment is recorded, but is waiting for a working API'
          );
        }}
        validationSchema={createAppointmentSchema}
      >
        {props => {
          const {
            values,
            errors,
            handleChange,
            handleSubmit,
            setFieldValue
          } = props;
          setFieldNameAndFunc(
            {
              firstName: 'patient.firstName',
              lastName: 'patient.surName',
              phone: 'patient.phone'
            },
            setFieldValue
          );

          return (
            <Form onSubmit={handleSubmit}>
              <FormItem>
                <Span>Seleccione un Especialista</Span>
                <CustomSelect
                  id="specialist"
                  value={values.specialist}
                  onChange={doctorId => {
                    const selectedSpecialist = specialists.find(
                      specialist => specialist.user_id === doctorId
                    );
                    setFieldValue(
                      'specialist',
                      `${selectedSpecialist.first_name} ${
                        selectedSpecialist.last_name
                      }`
                    );
                    setDoctor(selectedSpecialist);
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
                              setFieldValue('patient.email', email);
                              setEmail(email);
                            }}
                            dataSource={emails}
                            // style={{ width: 200 }}
                            onSearch={value => {
                              setFieldValue('patient.email', value);
                              handleSearch(value);
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
                      <StyledInput
                        id="patient.surName"
                        value={
                          getPatientInfo('last_name') || values.patient.surName
                        }
                        onChange={handleChange}
                        placeholder="Apellido"
                        type="text"
                      />
                      {errors.patient && errors.patient.surName && (
                        <Error>{errors.patient.surName}</Error>
                      )}
                    </FormItem>
                  </FormGroupLeft>
                  <FormGroupRight isMobileScreen={isMobileScreen}>
                    <FormItem>
                      <Span>Nombre</Span>
                      <StyledInput
                        id="patient.firstName"
                        value={
                          getPatientInfo('first_name') ||
                          values.patient.firstName
                        }
                        onChange={handleChange}
                        placeholder="Nombre"
                        type="text"
                      />
                      {errors.patient && errors.patient.firstName && (
                        <Error>{errors.patient.firstName}</Error>
                      )}
                    </FormItem>
                    <FormItem>
                      <Span>Telefono</Span>
                      <StyledInput
                        id="patient.phone"
                        value={
                          getPatientInfo('telefono') || values.patient.phone
                        }
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
                          setBranch(clinica);
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
                  id="appointment.subject"
                  value={values.appointment.subject}
                  onChange={handleChange}
                  placeholder="Ingrese informacion adicional de la cita"
                  rows={4}
                />
                {errors.appointment && errors.appointment.subject && (
                  <Error>{errors.appointment.subject}</Error>
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

AppointmentCreate.propTypes = {
  isMobileScreen: PropTypes.bool.isRequired,
  specialists: PropTypes.array.isRequired,
  branches: PropTypes.array.isRequired,
  durations: PropTypes.array.isRequired,
  times: PropTypes.array.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default withMobile(AppointmentCreate);
