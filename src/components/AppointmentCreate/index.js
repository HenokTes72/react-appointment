import React, { useContext } from 'react';
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
import useFetchNames from '../../hooks/fetchNames';
import useFetchUserByEmail from '../../hooks/fetchUserByEmail';
import useAppointmentCreate from '../../hooks/createAppointment';
import ModalVisibilityContext from '../../contexts/visibilityContext';

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

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*
// )| ([0 - 9]{ 2, 4 })[\\-] *)*? [0 - 9]{ 3, 4 }?[\\-] * [0 - 9]{ 3, 4 }?$ /;

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
    subject: Yup.string().required('Required')
  })
});

const AppointmentCreate = ({
  isMobileScreen,
  specialists,
  branches,
  durations,
  times,
  addAppointmentToState
}) => {
  const { emails, setQuery } = useFetchEmails();
  const { namedUsersData, setName } = useFetchNames();
  const { setEmailAndCallback } = useFetchUserByEmail();
  const { setNewAppointmentData } = useAppointmentCreate();
  const { setCreateModalVisibility } = useContext(ModalVisibilityContext);

  const setSubmit = actions => success => {
    if (success) {
      // eslint-disable-next-line no-alert
      alert('Your appointment is recorded, but is waiting for a working API');
      actions.setSubmitting(success);
      setCreateModalVisibility(false);
    } else {
      // eslint-disable-next-line no-alert
      alert('Error creating an appointment');
      setCreateModalVisibility(true);
    }
  };

  const getDataToAdd = values => {
    const { place, date, startTime, subject } = values.appointment;
    const { firstName, lastName, phone } = values.patient;
    return {
      consulta: subject,
      place,
      phone,
      date,
      patient: `${firstName} ${lastName}`,
      professional: values.specialist,
      start: startTime,
      end: null,
      detail: subject
    };
  };

  return (
    <Wrapper isMobileScreen={isMobileScreen}>
      <StyledH2>CRER CITA</StyledH2>
      <Formik
        initialValues={{
          specialist: '',
          patient: { email: '', firstName: '', lastName: '', phone: '' },
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
          setNewAppointmentData({
            data: values,
            submitter: setSubmit(actions)
          });
          addAppointmentToState(getDataToAdd(values));
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
          const handleNameSelect = id => {
            const selectedPatient = namedUsersData.find(
              usr => usr.id === parseInt(id, 10)
            );
            populatePatientFields(selectedPatient);
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
                                callback: patient =>
                                  populatePatientFields(patient)
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
  addAppointmentToState: PropTypes.func.isRequired
};

export default withMobile(AppointmentCreate);
