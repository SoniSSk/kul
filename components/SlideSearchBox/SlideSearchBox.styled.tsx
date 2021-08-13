import styled from "styled-components";

export const Input = styled.input`
    transform: scaleX(0);
    opacity: 0;
    transition: opacity .25s, transform .25s;
    transform-origin: right 0;
    height: 42px;
    border: 1px solid #E6ECFB;
    border-radius: 42px;
    padding: 6px 42px 6px 12px;

    &.show {
        transform: scaleX(1);
        opacity: 1;
    }

    &:focus-visible {
        outline: none;
    }
`;

export const IconButton = styled.button`
    background-color: #E6ECFB;
    border: none;
    border-radius: 50%;
    height: 42px;
    width: 42px;
    position: absolute;
    right: 0;
    top: 0;
`;

export const SlideSearchBoxWrapper = styled.div`
    position: relative;
    min-width: 42px;
    display: inline-block;
`;