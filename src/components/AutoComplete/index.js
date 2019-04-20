import styled from 'styled-components';
import { AutoComplete } from 'antd';

export default styled(AutoComplete)`
  .ant-input:focus {
    box-shadow: none;
  }
  .ant-input,
  .ant-select-search__field {
    border-width: 0px !important;
    border-radius: 0px !important;
    border-bottom: 1px solid #e4e6e8 !important;
  }
  &:hover {
    border-width: 0px !important;
    border-bottom: 1px solid #40a9ff !important;
  }
`;
