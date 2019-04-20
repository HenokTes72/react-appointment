import React from 'react';
import { Input, Select, Button } from 'antd';

import Wrapper from './Wrapper';
import Icon from './Icon';
import HeaderLogo from './logo.png';
import Logo from './Logo';
import FormWrapper, { BlockWrapper } from './FormWrapper';
import HeaderButton from './HeaderButton';

const { Search, Group: InputGroup } = Input;
const { Option } = Select;

const Header = () => {
  return (
    <Wrapper height="60px">
      <FormWrapper>
        <Icon />
        <Logo src={HeaderLogo} alt="appointment - Logo" />
      </FormWrapper>

      <FormWrapper>
        <InputGroup compact>
          <Search
            placeholder="Nombre del prefesional, Especialida"
            // onSearch={value => console.log(value)}
            style={{ width: 250 }}
          />
          <Select defaultValue="Ciudad">
            <Option value="Ciudad">Ciauda</Option>
            <Option value="Jiangsu">Jiangsu</Option>
          </Select>
          <Button type="primary">Post</Button>
        </InputGroup>
      </FormWrapper>

      <BlockWrapper>
        <HeaderButton>Sign In</HeaderButton>
        <HeaderButton>Sign Up</HeaderButton>
        <HeaderButton
          color="white"
          bgcolor="#015ca4"
          size="17px"
          padding="15px"
        >
          You are a doctor
          <br /> sign up
        </HeaderButton>
      </BlockWrapper>
    </Wrapper>
  );
};

export default Header;
