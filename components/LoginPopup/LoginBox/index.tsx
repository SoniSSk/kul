import { FC, useState } from 'react';

import Text from '../../../styled/Text';
import {LoginLeftSideBox, LoginRightSideBox, ModalHeader} from '../LoginPopup.styled';
import Step1 from './Step1';
import Step2 from './Step2';

interface SignupBoxProps {
  setTab: Function;
  handleClose: Function;
}

const LoginBox: FC<SignupBoxProps> = ({ setTab, handleClose }) => {
  const [loginData, setLoginData] = useState<any>(null);

  return (
    <div className="row">
      <div className="col-0 col-md-5 p-0 d-flex">
        <LoginLeftSideBox backgroundColor="primary">
          <Text
            color="white"
            fontSize="xxxl"
            fontFamily="montserrat"
            weight="bold"
          >
            Login
          </Text>
          <Text color="white" fontSize="lg">
            Get access to your Orders at <br />
            one place
          </Text>
        </LoginLeftSideBox>
      </div>
      <div className="col-12 col-md-7 p-0">
        <ModalHeader closeButton backgroundColor="white" color={"primary"}/>
        <LoginRightSideBox>
          <div>
            {loginData ? (
              <Step2 loginData={loginData} setLoginData={setLoginData} handleClose={handleClose} />
            ) : (
              <Step1 setTab={setTab} setLoginData={setLoginData} />
            )}
          </div>
        </LoginRightSideBox>
      </div>
    </div>
  );
};

export default LoginBox;
