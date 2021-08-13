import styled from 'styled-components';

export const ProcessStepFlow = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  @media only screen and (min-width: 768px) {
    gap: 1rem 3.5rem;
    justify-content: center;
  }
`;

export const ProcessStepItem = styled.li`
  /* width: 230px; */
  background-color: ${({ theme }) => theme.backgroundColors['white']};
  padding: 1rem 0.5rem;
  position: relative;
  border-radius: 8px;
  width: 100%;
  @media only screen and (min-width: 768px) {
    max-width: clamp(8rem, 15vw, 20vw);
    &::before {
      content: ' ';
      height: 1.5rem;
      width: 1.5rem;
      position: absolute;
      left: -2rem;
      top: 50%;
      transform: translate(-50%, -50%);
      background-image: url(/icons/arrow_right_alt_24px.svg);
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  &:first-child:before {
    content: none;
  }
`;
