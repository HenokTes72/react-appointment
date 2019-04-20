import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';
import Profile from './Profile';
import Detail from './Detail';
import Footer from './Footer';

const Wrapper = styled.div`
  padding: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const AppointmentDetail = ({ data, setEditModalVisiblity }) => {
  // eslint-disable-next-line no-console
  console.log(JSON.stringify(data));
  console.log('setEditModalVisiblity', setEditModalVisiblity);
  return (
    <Wrapper>
      <Profile />
      {data && <Detail slotData={data} />}
      <Footer setEditModalVisiblity={setEditModalVisiblity} />
    </Wrapper>
  );
};

AppointmentDetail.propTypes = {
  data: PropTypes.object.isRequired,
  setEditModalVisiblity: PropTypes.func.isRequired
};

export default AppointmentDetail;
