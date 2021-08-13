import styled, { css } from "styled-components";

interface ShadowCardProps {
  backgroundColor?:
    | "primary"
    | "secondary"
    | "darkBlue"
    | "skyBlue"
    | "white"
    | "lightSkyBlue"
    | "lightYellow";
  bordered?: boolean;
}

const ShadowCard = styled.div<ShadowCardProps>`
  background-color: ${({ theme, backgroundColor }) =>
    theme.backgroundColors[backgroundColor || "white"]};
  box-shadow: 0px 8px 12px rgba(31, 92, 163, 0.2);
  border-radius: 8px;
  padding: 30px 25px;
  width: 100%;
  /* margin: 5px; */
  ${(props) =>
    props.bordered &&
    css`
      border: 1px solid #e8e8e8;
    `}
`;

export default ShadowCard;
