import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

import LoadingIndicator from '../LoadingIndicator';
import { CalendarWrapper, AppointmentWrapper } from './WrapperStyles';
import Calendar from './Calendar';
import Professionals from './Professionals';
import AppointmentHeader from './HeaderStyle';
import Header2 from '../H2';
import DayView from './DayView';
import withMobile from '../../utils/withMobile';
import AppointmentDetail from '../AppointmentDetail';
import MyButton from '../Button';
import AppointmentCreate from '../AppointmentCreate';
import AppointmentEdit from '../AppointmentEdit';
import useFetchAppointmentsByMonth from '../../hooks/fetchAppointmentsByMonth';
import useFetchPlacesAndProfessionals from '../../hooks/fetchPlacesAndProfessionals';
import useFetchAppointmentById from '../../hooks/fetchAppointmentsById';

import getDayAppointments from '../../utils/getDayAppointment';

const HomeWrapper = styled.div`
  display: flex;
  padding-top: 10px;
  flex-wrap: wrap;
`;

const H2 = styled(Header2)`
  margin: 0px;
`;

const HomePage = ({ isMobileScreen }) => {
  const {
    isFetchByMonthLoading,
    isFetchByMonthError,
    schedules,
    schedulesCache,
    selectedMonth,
    setSelectedMonth,
    setProfessionalIds,
    filterSchedules
  } = useFetchAppointmentsByMonth();

  const {
    isBasicsLoading,
    isBasicsError,
    institutionData: { doctores, clinicas, aTime, aMinutes }
  } = useFetchPlacesAndProfessionals({ setProfessionalIds });

  const {
    isAppointmentLoading,
    isAppointmentError,
    appointmentData,
    setIdAndName,
    updateAppointmentData
  } = useFetchAppointmentById();

  const [selectedDate, setSelectedDate] = useState(null);
  const [oneDayAppointments, setOneDayAppointments] = useState([]);

  const [showEditModal, setEditModalVisibility] = useState(false);
  const [showCreateModal, setCreateModalVisibility] = useState(false);
  const [showEventModal, setEventModalVisibility] = useState(false);

  return (
    <>
      <HomeWrapper>
        <CalendarWrapper isMobileScreen={isMobileScreen}>
          {isFetchByMonthError && <div>Something went wrong ...</div>}
          {isFetchByMonthLoading ? (
            <LoadingIndicator />
          ) : (
            schedules && (
              <Calendar
                schedules={schedules}
                setSelectedMonth={setSelectedMonth}
                daySelected={date => {
                  setSelectedDate(date);
                  const appointments = getDayAppointments({
                    schedules,
                    doctores,
                    date
                  });
                  setOneDayAppointments(appointments);
                }}
                initialMonth={selectedMonth}
              />
            )
          )}

          {isBasicsError && <div>Something went wrong ...</div>}
          {isBasicsLoading ? (
            <div>Loading ...</div>
          ) : (
            doctores && (
              <Professionals
                professionals={doctores}
                filterOneMonthAppointments={doctorIds => {
                  filterSchedules(doctorIds);
                }}
                filterOneDayAppointments={doctorIds => {
                  const appointments = getDayAppointments({
                    schedules: schedulesCache,
                    doctores,
                    date: selectedDate
                  });
                  const filteredAppointments = appointments.filter(
                    appointment =>
                      doctorIds.indexOf(appointment.doctor_id) !== -1
                  );
                  setOneDayAppointments(filteredAppointments);
                }}
              />
            )
          )}
        </CalendarWrapper>

        <AppointmentWrapper>
          <AppointmentHeader isMobileScreen={isMobileScreen}>
            <H2>RESERVACIONES</H2>
            <MyButton onClick={() => setCreateModalVisibility(true)}>
              CREAR CITA
            </MyButton>
          </AppointmentHeader>
          <DayView
            setEventModalVisiblity={setEventModalVisibility}
            schedules={oneDayAppointments}
            setIdAndName={setIdAndName}
          />
        </AppointmentWrapper>
      </HomeWrapper>
      <Modal
        width={600}
        visible={showEventModal}
        destroyOnClose
        onCancel={() => setEventModalVisibility(false)}
        centered={true}
        footer={null}
      >
        {isAppointmentError && <div>Something went wrong ...</div>}
        {isAppointmentLoading ? (
          <LoadingIndicator />
        ) : (
          appointmentData &&
          (showEditModal ? (
            <AppointmentEdit
              data={appointmentData}
              setEditModalVisiblity={setEditModalVisibility}
              updateDetailView={updateAppointmentData}
            />
          ) : (
            <AppointmentDetail
              data={appointmentData}
              setEditModalVisiblity={setEditModalVisibility}
              setEventModalVisibility={setEventModalVisibility}
            />
          ))
        )}
      </Modal>
      <Modal
        width={800}
        visible={showCreateModal}
        destroyOnClose
        onCancel={() => setCreateModalVisibility(false)}
        centered={true}
        footer={null}
      >
        {isBasicsError && <div>Something went wrong ...</div>}
        {isBasicsLoading ? (
          <LoadingIndicator />
        ) : (
          doctores && (
            <AppointmentCreate
              specialists={doctores}
              branches={clinicas}
              durations={aMinutes}
              times={aTime}
              setCreateModalVisibility={setCreateModalVisibility}
            />
          )
        )}
      </Modal>
    </>
  );
};

HomePage.propTypes = {
  isMobileScreen: PropTypes.bool.isRequired
};

export default withMobile(HomePage);
