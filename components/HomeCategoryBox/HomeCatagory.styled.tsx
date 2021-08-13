import styled, { css } from "styled-components";

export const Consultation = styled.div`
  display: flex;
  margin-top: 30px;
  background: #fdf5ed;
  align-items: center;
  padding: 25px;
  border-radius: 15px;
  justify-content: space-between;
  @media only screen and (max-width: 768px){
    flex-wrap: wrap;
  }
`;

export const Consultation_Width = styled.div`
  width: 60%;
`;
