import styled, { css } from 'styled-components';

interface SpacerStyledProps {
  size: number;
  direction: 'vertical' | 'horizontal';
}

const Spacer = styled.span<SpacerStyledProps>`
  display: block;
  ${(props) =>
    props.direction === 'vertical' &&
    css`
      height: ${props.size}px;
    `}
  ${(props) =>
    props.direction === 'horizontal' &&
    css`
      width: ${props.size}px;
      display: inline-block;
    `}
`;

export default Spacer;
