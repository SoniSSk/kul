import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

export const LoginModal = styled(Modal)`
  & .modal-content {
    border: none;
    border-radius: 0;
  }
`;

export const ModalBody = styled(Modal.Body)`
  padding: 0 15px;
`;

interface LoginLeftSideBoxStyledProps {
  backgroundColor?:
    | 'primary'
    | 'secondary'
    | 'darkBlue'
    | 'skyBlue'
    | 'white'
    | 'lightSkyBlue';
}

export const ModalHeader = styled(Modal.Header)<LoginLeftSideBoxStyledProps>`
  background-color: ${({ theme, backgroundColor }) =>
      theme.backgroundColors[backgroundColor || 'primary']};
  border-bottom: unset;
  
  & > .close{
    color: ${({ theme, color }) =>
        theme.backgroundColors[color || 'white']};
  }
  
`;

export const LoginLeftSideBox = styled.div<LoginLeftSideBoxStyledProps>`
  background-color: ${({ theme, backgroundColor }) =>
    theme.backgroundColors[backgroundColor || 'primary']};
  width: 100%;
  padding: 30px 40px;
`;

export const LoginRightSideBox = styled.div`
  width: 100%;
  max-width: 280px;
  min-height: 450px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: 100%;
    padding: 40px 0;
  }
`;
