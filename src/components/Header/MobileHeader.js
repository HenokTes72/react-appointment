import React from 'react';
import { Input, Select, Button } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';
import Icon from './Icon';
import HeaderLogo from './logo.png';
import Logo from './Logo';
import FormWrapper from './FormWrapper';

const { Search, Group: InputGroup } = Input;
const { Option } = Select;

const MobileWrapper = styled(Wrapper)`
  flex-wrap: wrap;
  align-items: flex-start;
  padding-top: 20px;
`;

const MobileHeader = ({ width }) => {
  const dropDownAndSearchButtonWidth = 180;
  return (
    <MobileWrapper height="120px">
      <FormWrapper>
        <Icon />
        <Logo src={HeaderLogo} alt="appointment - Logo" />
      </FormWrapper>

      <FormWrapper>
        <InputGroup compact>
          <Search
            placeholder="Nombre del prefesional, Especialida"
            // onSearch={value => console.log(value)}
            style={{ width: width - dropDownAndSearchButtonWidth }}
          />
          <Select defaultValue="Ciudad">
            <Option value="Ciudad">Ciauda</Option>
            <Option value="Jiangsu">Jiangsu</Option>
          </Select>
          <Button type="primary">Post</Button>
        </InputGroup>
      </FormWrapper>
    </MobileWrapper>
  );
};

MobileHeader.propTypes = {
  width: PropTypes.number.isRequired
};

export default MobileHeader;
