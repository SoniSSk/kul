import {FC, useEffect, useState} from 'react';
import OtpInput from 'react-otp-input';

import Button from '../../../styled/Button';
import Text from '../../../styled/Text';
import Spacer from '../../../styled/Spacer';
import {useDispatch} from "react-redux";
import {loginUser, verifyOtp} from "../../../redux/loggedInUser/loggedInUser.actions";
import {errorToast, successToast} from "../../../utils/toasts";
import {set} from "react-hook-form";

interface Step2Props {
  setLoginData: Function;
  loginData: any;
  handleClose: Function;
}

const Step2: FC<Step2Props> = ({ loginData, setLoginData, handleClose }) => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
      async function otpRequest() {
          if ('OTPCredential' in window) {

              const abortController = new AbortController();
              let timer = setTimeout(() => {
                  abortController.abort();
              }, 20 * 1000);

              let o: CredentialRequestOptions = {
                  otp: {transport: ['sms']},
                  signal: abortController.signal
              };

              const content = await window.navigator['credentials'].get(o);
              alert(content?.type);
              if (content !== null) setOtp(content.id);
              //do what ever you want to do with the received code, probably send it to server
          }
      }
      otpRequest();
  }, []);

  const handleLogin = () => {
      console.log("Login Data", loginData, otp);
      dispatch(verifyOtp({
          mobile: loginData.mobile,
          otp: otp
      }, () => {
          handleClose();
      }));

  }

    const forceOtpSend = () => {
        console.log("Sending otp to: ", loginData);
        try{
            dispatch(loginUser(loginData, () => {
                successToast("Otp sent successfully!")
            }))
        }catch (e) {
            errorToast(e.message);
        }
    }


  return (
    <>
      <Text fontSize="md" color="gray">
        Enter OTP sent to your Mobile No. <br /> +{loginData.countryCode}-
        {loginData.mobile}
        <Text
          as="button"
          fontSize="md"
          inline
          color="primary"
          style={{
              background: "transparent",
              border: "unset"
          }}
          onClick={() => setLoginData(null)}
        >
          Change
        </Text>
      </Text>
      <Spacer direction="vertical" size={15} />
      <OtpInput
        value={otp}
        onChange={setOtp}
        inputStyle={{
          width: '100%',
          height: '55px',
          borderRadius: '5px',
          border: '1px solid #396AE8',
        }}
        containerStyle={{
          gap: '20px',
        }}
      />
      <Spacer direction="vertical" size={30} />
      <Button size="md" block rounded color="white" backgroundColor="primary" onClick={handleLogin}>
        Login Now
      </Button>
      <Spacer direction="vertical" size={60} />
      <Text fontSize="md" color="gray">
        If OTP is not received
        <Text as="button" fontSize="md" inline color="primary" style={{
            background: "transparent",
            border: "unset"
        }} onClick={forceOtpSend}>
          Send Again
        </Text>
      </Text>
    </>
  );
};

export default Step2;
