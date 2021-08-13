import styled from "styled-components";

export const RadioBoxWrapper = styled.div`
    display: inline-block;

    & .custom-control-input:checked~.custom-control-label::after {
        background-image: url("data:image/svg+xml,%3Csvg width='14' height='11' viewBox='0 0 14 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 11.0001L0 6.00008L1.41 4.59008L5 8.17008L12.59 0.580078L14 2.00008L5 11.0001Z' fill='%23ffffff'/%3E%3C/svg%3E%0A");
    }

    & > .custom-control-label::before {
        border: #8993A4 solid 2px;
    }

    & > .custom-control-input:checked~.custom-control-label::before {
        color: #fff;
        border-color: #2B79D4;
        background-color: #2B79D4;
    }
`;