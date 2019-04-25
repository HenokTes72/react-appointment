import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import moment from 'moment';

import P from '../P';
import withMobile from '../../utils/withMobile';

const Wrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 25px;
  display: flex;
  flex-wrap: wrap;
  padding-left: ${props => (props.isMobileScreen ? '0px' : '50px')};
  padding-right: ${props => (props.isMobileScreen ? '0px' : '50px')};
  justify-content: ${props =>
    props.isMobileScreen ? 'flex-start' : 'space-between'};
`;

const DetailWrapper = styled.div`
  display: flex;
  flex: 0.5;
  flex-direction: column;
`;

const EndDetailWrapper = styled(DetailWrapper)`
  margin-left: ${props => (props.isMobileScreen ? '10px' : '100px')};
`;

const PB = styled(P)`
  margin: 0px;
  font-weight: bold;
  font-family: sans-serif;
  color: black;
`;

const DetailItems = styled.div`
  margin-bottom: 15px;
`;

const PP = styled(P)`
  margin: 0px;
  font-size: 15px;
  font-weight: 400;
  color: #1f1f1f;
  font-family: inherit;
`;

const Detail = ({ isMobileScreen, slotData }) => {
  const {
    patient,
    professional,
    consulta,
    place,
    phone,
    detail,
    date,
    start,
    end
  } = slotData;
  return (
    <Wrapper isMobileScreen={isMobileScreen}>
      <DetailWrapper>
        <DetailItems>
          <PB>Paciente</PB>
          <PP>{patient}</PP>
        </DetailItems>
        <DetailItems>
          <PB>Especialista</PB>
          <PP>{professional}</PP>
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
          <PB>Fetch y Hora</PB>
          <PP>
            {moment(date, 'YYYY-MM-DD').format('DD MMMM YYYY')}
            <br />
            {`${start} ${end}`}
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
