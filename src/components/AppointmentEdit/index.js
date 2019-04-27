import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Icon, Form } from 'antd';
import moment from 'moment';

import Error from '../Error';
import H2 from '../H2';
import Span from '../Span';
import StyledDatePicker from '../DatePicker';
import Input from '../Input';
import { StyledButton } from '../Button';

import useUpdateAppointment from '../../hooks/updateAppointment';
import ModalVisibilityContext from '../../contexts/visibilityContext';

const ContentWrapper = styled.div`
  padding-left: 50px;
  padding-right: 50px;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  padding: 10px;
  margin-top: 20px;
`;

const CenteredH2 = styled(H2)`
  text-align: center;
  flex-grow: 1;
  margin-bottom: 0px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 48%;
  margin: 3px 0;
`;

const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 35px;
`;

const StyledInput = styled(Input)`
  flex-grow: 1;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const appointmentEditSchema = Yup.object().shape({
  patient: Yup.string().required('Required'),
  professional: Yup.string().required('Required'),
  date: Yup.date().required('Required'),
  place: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
  consulta: Yup.string().required('Required'),
  detail: Yup.string().required('Required'),
  start: Yup.string().required('Required'),
  end: Yup.string().required('Required')
});

const AppointmentEdit = ({
  updateDetailView,
  data: {
    consulta,
    place,
    phone,
    date,
    patient,
    professional,
    start,
    end,
    detail
  }
}) => {
  const { setNewUpdatedData } = useUpdateAppointment();
  const { setEditModalVisibility } = useContext(ModalVisibilityContext);
  return (
    <Wrapper>
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
          date: moment(date, 'YYYY-DD-MM'),
          place,
          phone,
          consulta,
          patient,
          professional,
          start,
          end,
          detail
        }}
        onSubmit={values => {
          setNewUpdatedData(values);
          updateDetailView(values);
          setEditModalVisibility(false);
        }}
        validationSchema={appointmentEditSchema}
      >
        {({ values, errors, handleSubmit, handleChange }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <ContentWrapper>
                <EditWrapper>
                  <Row>
                    <ColumnWrapper>
                      <FormItem>
                        <Span>Paciente</Span>
                        <StyledInput
                          id="patient"
                          value={values.patient}
                          onChange={handleChange}
                        />
                        {errors.patient && <Error>{errors.patient}</Error>}
                      </FormItem>
                      <FormItem>
                        <Span>Especialista</Span>
                        <StyledInput
                          id="professional"
                          value={values.professional}
                          onChange={handleChange}
                        />
                        {errors.professional && (
                          <Error>{errors.professional}</Error>
                        )}
                      </FormItem>
                      <FormItem>
                        <Span>Centro</Span>
                        <StyledInput
                          id="place"
                          value={values.place}
                          onChange={handleChange}
                        />
                        {errors.place && <Error>{errors.place}</Error>}
                      </FormItem>
                      <FormItem>
                        <Span>Consulta</Span>
                        <StyledInput
                          id="consulta"
                          value={values.consulta}
                          onChange={handleChange}
                        />
                        {errors.consulta && <Error>{errors.consulta}</Error>}
                      </FormItem>
                    </ColumnWrapper>
                    <ColumnWrapper>
                      <FormItem>
                        <Span>Fetcha</Span>
                        <StyledDatePicker
                          id="date"
                          value={values.date}
                          onChange={handleChange}
                        />
                        {errors.date && <Error>{errors.date}</Error>}
                      </FormItem>
                      <FormItem>
                        <Span>Ininicio</Span>
                        <StyledInput
                          id="start"
                          value={values.start}
                          onChange={handleChange}
                        />
                        {errors.start && <Error>{errors.start}</Error>}
                      </FormItem>
                      <FormItem>
                        <Span>Fin</Span>
                        <StyledInput
                          id="end"
                          value={values.end}
                          onChange={handleChange}
                        />
                        {errors.end && <Error>{errors.end}</Error>}
                      </FormItem>
                      <FormItem>
                        <Span>Telefono</Span>
                        <StyledInput
                          id="phone"
                          value={values.phone}
                          onChange={handleChange}
                        />
                        {errors.phone && <Error>{errors.phone}</Error>}
                      </FormItem>
                      <FormItem>
                        <Span>Asunto del la Cita</Span>
                        <StyledInput
                          id="detail"
                          value={values.detail}
                          onChange={handleChange}
                        />
                        {errors.detail && <Error>{errors.detail}</Error>}
                      </FormItem>
                    </ColumnWrapper>
                  </Row>
                  <FooterWrapper>
                    <StyledButton
                      htmlType="submit"
                      onSubmit={() => setEditModalVisibility(false)}
                    >
                      ACTUALIZAR
                    </StyledButton>
                  </FooterWrapper>
                </EditWrapper>
              </ContentWrapper>
            </Form>
          );
        }}
      </Formik>
    </Wrapper>
  );
};

AppointmentEdit.propTypes = {
  data: PropTypes.object.isRequired,
  updateDetailView: PropTypes.func.isRequired
};

export default AppointmentEdit;
