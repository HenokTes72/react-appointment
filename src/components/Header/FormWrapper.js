import styled from 'styled-components';

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const BlockWrapper = styled(FormWrapper)`
  align-self: stretch;
  align-items: stretch;
`;

export default FormWrapper;
export { BlockWrapper };
