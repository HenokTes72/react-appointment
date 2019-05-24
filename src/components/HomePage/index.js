// @flow
import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

import { connect } from 'react-redux';

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
// import useFetchAppointmentsByMonth from '../../hooks/fetchAppointmentsByMonth';
import useFetchPlacesAndProfessionals from '../../hooks/fetchPlacesAndProfessionals';
import useFetchAppointmentById from '../../hooks/fetchAppointmentsById';

import DeleteAppointmentContext from '../../contexts/deleteContext';
import ModalVisibilityContext from '../../contexts/visibilityContext';
import { ColorProvider } from '../../contexts/colorContext';
import ConditionalRender from '../../utils/conditionalRender';

import type { ICompactAppointment } from '../../types/appointmentCompact';

import {
  actionSetSelectedMonth,
  actionSetProfessionalIds,
  actionFilterSchedules,
  actionAddSchedule,
  actionUpdateSchedule,
  actionDeleteSchedule,
  actionFetchCurrentMonthAppointments
} from '../../redux/actions/actionsFetchAppointmentsByMonth';

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

const canAppointmentBeBooked = (
  bookedAppointments: Array<ICompactAppointment>,
  appintment: ICompactAppointment
): boolean => {
  const start = moment(appintment.inicio, 'hh:mm A');
  const end = moment(appintment.fin, 'hh:mm A');
  const collision = bookedAppointments.find(bookedAppointment => {
    const doctorMatch = appintment.doctor_id === bookedAppointment.doctor_id;
    if (!doctorMatch) {
      return false;
    }
    const currentStart = moment(bookedAppointment.inicio, 'hh:mm A');
    const currentEnd = moment(bookedAppointment.fin, 'hh:mm A');
    const isStartTrapped =
      start.isAfter(currentStart) && start.isBefore(currentEnd);
    const isEndTrapped = end.isAfter(currentStart) && end.isBefore(currentEnd);
    return isStartTrapped || isEndTrapped;
  });
  return collision === undefined;
};

const HomePage = ({
  isMobileScreen,
  setSelectedMonth,
  setProfessionalIds,
  filterSchedules,
  deleteSchedule,
  addToSchedules,
  updateSchedule,
  fetchCurrentMonthAppointments,
  isFetchByMonthLoading,
  isFetchByMonthError,
  schedules,
  selectedMonth
}) => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('YA EFFECT GOT CALLED');
    fetchCurrentMonthAppointments({});
  }, []);

  // const {
  //   isFetchByMonthLoading,
  //   isFetchByMonthError,
  //   schedules,
  //   selectedMonth,
  //   setSelectedMonth,
  //   setProfessionalIds,
  //   filterSchedules,
  //   deleteSchedule,
  //   addToSchedules,
  //   updateSchedule
  // } = useFetchAppointmentsByMonth();

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

  const okToBookAppointment = (appointment: ICompactAppointment): boolean => {
    return canAppointmentBeBooked(schedules, appointment);
  };

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
              okToBookAppointment={okToBookAppointment}
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
              okToBookAppointment={okToBookAppointment}
            />
          )
        )}
      </Modal>
    </>
  );
};

HomePage.propTypes = {
  isMobileScreen: PropTypes.bool.isRequired,
  setSelectedMonth: PropTypes.func.isRequired,
  setProfessionalIds: PropTypes.func.isRequired,
  filterSchedules: PropTypes.func.isRequired,
  deleteSchedule: PropTypes.func.isRequired,
  addToSchedules: PropTypes.func.isRequired,
  updateSchedule: PropTypes.func.isRequired,
  fetchCurrentMonthAppointments: PropTypes.func.isRequired,
  isFetchByMonthLoading: PropTypes.bool.isRequired,
  isFetchByMonthError: PropTypes.bool.isRequired,
  schedules: PropTypes.array.isRequired,
  selectedMonth: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => ({
  setSelectedMonth: selectedMonth =>
    dispatch(actionSetSelectedMonth(selectedMonth)),
  setProfessionalIds: professionalIds =>
    dispatch(actionSetProfessionalIds(professionalIds)),
  filterSchedules: doctorIds => dispatch(actionFilterSchedules(doctorIds)),
  deleteSchedule: slotId => dispatch(actionDeleteSchedule(slotId)),
  addToSchedules: schedule => dispatch(actionAddSchedule(schedule)),
  updateSchedule: schedule => dispatch(actionUpdateSchedule(schedule)),
  fetchCurrentMonthAppointments: ({ token, institutionId }) =>
    dispatch(actionFetchCurrentMonthAppointments({ token, institutionId }))
});

const mapStateToProps = ({ stateFetchAppointmentsByMonth: state }) => ({
  isFetchByMonthLoading: state.isFetchByMonthLoading,
  isFetchByMonthError: state.isFetchByMonthError,
  schedules: state.schedules,
  selectedMonth: state.selectedMonth
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withMobile(HomePage));
