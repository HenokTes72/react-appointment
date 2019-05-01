import React, { useState, useContext } from 'react';
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
import AppointmentCreateEdit from '../AppointmentCreateEdit';
import useFetchAppointmentsByMonth from '../../hooks/fetchAppointmentsByMonth';
import useFetchPlacesAndProfessionals from '../../hooks/fetchPlacesAndProfessionals';
import useFetchAppointmentById from '../../hooks/fetchAppointmentsById';

import DeleteAppointmentContext from '../../contexts/deleteContext';
import ModalVisibilityContext from '../../contexts/visibilityContext';
import { ColorProvider } from '../../contexts/colorContext';
import ConditionalRender from '../../utils/conditionalRender';

const HomeWrapper = styled.div`
  display: flex;
  padding-top: 10px;
  flex-wrap: wrap;
`;

const H2 = styled(Header2)`
  margin: 0px;
`;

const filterSchedulesByDate = (schedules, date) => {
  const dateMatches = schedules.filter(
    appointment => appointment.slot_date === date
  );
  if (dateMatches === undefined) {
    return [];
  }
  const addedIds = [];
  const filteredMatches = [];
  dateMatches.forEach(match => {
    if (addedIds.indexOf(match.id) === -1) {
      addedIds.push(match.id);
      filteredMatches.push(match);
    }
  });
  return filteredMatches;
};

const HomePage = ({ isMobileScreen }) => {
  const {
    isFetchByMonthLoading,
    isFetchByMonthError,
    schedules,
    selectedMonth,
    setSelectedMonth,
    setProfessionalIds,
    filterSchedules,
    deleteSchedule,
    addToSchedules,
    updateSchedule
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
    updateAppointmentData,
    addToAppointmentCache
  } = useFetchAppointmentById();

  const [selectedDate, setSelectedDate] = useState(null);

  const {
    showEditModal,
    showCreateModal,
    showEventModal,
    setCreateModalVisibility,
    setEventModalVisibility
  } = useContext(ModalVisibilityContext);

  return (
    <>
      <ColorProvider>
        <HomeWrapper>
          <CalendarWrapper isMobileScreen={isMobileScreen}>
            <ConditionalRender
              isLoading={isFetchByMonthLoading}
              isError={isFetchByMonthError}
              loader={() => <LoadingIndicator />}
              data={schedules}
            >
              <Calendar
                schedules={schedules}
                setSelectedMonth={setSelectedMonth}
                daySelected={date => {
                  setSelectedDate(date);
                }}
                initialMonth={selectedMonth}
              />
            </ConditionalRender>

            <ConditionalRender
              isLoading={isBasicsLoading}
              isError={isBasicsError}
              loader={() => <LoadingIndicator />}
              data={doctores}
            >
              <Professionals
                professionals={doctores}
                onProfessionalsChange={doctorIds => {
                  filterSchedules(doctorIds);
                }}
              />
            </ConditionalRender>
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
              dailySchedules={(appointments => {
                return filterSchedulesByDate(appointments, selectedDate);
              })(schedules)}
              doctores={doctores}
              setIdAndName={setIdAndName}
            />
          </AppointmentWrapper>
        </HomeWrapper>
      </ColorProvider>

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
            <AppointmentCreateEdit
              isCreate={false}
              data={appointmentData}
              updateAppointmentCache={updateAppointmentData}
              updateScheduleCache={updateSchedule}
              specialists={doctores}
              branches={clinicas}
              durations={aMinutes}
              times={aTime}
              scheduleIds={schedules.map(schedule => schedule.id)}
            />
          ) : (
            <DeleteAppointmentContext.Provider
              value={() => {
                deleteSchedule(appointmentData.id);
              }}
            >
              <AppointmentDetail data={appointmentData} />
            </DeleteAppointmentContext.Provider>
          ))
        )}
      </Modal>

      <Modal
        width={700}
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
            <AppointmentCreateEdit
              isCreate={true}
              addToAppointmentCache={addToAppointmentCache}
              addToSchedules={addToSchedules}
              specialists={doctores}
              branches={clinicas}
              durations={aMinutes}
              times={aTime}
              scheduleIds={schedules.map(schedule => schedule.id)}
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
