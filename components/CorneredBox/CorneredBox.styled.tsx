import styled, { css } from "styled-components";

interface CorneredBoxStyledProps {
  backgroundColor?:
    | "primary"
    | "secondary"
    | "darkBlue"
    | "skyBlue"
    | "white"
    | "lightSkyBlue"
    | "joinNetwork";
}

interface CorneredBoxInnerStyledProps extends CorneredBoxStyledProps {
  paddingTop?: string;
  paddingBottom?: string;
}

export const CorneredBoxWrapper = styled.section<CorneredBoxStyledProps>`
  background-color: ${({ theme, backgroundColor }) =>
    theme.backgroundColors[backgroundColor || "white"]};
  padding-bottom: 2px;
  @media (max-width: 768px) {
    &.mobile-bg-white {
      background: white !important;
    }
  }
`;

export const CorneredBoxInner = styled.div<CorneredBoxInnerStyledProps>`
  background-color: ${({ theme, backgroundColor }) =>
    theme.backgroundColors[backgroundColor || "white"]};
  border-radius: 0 0 18px 18px;
  @media (max-width: 768px) {
    .mobile-bg-white > & {
      box-shadow: none!important;
    }
  }
  /* box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.25); */

  ${(props) =>
    props.paddingTop &&
    css`
      padding-top: ${props.paddingTop};
    `}
  ${(props) =>
    props.paddingBottom &&
    css`
      padding-bottom: ${props.paddingBottom};
    `}
`;
