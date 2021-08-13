import { Card, Navbar, NavDropdown, Dropdown } from "react-bootstrap";
import styled, { css } from "styled-components";

import Text from "../../styled/Text";

export const DropdownTogle = styled(Dropdown.Toggle)`
  background: #fff;
  color: black;
  border: 2px solid lightgray;
  border-radius: 25px;
  padding: 10px 25px;
  &.active {
    background-color: #f1f9fe;
    border-top: 2px solid #0078db;
    border-bottom: 2px solid transparent;
    border: none;
  }
`;

export const NavLink = styled(Text)`
  padding: 1rem 1rem;
  color: ${({ theme }) => theme.textColors["black"]};
  margin-bottom: 0px !important;
  min-height: 80px;
  line-height: 50px;

  &.active {
    background-color: #f1f9fe;
    border-top: 2px solid #0078db;
    border-bottom: 2px solid transparent;
  }
`;

export const StyledNavDropdown = styled(NavDropdown)`
  position: static;
  /* background: red; */
  & .nav-link {
    padding: 1rem 1rem !important;
    height: 80px;
    line-height: 50px;
    &:after {
      background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.41 0.294922L6 4.87492L10.59 0.294922L12 1.70492L6 7.70492L0 1.70492L1.41 0.294922Z' fill='black' fill-opacity='0.54'/%3E%3C/svg%3E%0A");
      width: 12px;
      height: 8px;
      background-size: contain;
      background-repeat: no-repeat;
      margin-left: 7px;
      border: none;
      transform: translateY(2px);
    }
    p {
      margin-bottom: 0;
      color: #000;
    }
  }

  & > .dropdown-menu {
    border-radius: 0 0 18px 18px;
    width: 100%;
    padding: 0;
    /* border-radius: 0; */
    border: 0;
    /* box-shadow: 0 8px 9px -6px rgb(0 0 0 / 40%); */
    box-shadow: 0px 1px 30px rgba(0, 0, 0, 0.11);
    top: calc(100% + 1px);
  }
`;

export const StyledNavbar = styled(Navbar)`
  background-color: transparent !important;
  padding: 0 1rem;
  & .navbar-brand {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`;

export const CardBox = styled(Card)`
  border-radius: 0 !important;
  border: 0;
`;

interface CardHeaderProps {
  border: boolean;
}

export const CardHeader = styled(Card.Header)<CardHeaderProps>`
  background-color: transparent;
  border-radius: 0 !important;
  border: 0;
  padding: 10px 20px;

  ${(props) =>
    props.border &&
    css`
      border-bottom: 1px solid #dad8d8;
    `}
`;

export const CardBody = styled(Card.Body)`
  background-color: transparent;
  padding: 0 0 0 20px;
`;

export const LinkText = styled(Text)`
  padding: 10px 20px;
  margin: 0;
`;

export const MenuButton = styled.button`
  background-color: transparent;
  border: 0;
`;

export const SignInDropdown = styled.ul`
  margin: 0;
  background-color: #ffffff;
  color: #09b2e8;
  border: 2px solid #e5e5e5;
  padding: 0 0 0 1em;
  position: absolute;
  z-index: 100;
  width: 200px;
  border-radius: 10px;
  box-shadow: 0px 1px 30px rgb(0 0 0 / 11%);

  &.hide {
    display: none;
  }
`;

export const SignInDropdownElement = styled.li`
  list-style: none;
  margin-bottom: 0.8em;
  cursor: pointer;
  &.colors {
    color: #396ae8;
    font-weight: bold;
  }
`;
