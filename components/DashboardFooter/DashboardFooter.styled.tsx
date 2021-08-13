import styled from "styled-components";

export const Footer = styled.footer`
  background-color: ${({ theme }) => theme.backgroundColors["darkBlue"]};
  padding: 40px 0;
`;

export const FloatingButton = styled.div`
  position: fixed;
  right: 60px;
  bottom: 60px;
  padding: 13px;
  background-color: ${({ theme }) => theme.backgroundColors["white"]};
  border-radius: 60px;
  height: 60px;
  width: 60px;
  z-index: 9999;
`;
