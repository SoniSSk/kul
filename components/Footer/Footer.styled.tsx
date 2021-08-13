import styled from 'styled-components';

export const FooterMenu = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  gap: 20px;
`;

export const Footer2Menu = styled.ul`
  padding: 0;
  list-style: none;

  & > li {
    margin-bottom: 10px;
  }
`;

export const FooterTop = styled.section`
  background-color: ${({ theme }) => theme.backgroundColors['secondary']};
  padding: 40px 0;
  background-image: url('/images/footer-pattern.png');
  background-repeat: no-repeat;
  background-position: right bottom;
`;

export const Footer = styled.footer`
  background-color: ${({ theme }) => theme.backgroundColors['darkBlue']};
  padding: 40px 0;
`;

export const FloatingButton = styled.div`
  position: fixed;
  right: 0.75rem;
  bottom: 0.75rem;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.backgroundColors['white']};
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  z-index: 9999;
`;
