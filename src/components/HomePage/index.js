import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import PropTypes from 'prop-types';

import LoadingIndicator from '../LoadingIndicator';
import { CalendarWrapper, AppointmentWrapper } from './AppointmentWrapper';
import Calendar from './Calendar';
import Professionals from './Professionals';
import AppointmentHeader from './AppointmentHeader';
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
    setIdAndName
  } = useFetchAppointmentById();

  const updateAppointmentData = data => {
    const { consulta, place, phone } = data;
    appointmentData.place = place;
    appointmentData.phone = phone;
    appointmentData.title = consulta;
  };

  const [oneDayAppointments, setOneDayAppointments] = useState([]);

  const [showEditModal, setEditModal] = useState(false);
  const [showCreateModal, setCreateModal] = useState(false);
  const [showEventModal, setEventModal] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <HomeWrapper>
        <CalendarWrapper isMobileScreen={isMobileScreen}>
          {isFetchByMonthError && <div>Something went wrong ...</div>}
          {isFetchByMonthLoading ? (
            <LoadingIndicator />
          ) : (
            schedules &&
            doctores && (
              <Calendar
                appointmentDates={[...schedules].map(
                  schedule => schedule.slot_date
                )}
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
                filterOneMonthAppointments={filterSchedules}
                filterOneDayAppointments={doctorIds => {
                  const appointments = getDayAppointments({
                    schedules,
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
            <H2>RESERVACIONS</H2>
            <MyButton onClick={() => setCreateModal(!showCreateModal)}>
              CREAR DATA
            </MyButton>
          </AppointmentHeader>
          <DayView
            setEventModalVisiblity={() => setEventModal(!showEventModal)}
            schedules={oneDayAppointments}
            setIdAndName={setIdAndName}
          />
        </AppointmentWrapper>
      </HomeWrapper>
      <Modal
        width={600}
        visible={showEventModal}
        destroyOnClose
        onCancel={() => setEventModal(!showEventModal)}
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
              setEditModalVisiblity={() => setEditModal(!showEditModal)}
              updateDetailView={updateAppointmentData}
            />
          ) : (
            <AppointmentDetail
              data={appointmentData}
              setEditModalVisiblity={() => setEditModal(!showEditModal)}
            />
          ))
        )}
      </Modal>
      <Modal
        width={800}
        visible={showCreateModal}
        destroyOnClose
        onCancel={() => setCreateModal(!showCreateModal)}
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
              toggleModal={() => setCreateModal(!showCreateModal)}
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
