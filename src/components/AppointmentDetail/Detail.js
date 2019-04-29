import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import withMobile from '../../utils/withMobile';

import {
  Wrapper,
  DetailWrapper,
  DetailItems,
  EndDetailWrapper,
  PB,
  PP
} from './detailStyle';

const Detail = ({ isMobileScreen, slotData }) => {
  const {
    patient: { firstName, lastName, phone },
    specialist,
    appointment: { place, date, startTime, endTime, detail, consulta }
  } = slotData;
  return (
    <Wrapper isMobileScreen={isMobileScreen}>
      <DetailWrapper>
        <DetailItems>
          <PB>Paciente</PB>
          <PP>{`${firstName} ${lastName}`}</PP>
        </DetailItems>
        <DetailItems>
          <PB>Especialista</PB>
          <PP>{specialist}</PP>
        </DetailItems>
        <DetailItems>
          <PB>Centro</PB>
          <PP>{place}</PP>
        </DetailItems>
        <DetailItems>
          <PB>Consulta</PB>
          <PP>{consulta}</PP>
        </DetailItems>
      </DetailWrapper>
      <EndDetailWrapper isMobileScreen={isMobileScreen}>
        <DetailItems>
          <PB>Fecha y Hora</PB>
          <PP>
            {moment(date, 'YYYY-MM-DD').format('DD MMMM YYYY')}
            <br />
            {`${startTime} - ${endTime}`}
          </PP>
        </DetailItems>
        <DetailItems>
          <PB>Telefono</PB>
          <PP>{phone}</PP>
        </DetailItems>
        <DetailItems>
          <PB>Asunto del la Cita</PB>
          <PP>{detail}</PP>
        </DetailItems>
      </EndDetailWrapper>
    </Wrapper>
  );
};

Detail.propTypes = {
  isMobileScreen: PropTypes.bool.isRequired,
  slotData: PropTypes.object.isRequired
};

export default withMobile(Detail);
