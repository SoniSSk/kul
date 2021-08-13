import { Card } from "react-bootstrap";
import styled from "styled-components";

export const FaqItem = styled(Card)`
    border: none;
    background-color: transparent;
`;

export const FaqHeader = styled(Card.Header)`
    border-bottom: 1px solid #DBDBDB;
    border-top: 1px solid #DBDBDB;
    background-color: transparent;
    padding: 28px 5px 20px 5px;
`;

export const FaqBody = styled(Card.Body)`
    padding: 28px 5px 20px 5px;
`;