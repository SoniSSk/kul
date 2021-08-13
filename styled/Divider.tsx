import styled, { css } from "styled-components";

interface DividerProps {
    margin: string;
    color?: 'white' | 'black';
}

const Divider = styled.hr<DividerProps>`
    margin-top: ${({ margin }) => margin};
    margin-bottom: ${({ margin }) => margin};
    border: 0;
    opacity: 0.2;
    border-top: 1px solid ${({ color }) => color || 'white'};    
`;

export default Divider;