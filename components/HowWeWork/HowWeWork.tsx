import { FC } from "react";
import Contents from "../../dtos/Contents.dto";
import Text from "../../styled/Text";
import Content from "../../dtos/Content.dto";
import Spacer from "../../styled/Spacer";
import { Row, Col } from "react-bootstrap";
import { OnlyMediaLaptop } from "../../styled/Responsive";

import styled from "styled-components";

const HWFeaturesWrapper = styled.div`
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    li {
      flex: 1;
      position: relative;
      .prod-item {
        padding-right: 120px;
      }
      &:last-child {
        padding-right: 0;
        &:after {
          display: none;
        }
      }
      &:after {
        content: "";
        background: url("https://i.ibb.co/tmRPzrZ/Group-243arrow.png") no-repeat;
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 80px;
        right: 0;
        transform: translateX(-30%);
        height: 30px;
        background-position: center;
        background-size: contain;
        margin: auto 10px;
      }
    }
    @media only screen and (max-width: 767px) {
      flex-direction: column;
      li {
        padding-right: 0;
        padding-bottom: 50px;
        & > .prod-item {
          display: flex;
          .pi-img {
            min-width: 80px;
            margin-right: 10px;
            img {
              width: 100%;
              height: 65px;
            }
          }
          .pi-content {
            flex: 1;
            min-height: 150px;
          }
        }
        &:after {
          /* transform: rotate(90deg) translate(-40px, 10px);
          left: 35%;
          right: auto;
          top: auto; */
          transform: rotate(90deg) translate(0, 10px);
          left: 0;
          right: auto;
          top: 30px;
        }
      }
    }
  }
`;

interface HowWeWorkProps {
  data: Contents;
}

const HowWeWork: FC<HowWeWorkProps> = ({ data }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {data.heading && (
            <Text fontSize="xxxl" fontFamily="montserrat" weight="bold">
              {data.heading}
            </Text>
          )}
        </div>
      </div>
      <Spacer size={30} direction={"vertical"} />
      {/* new design modifications */}
      <HWFeaturesWrapper>
        <ul>
          {data.content?.map((content: Content, index: number) => {
            return (
              <>
                <li key={index}>
                  <div className="prod-item">
                    <div className="pi-img">
                      {content.icon && (
                        <img
                          width={80}
                          src={content.icon.sourceUrl}
                          alt={content.icon.title}
                          className="image-gray"
                        />
                      )}
                    </div>
                    <div className="pi-content">
                      <div className="">
                        <Spacer size={10} direction={"vertical"} />
                        <Text
                          fontSize="base"
                          fontFamily="montserrat"
                          weight="midbold"
                          className="mb-3"
                        >
                          {content.title}
                        </Text>
                        <Text fontSize="md" weight="semibold">
                          {content.description}
                        </Text>
                      </div>
                    </div>
                  </div>
                </li>

                {/* <Col>
                {data.content && index !== data.content?.length - 1 && (
                  <img
                    src={"https://i.ibb.co/tmRPzrZ/Group-243arrow.png"}
                    alt={"Arrow pointing to next block"}
                    style={{ minWidth: 100 }}
                  />
                )}
              </Col> */}
              </>
            );
          })}
        </ul>
      </HWFeaturesWrapper>
      {/* old component */}
      <div className="row d-none" style={{ gap: "2rem 0" }}>
        {data.content?.map((content: Content, index: number) => {
          return (
            <div className="col-md-3 col-12" key={index}>
              <div className="row">
                <div className="col-2 col-md-12">
                  <div className="row align-items-center">
                    <div className="col-md">
                      {content.icon && (
                        <img
                          width={80}
                          src={content.icon.sourceUrl}
                          alt={content.icon.title}
                          className="image-gray"
                        />
                      )}
                    </div>
                    <div className="col-md">
                      {data.content && index !== data.content?.length - 1 && (
                        <>
                          {/* TODO Refactor this to a single tag */}
                          <img
                            src={"https://i.ibb.co/tmRPzrZ/Group-243arrow.png"}
                            alt={"Arrow pointing to next block"}
                            style={{ transform: "rotate(90deg)" }}
                            className="d-block d-md-none mt-4 mt-md-0"
                          />
                          <img
                            src={"https://i.ibb.co/tmRPzrZ/Group-243arrow.png"}
                            alt={"Arrow pointing to next block"}
                            className="d-none d-md-block"
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-10 col-md-8">
                  <Spacer size={10} direction={"vertical"} />
                  <Text
                    fontSize="base"
                    fontFamily="montserrat"
                    weight="midbold"
                    className="mb-3"
                  >
                    {content.title}
                  </Text>
                  <Text fontSize="md" weight="semibold">
                    {content.description}
                  </Text>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HowWeWork;
