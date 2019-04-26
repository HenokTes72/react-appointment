import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik } from 'formik';
import moment from 'moment';
import * as Yup from 'yup';
import { Icon, Form } from 'antd';

import Error from '../Error';
import H2 from '../H2';
import Span from '../Span';
import StyledDatePicker from '../DatePicker';
import Input from '../Input';
import { StyledButton } from '../Button';

import useUpdateAppointment from '../../hooks/updateAppointment';

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
`;

const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
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
  date: Yup.date().required('Required'),
  place: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
  subject: Yup.string().required('Required')
});

const AppointmentEdit = ({ setEditModalVisiblity, updateDetailView, data }) => {
  const { consulta, place, phone } = data;
  const { setNewUpdatedData } = useUpdateAppointment();
  return (
    <Wrapper>
      <HeaderWrapper>
        <Icon
          onClick={() => setEditModalVisiblity(true)}
          style={{ fontSize: '20px', cursor: 'pointer' }}
          type="left"
        />
        <CenteredH2>EDIT CITA</CenteredH2>
      </HeaderWrapper>
      <Formik
        initialValues={{
          date: moment(Date.now()),
          place,
          phone,
          subject: consulta
        }}
        onSubmit={values => {
          setNewUpdatedData(values);
          updateDetailView(values);
          setEditModalVisiblity(false);
        }}
        validationSchema={appointmentEditSchema}
      >
        {({ values, errors, handleSubmit, handleChange }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <ContentWrapper>
                <EditWrapper>
                  <Row>
                    <FormItem>
                      <Span>Fetch</Span>
                      <StyledDatePicker
                        id="date"
                        value={values.date}
                        onChange={handleChange}
                      />
                      {errors.date && <Error>{errors.date}</Error>}
                    </FormItem>
                    <FormItem>
                      <Span>Hora</Span>
                      <StyledInput
                        id="place"
                        value={values.place}
                        onChange={handleChange}
                      />
                      {errors.place && <Error>{errors.place}</Error>}
                    </FormItem>
                  </Row>
                  <Row>
                    <FormItem>
                      <Span>Subject</Span>
                      <StyledInput
                        id="subject"
                        value={values.subject}
                        onChange={handleChange}
                      />
                      {errors.subject && <Error>{errors.subject}</Error>}
                    </FormItem>
                    <FormItem>
                      <Span>Telephone</Span>
                      <StyledInput
                        id="phone"
                        value={values.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && <Error>{errors.phone}</Error>}
                    </FormItem>
                  </Row>
                  <FooterWrapper>
                    <StyledButton
                      htmlType="submit"
                      onSubmit={() => setEditModalVisiblity(false)}
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
  setEditModalVisiblity: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  updateDetailView: PropTypes.func.isRequired
};

export default AppointmentEdit;
