import styled from 'styled-components';
import { DatePicker } from 'antd';
import './index.css';

export default styled(DatePicker)`
  .ant-calendar-picker-input,
  .ant-input {
    border-width: 0px;
    border-bottom: 1px solid #e4e6e8;
    border-radius: 0px;
  }
`;
