import styled from 'styled-components';

interface AlertProps {
  backgroundColor?:
    | 'primary'
    | 'secondary'
    | 'darkBlue'
    | 'skyBlue'
    | 'white'
    | 'lightSkyBlue';
}

const Alert = styled.div<AlertProps>`
  position: relative;
  padding: 16px 20px 8px 20px;
  border-radius: 4px;
  box-shadow: 0px 8px 12px rgba(31, 92, 163, 0.2);

  background-color: ${({ theme, backgroundColor }) =>
    theme.backgroundColors[backgroundColor || 'green']};
`;

export default Alert;
