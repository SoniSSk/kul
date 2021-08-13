import styled, { css } from 'styled-components';

import Text from './Text';

interface CircledTextProps {
  backgroundColor?:
    | 'primary'
    | 'secondary'
    | 'darkBlue'
    | 'skyBlue'
    | 'white'
    | 'lightSkyBlue';
  size?: 'sm';
}

const CircledText = styled(Text)<CircledTextProps>`
  width: 36px;
  height: 36px;
  background-color: ${({ theme, backgroundColor }) =>
    theme.backgroundColors[backgroundColor || 'white']};
  border-radius: 36px;
  text-align: center;
  line-height: 36px;
  margin-top: -4px;

  ${(props) =>
    props.size === 'sm' &&
    css`
      width: 28px;
      height: 28px;
      line-height: 28px;
      border-radius: 28px;
    `}
`;

export default CircledText;
