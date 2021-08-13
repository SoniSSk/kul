import { FC, useLayoutEffect, useState } from "react";
import StillHaveQuestions from "../../dtos/StillHaveQuestions.dto";
import Text from "../../styled/Text";
import Spacer from "../../styled/Spacer";
import Button from "../../styled/Button";
import { DeviceTypes } from "../../constants/deviceTypes";
import openWhatsapp from "../../utils/openWhatsapp";
import { Row, Col } from "react-bootstrap";

interface StillHaveQuestionsProps {
  data?: StillHaveQuestions;
}

const StillHaveQuestion: FC<StillHaveQuestionsProps> = ({ data }) => {
  const [device, setDevice] = useState(DeviceTypes.DESKTOP);

  useLayoutEffect(() => {
    const handleResize = () => {
      setDevice(
        window.innerWidth < 768 ? DeviceTypes.MOBILE : DeviceTypes.DESKTOP
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const isMobile = device === DeviceTypes.MOBILE;
  return (
    <div className="container">
      <Text fontSize="xxxl" fontFamily="montserrat" weight="bold">
        {data?.heading}
      </Text>
      <Row
        className="mt-4"
        {...(isMobile && {
          style: {
            border: "1px solid #DBDDE6",
            borderRadius: "8px",
            margin: "0",
          },
        })}
      >
        <Col md="6">
          <div
            className={`p-2 p-md-5 h-100 my-2 ${isMobile ? "pt-4 m-0" : ""}`}
            style={{
              border: !isMobile ? "1px solid #d0cece" : "none",
              borderColor: "#d0cece",
              borderRadius: "10px",
            }}
          >
            <Row className="flex-column-reverse flex-lg-row">
              <Col md="8">
                <Text fontSize="xl" weight="bold" center={isMobile}>
                  {data?.leftBox.heading}
                </Text>
                <Text fontSize="lg" weight="semibold" center={isMobile}>
                  {data?.leftBox.content}
                </Text>
              </Col>
              <Col
                md="4"
                className={device === DeviceTypes.MOBILE ? "text-center" : ""}
              >
                <img
                  src={data?.leftBox.image?.sourceUrl}
                  alt={data?.leftBox.image?.title}
                  width={"100%"}
                  className="mb-4"
                  style={{
                    maxWidth: "100%",
                    height: 120,
                    objectFit: "contain",
                  }}
                />
              </Col>
            </Row>
            <div className={`mt-3 ${isMobile ? "text-center" : ""}`}>
              <Button
                size={"lg"}
                as={"a"}
                backgroundColor={"darkBlue"}
                rounded={true}
                className={isMobile ? "btn-block py-2" : "py-2 px-5 w-90"}
                onClick={() => {
                  openWhatsapp(device);
                }}
              >
                {data?.leftBox.button.text}
              </Button>
            </div>
          </div>
        </Col>
        <Col md="6" className="mt-3 mt-md-0">
          <div
            className={`p-2 p-md-5 h-100 m-2 ${
              isMobile ? "pt-5 mt-3 text-center pb-5" : ""
            }`}
            style={{
              border: "1px solid #d0cece",
              borderRadius: "10px",
              ...(isMobile && {
                border: "none",
                borderTop: "1px solid #DBDBDB",
                borderRadius: "0",
              }),
            }}
          >
            {isMobile ? (
              <MobileBreakAt title={data?.rightBox.heading} />
            ) : (
              <Text fontSize="xl" weight={"bold"}>
                {data?.rightBox.heading}
              </Text>
            )}

            <div className="mt-4">
              {data?.rightBox.timing.map((timing: any, index: number) => {
                return (
                  <Text
                    fontSize={isMobile ? "base" : "lg"}
                    weight="semibold"
                    key={index}
                    className="mb-2"
                  >
                    {timing.availableSlot}
                  </Text>
                );
              })}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

function MobileBreakAt({ title }: { title: string | undefined }) {
  if (title && title.indexOf("at") !== -1) {
    const titles = title.split("at");
    return (
      <div>
        <Text fontSize="lg" weight="semibold">
          {titles[0]} at
        </Text>
        <Text fontSize="xl" weight={"bold"}>
          {titles[1]}
        </Text>
        {/* <Text fontSize="base" weight="semibold">
          This is a mobile break
        </Text> */}
      </div>
    );
  }
  return (
    <Text fontSize="xl" weight={"bold"}>
      {title}
    </Text>
  );
}
export default StillHaveQuestion;
