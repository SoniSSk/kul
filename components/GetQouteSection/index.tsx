import { useState } from "react";
import { FC } from "react";
import styled from "styled-components";
import Button from "../../styled/Button";
import Text from "../../styled/Text";
import CorneredBox from "../CorneredBox";
import TellUsPopup from "../TellUsPopup";
import useResponsiveDevice from "../useResponsiveDevice";

const GetQouteSectionWrapper = styled.div`
  background: white;
  @media (max-width: 767px) {
    /* padding: 0 20px; */
    .innerBox {
      background-color: white;
      border-radius: 0 0 18px 18px;
      padding: 20px;
    }
    .container {
      background: #303765;
      margin-bottom: 50px;
      border-radius: 20px;
      padding: 20px 20px;
    }
  }
`;
// interface GetQouteSectionProps {
//   bgColorBack?: 'primary' | 'secondary' | 'darkBlue' | 'skyBlue' | 'white' | 'lightSkyBlue';
// }

const GetQouteSection: FC<any> = ({ bgColorBack }) => {
  const { isMobile } = useResponsiveDevice();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <GetQouteSectionWrapper className="">
      <CorneredBox
        bgColor="secondary"
        bgColorBack={bgColorBack}
        paddingTop="35px"
        paddingBottom="35px"
        className="wrapperBox"
        innerClassName="innerBox"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 text-center py-3">
              <img
                src={
                  "https://ezylegal-assets.s3.ap-south-1.amazonaws.com/quote_logo.svg"
                }
                width="120"
              />
            </div>
            <div className="col-lg-6">
              <Text
                color="white"
                weight={"semibold"}
                fontSize="lg"
                center={isMobile}
              >
                If you have questions regarding our products, speak to our team of Legal Experts.
              </Text>
            </div>
            <div className="col-lg-4 text-center py-3">
              <Button
                rounded
                outline
                backgroundColor="white"
                size="lg"
                onClick={handleShow}
                style={{
                  padding: "12px 0",
                  maxWidth: isMobile ? "100%" : "340px",
                  width: "100%",
                }}
              >
                Speak to Legal Expert
              </Button>
            </div>
          </div>
        </div>
        {show ? <TellUsPopup show={show} onHide={handleClose} size="lg"/> : null}
      </CorneredBox>
    </GetQouteSectionWrapper>
  );
};

export default GetQouteSection;
