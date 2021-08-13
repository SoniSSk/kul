import Link from 'next/link';
import React, { FC } from 'react';
import Button from '../../styled/Button';
import Contents from '../../dtos/Contents.dto';
import Spacer from '../../styled/Spacer';
import Text from '../../styled/Text';
import { MainDashbox } from './Dashbox.Styled';
interface DashboxBoxProps {
  data: Contents;
}
const buttonstyle = {
  display: 'inline-flex',
  padding: '10px 20px',
  width: '100%',
  justifyContent: 'center',
};

const Dashbox: FC<any> = () => {
  return (
    <MainDashbox>
      <Text fontSize="xxxl" fontFamily="montserrat" weight="bold">
        Do you need More business services
      </Text>
      <Text
        fontSize="lg"
        fontFamily="montserrat"
        className="small_txt"
        weight="bold"
      >
        We help you in your business setup, running it and also protecting in
        every manner
      </Text>
      <Link href="#">
        <a>
          <Button size="lg" rounded className="arrow_btn" style={buttonstyle}>
            Explore Our Services
            <img src="/icons/arrow-forward.svg" alt="Continue" width="15" />
          </Button>
        </a>
      </Link>
    </MainDashbox>
  );
};

export default Dashbox;
