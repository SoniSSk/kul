import styled, { css } from "styled-components";

interface SlideDrawerWrapperProps {
    isOpen: boolean;
}

export const SlideDrawerWrapper = styled.div<SlideDrawerWrapperProps>`
    height: 100%;
    background: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 80%;
    z-index: 200;
    box-shadow: 1px 0px 7px rgba(0,0,0,0.5); 
    transform: translateX(-110%);
    transition: transform 0.3s ease-out;
    border-radius: 0 20px 20px 0;
    padding: 15px 0;

    ${(props) =>
        props.isOpen &&
        css`
            transform: translateX(0);
        `}
`;