import styled from "styled-components";
export const OnlySM = styled.div`
  display: none;
  @media (max-width: 767px) {
    display: inherit;
  }
`;
export const OnlyMediaLaptop = styled.div`
  display: none !important;
  @media (min-width: 768px) {
    display: inherit!important;
  }
`;
