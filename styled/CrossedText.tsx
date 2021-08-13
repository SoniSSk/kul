import styled from "styled-components";

import Text from "./Text";

const CrossedText = styled(Text)`
    position: relative;
    color: #9D9D9D;

    &::after{
        content: "";
        width: 90%;
        height: 1px;
        background-color: #9D9D9D;
        position: absolute;
        top: 50%;
        left: 2px;
        transform: rotate(-14deg);
    } 
`;

export default CrossedText;