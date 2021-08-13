import styled, { css } from 'styled-components';

interface ArrowButtonStyledProps {
  leftArrow?: boolean;
  rightArrow?: boolean;
}

export const ArrowButton = styled.button<ArrowButtonStyledProps>`
  background-color: ${({ theme }) => theme.backgroundColors.primary};
  border: 0;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: center;
  ${(props) =>
    props.leftArrow &&
    css`
      border-radius: 0.66rem 0 0 0.66rem;
    `}
  ${(props) =>
    props.rightArrow &&
    css`
      border-radius: 0 0.66rem 0.66rem 0;
    `}
`;
