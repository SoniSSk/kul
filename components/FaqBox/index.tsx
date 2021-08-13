import { FC } from 'react';
import { Accordion } from 'react-bootstrap';

import Faq from '../../dtos/Faq.dto';
import Text from '../../styled/Text';
import { FaqHeader, FaqItem, FaqBody } from './FaqBox.styled';

interface FaqBoxProps {
  data: Faq[] | null;
}

const FaqBox: FC<FaqBoxProps> = ({ data }) => {
  if (!data || !data.length) return null;
  console.log(data);
  return (
    <div className="container">
      <Text fontSize="xxxl" fontFamily="montserrat" weight="bold">
        Frequently asked Questions
      </Text>
      <Accordion>
        {data.map((faq, i) => (
          <FaqItem key={i}>
            <FaqHeader>
              <Accordion.Toggle as="div" eventKey={'faq' + i}>
                <div className="d-flex align-items-center justify-content-between">
                  <Text fontSize="base" weight="semibold">
                    {faq.question}
                  </Text>
                  <img src="/icons/add.svg" alt="Add" width="20" />
                </div>
              </Accordion.Toggle>
            </FaqHeader>
            <Accordion.Collapse eventKey={'faq' + i}>
              <FaqBody>
                <Text>{faq.answer}</Text>
              </FaqBody>
            </Accordion.Collapse>
          </FaqItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqBox;
