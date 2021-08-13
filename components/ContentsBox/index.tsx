import { FC } from "react";
import { Col, Row } from "react-bootstrap";

import Contents from "../../dtos/Contents.dto";
import Spacer from "../../styled/Spacer";
import Text from "../../styled/Text";

interface ContentsBoxProps {
  data: Contents;
}

const ContentsBox: FC<ContentsBoxProps> = ({ data }) => {
  if (!data || !data?.content?.length) return null;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-12">
          {data.heading ? (
            <Text fontSize="xxxl" fontFamily="montserrat" weight="bold">
              {data.heading}
            </Text>
          ) : null}
          <Spacer direction="vertical" size={20} />
          <Row>
            <Col md="8">
              <ul className="list-unstyled mw-75">
                {data.content.map((item, i) => (
                  <li className="media mb-4" key={i}>
                    {item.icon ? (
                      <img
                        className="mr-4 image-gray"
                        src={item.icon?.sourceUrl}
                        alt={item.icon?.title}
                        width="36"
                      />
                    ) : null}
                    <div className="media-body">
                      <Text fontSize="lg" weight="midbold">
                        {item.title}
                      </Text>
                      <Text fontSize="base" weight="semibold">
                        {item.description}
                      </Text>
                    </div>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ContentsBox;
