import { CorneredBoxInner, CorneredBoxWrapper } from "./CorneredBox.styled";

interface CorneredBoxProps {
  bgColorBack?:
    | "primary"
    | "secondary"
    | "darkBlue"
    | "skyBlue"
    | "white"
    | "lightSkyBlue";
  bgColor?:
    | "primary"
    | "secondary"
    | "darkBlue"
    | "skyBlue"
    | "white"
    | "lightSkyBlue"
    | "joinNetwork";
  paddingTop?: string;
  paddingBottom?: string;
  className?: string;
  innerClassName?: string;
  mobileBg?: string;
  children: React.ReactNode;
}

const CorneredBox = ({
  children,
  bgColorBack,
  bgColor,
  className = "",
  innerClassName = "",
  mobileBg = "",
  ...props
}: CorneredBoxProps) => (
  <CorneredBoxWrapper
    backgroundColor={bgColorBack}
    className={className}
  >
    <CorneredBoxInner
      backgroundColor={bgColor}
      className={innerClassName}
      {...props}
    >
      {children}
    </CorneredBoxInner>
  </CorneredBoxWrapper>
);

export default CorneredBox;
