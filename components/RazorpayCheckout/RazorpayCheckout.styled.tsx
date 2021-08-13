import styled from "styled-components";

export const RazorpayCheckoutWrapper = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const RazorpayCheckoutItem = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  min-width: 150px;
  img {
    mix-blend-mode: darken;
  }
  & input {
    margin-right: 15px;
  }
`;
