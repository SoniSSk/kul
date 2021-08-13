import styled, { css } from 'styled-components';

interface TabStyledProps {
  active?: boolean;
}

export const Box = styled.div`
  border-radius: 5px;
  box-shadow: 0 0 0 2px rgb(54 132 215 / 3%), 0 0 10px rgb(0 0 0 / 10%);
  background-color: #fff;
  width: 100%;
  @media (min-width: 1200px) {
    height: calc(100% - 30px);
  }
`;

export const Heading = styled.div`
  padding: 10px 0;
  background: #daeffd;
  text-align: center;
`;

export const Tab = styled.li<TabStyledProps>`
  width: 50%;
  ${(props) =>
    props.active &&
    css`
      &:after{
        content: '';
        display: block;
        background-color: #396ae8;
        height: 4px;
        width: 100%;
        border-radius: 4px 4px 0 0;
      }
      /* border-bottom: 4px solid #396ae8; */
    `}
`;

export const Button = styled.button`
  width: 100%;
  background: white;
  margin-bottom: -1px;
  border: 1px solid transparent;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  display: block;
  padding: 0.5rem 1rem;
`;

export const SubmitButton = styled.button`
  border-radius: 20px;
`;
