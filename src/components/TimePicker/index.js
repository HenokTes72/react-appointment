import styled from 'styled-components';
import { TimePicker } from 'antd';
import './index.css';

export default styled(TimePicker)`
  .ant-time-picker-input {
    border-width: 0px;
    border-bottom: 1px solid #e4e6e8;
    border-radius: 0px;
    position: absolute;
  }

  &:hover,
  &:focus {
    border-width: 0px;
  }
`;
