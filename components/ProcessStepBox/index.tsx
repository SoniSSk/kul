import { orderBy } from 'lodash';

import ProcessStep from '../../dtos/ProcessStep.dto';
import { ProcessStepFlow, ProcessStepItem } from './ProcessStepBox.styled';
import Text from '../../styled/Text';
import CircledText from '../../styled/CircledText';
import { FC } from 'react';
import Spacer from '../../styled/Spacer';

interface ProcessStepBoxProps {
  data: ProcessStep[] | null;
}

const ProcessStepBox: FC<ProcessStepBoxProps> = ({ data }) => {
  if (!data || !data.length) return null;

  const processStepsSorted: ProcessStep[] = orderBy(data, 'order');

  return (
    <div className="container">
      <Text fontSize="xxxl" fontFamily="montserrat" weight="bold">
        Registration Process
      </Text>
      <Spacer size={15} direction="vertical" />
      <ProcessStepFlow>
        {processStepsSorted.map((processStep, i) => (
          <ProcessStepItem key={i}>
            <div className="row">
              <div className="col-auto">
                <CircledText
                  backgroundColor="skyBlue"
                  fontSize="base"
                  weight="midbold"
                >
                  {i + 1}
                </CircledText>
              </div>
              <div className="col">
                <Text fontSize="md" weight="semibold">
                  {processStep.step}
                </Text>
              </div>
            </div>
          </ProcessStepItem>
        ))}
      </ProcessStepFlow>
    </div>
  );
};

export default ProcessStepBox;
