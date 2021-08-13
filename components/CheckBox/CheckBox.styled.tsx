import styled from "styled-components";

export const CheckBoxWrapper = styled.div`
    display: inline-block;

    & .custom-control-input:checked~.custom-control-label::before {
        background-color: transparent;
        border: none;
    }

    & .custom-control-label::before {
        background-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M2 0H16C17.1 0 18 0.9 18 2V16C18 17.1 17.1 18 16 18H2C0.9 18 0 17.1 0 16V2C0 0.9 0.9 0 2 0ZM16 16V2H2V16H16Z' fill='black' fill-opacity='0.54'/%3E%3C/svg%3E");

        border: none;
        background-size: contain;
    }

    & .custom-control-label::after {
        background: initial;
    }

    & .custom-control-input:checked~.custom-control-label::after {
        background-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M16 0H2C0.9 0 0 0.9 0 2V16C0 17.1 0.9 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V2H16V16ZM13.58 4.58L14.99 6L6.99 14L2.99 10.01L4.41 8.6L6.99 11.17L13.58 4.58Z' fill='%232B79D4'/%3E%3C/svg%3E%0A");

        background-size: contain;
    }
`;