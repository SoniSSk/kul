import styled, { css } from "styled-components";

interface ButtonProps {
  color?: "black" | "white" | "gray" | "primary" | "secondary";
  backgroundColor?:
    | "primary"
    | "secondary"
    | "darkBlue"
    | "skyBlue"
    | "white"
    | "lightSkyBlue"
    | "gray"
    | "lightGray";
  size: "xs" | "sm" | "md" | "lg" | "xl";
  cornered?: boolean;
  rounded?: boolean;
  outline?: boolean;
  block?: boolean;
  variant?: "default" | "category" | "offering";
}

const Button = styled.button<ButtonProps>`
  background-color: ${({ theme, backgroundColor }) =>
    theme.backgroundColors[backgroundColor || "primary"]};
  color: ${({ theme, color }) => theme.textColors[color || "white"]};

  border: none;
  display: inline-block;
  text-align: center;

  ${(props) =>
    props.size === "xs" &&
    css`
      font-size: ${({ theme }) => theme.fontSize["xs"]};
      padding: 4px 14px;
    `}
  ${(props) =>
    props.variant === "default" &&
    css`
      font-family: ${({ theme }) => theme.fontFamily["manrope"]};
      /* line-height: 1.75; */
      height: 60px;
      font-weight: 600;
      padding: 4px 14px;
    `}
 

  ${(props) =>
    props.size === "sm" &&
    css`
      font-size: ${({ theme }) => theme.fontSize["sm"]};
      padding: 6px 24px;
    `}

    ${(props) =>
    props.size === "md" &&
    css`
      font-size: ${({ theme }) => theme.fontSize["md"]};
      padding: 10px 32px;
    `}

    ${(props) =>
    props.size === "lg" &&
    css`
      font-size: ${({ theme }) => theme.fontSize["lg"]};
      padding: 10px 45px;
    `}
    
    ${(props) =>
    props.cornered &&
    css`
      border-radius: 4px;
    `}
    
    ${(props) =>
    props.rounded &&
    css`
      border-radius: 50px;
    `}
    
    ${(props) =>
    props.outline &&
    css`
      background-color: transparent;
      border: 1px solid
        ${({ theme }) =>
          theme.backgroundColors[props.backgroundColor || "primary"]};
    `}

    ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
    ${(props) =>
    props.variant === "category" &&
    css`
      font-family: ${({ theme }) => theme.fontFamily["manrope"]};
      font-size: 16px;
      height: 48px;
      font-weight: 600;
      padding: 0 24px;
    `}
    ${(props) =>
    props.variant === "offering" &&
    css`
      font-family: ${({ theme }) => theme.fontFamily["manrope"]};
      background-color: ${(props) => props.theme.backgroundColors.lighterBlue};
      border: 1ps solid ${(props) => props.theme.backgroundColors.lightBlue};
      font-size: 14px;
      height: 36px;
      font-weight: 600;
      padding: 0 20px;
      &:hover {
        background-color: ${(props) =>
          props.theme.backgroundColors.lightBlue}!important;
      }
    `}
    &:hover {
    color: ${({ theme, color }) => theme.textColors[color || "white"]};
    background-color: ${({ theme, backgroundColor }) =>
      theme.backgroundColors[backgroundColor || "primary"]};

    ${(props) =>
      props.outline &&
      css`
        background-color: transparent;
        color: ${({ theme }) => theme.textColors[props.color || "white"]};
        border: 1px solid
          ${({ theme }) =>
            theme.backgroundColors[props.backgroundColor || "primary"]};
      `}
  }

  & > img {
    vertical-align: middle;
    margin-left: 8px;
  }
`;

export default Button;
