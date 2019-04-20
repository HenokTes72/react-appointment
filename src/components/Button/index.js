import { Button } from 'antd';
import styled from 'styled-components';

const MyButton = styled(Button)`
  background-color: #015ca4;
  color: white;
  border-radius: 0px;
`;

const StyledButton = styled(MyButton)`
  background-color: #478bc1;
  margin-left: 10px;
  margin-right: 10px;
  width: 150px;
`;

export { StyledButton };

export default MyButton;
