import Link from 'next/link';
import {
  Footer as StyledFooter,
  FloatingButton,
} from './DashboardFooter.styled';
import Text from '../../styled/Text';
import Spacer from '../../styled/Spacer';
import { DeviceTypes } from '../../constants/deviceTypes';
import { FC } from 'react';
import { contactNumber } from '../../constants/contactInformation';
import WhatsappFooterButton from '../WhatsappFooterButton/WhatsappFooterButton';

const ZENDESK_KEY = 'cda34b4e-33b3-423c-9ced-053740ee0306';

interface DashboardFooterProps {
  device: DeviceTypes;
}

const DashboardFooter: FC<DashboardFooterProps> = ({ device }) => {
  return (
    <>
      <StyledFooter>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5">
              <Text color="white" fontSize="sm">
                © 2021 Neo Online Ventures Pvt Ltd. All rights reserved.
              </Text>
              <Text color="white" fontSize="sm">
                We are not a law firm, or a substitute for a Lawyer or law firm.
                We are also not an "lawyer referral service". Use of our
                products and services are governed by our
                <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
              </Text>
            </div>
            <div className="col-12 col-md-7 text-right">
              <>
                <Link href="mailto:info@easylegal.in">
                  <a>
                    <Text color="white" fontSize="sm" inline>
                      <img
                        src="/icons/email_24px.svg"
                        width="16"
                        alt="email"
                        className="mr-2"
                      />
                      info@easylegal.in
                    </Text>
                  </a>
                </Link>
                <Spacer direction="horizontal" size={25} />
                <Link href="tel:18000002342">
                  <a>
                    <Text color="white" fontSize="sm" inline>
                      <img
                        src="/icons/phone_24px.svg"
                        width="16"
                        alt="phone"
                        className="mr-2"
                      />
                      1800 000 2342
                    </Text>
                  </a>
                </Link>
              </>
            </div>
          </div>
        </div>
      </StyledFooter>

      <WhatsappFooterButton device={device} />
    </>
  );
};

export default DashboardFooter;
