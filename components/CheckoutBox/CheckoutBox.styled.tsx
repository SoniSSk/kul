import { Card } from "react-bootstrap";
import styled from "styled-components";

export const CheckoutWrapper = styled.section`
  padding: 40px 0 70px 0;
`;

export const CheckoutCard = styled(Card)`
  border: none;
  border-radius: 8px !important;
  background-color: #f4f5f7;
`;

export const CardHeader = styled(Card.Header)`
  background-color: ${({ theme, isSelected }) =>
    isSelected ? theme.backgroundColors["secondary"] : "#f4f5f7"};
  border-radius: 8px !important;
  padding: 12px 20px 4px 20px;
`;

export const OffersList = styled.ul`
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: 3rem;
  justify-content: space-between;
  li {
    display: flex;
    align-items: center;
    margin:1rem .25rem;
    img {
      width: 40px;
      height: 40px;
      display: block;
      object-fit: contain;
      margin-right: 10px;
    }
    p {
      margin-bottom: 0;
    }
  }
`;
