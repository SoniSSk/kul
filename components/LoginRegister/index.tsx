import React, {useEffect, useState} from 'react';

import Text from '../../styled/Text';
import FormInput from '../Form/Input';
import { Box, Heading, Tab, Button } from './LoginRegister.styled';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import "yup-phone";
import ReactSelect from '../ReactSelect';
import backendApi from '../../api/backendApi';
import Spacer from '../../styled/Spacer';
import SubmitButton from '../../styled/Button';
import {CREATE_USER_QUERY, LOGIN_QUERY} from '../../constants/queries/user';
import {errorToast, successToast} from '../../utils/toasts';
import countryCode from '../../constants/countryCode';
import {useDispatch} from "react-redux";
import {loginUser, signUp, verifyOtp} from "../../redux/loggedInUser/loggedInUser.actions";
import OtpInput from "react-otp-input";

const loginSchema = yup.object().shape({
  countryCode: yup.string().required(),
  mobile: yup.string().phone().test('len', (val: string | undefined) => val?.length === 10).required(),
});

const RegisterSchema = yup.object().shape({
  countryCode: yup.string().required(),
  mobile: yup.string().phone().test('len', (val: string | undefined) => val?.length === 10).required(),
  email: yup.string().email().required(),
  name: yup.string().required(),
});

const Login = () => {
  const [loginData, setLoginData] = useState<any>(null);
  const [otp, setOtp] = useState('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      countryCode: '91',
      mobile: '',
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
      try{
          if(loginData === null){
              dispatch(loginUser(data, () => {
                  setLoginData(data);
              }))
          } else{
              dispatch(verifyOtp({
                  mobile: loginData.mobile,
                  otp: otp
              }, () => {
                  const newPath = window.location.origin + "/expert/profile";
                  window.location.replace(newPath);
              }));
          }
      }catch (e) {
          errorToast(e.message);
      }

  };

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
    <form onSubmit={handleSubmit(onSubmit, (errors) => { console.log(errors); })} className="loginForm">
        {loginData ?
            <div className="d-flex flex-column">
                <div className="mb-4">
                    <Text fontSize="sm" color={"gray-500"}>
                        Enter the otp sent to your mobile number {`+${loginData.countryCode} ${loginData.mobile}`}
                    </Text>
                    <a href={"#"} onClick={() => setLoginData(null)}>
                        Change
                    </a>
                </div>
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
                <div className="mt-4 mb-2 d-flex">
                    <Text fontSize="sm" color={"gray-500"}>
                        If you didn't receive the OTP {" "}
                    </Text>
                    <a href={"#"} onClick={forceOtpSend} style={{
                        marginTop: "-3px",
                        marginLeft: "10px"
                    }}>
                        Send again
                    </a>
                </div>
        </div>: <>
            <Text fontSize="lg" color="gray">
                Login by Mobile No.
            </Text>
            <Spacer direction="vertical" size={15} />
            <div className="d-flex" style={{justifyContent: 'center'}}>
                <div style={{width: '20%'}}>
                    <Controller
                        control={control}
                        name="countryCode"
                        render={({field: {value, onChange, onBlur, ...field}}) => (
                            <ReactSelect
                                getOptionValue={(option: any) => option.value}
                                options={countryCode}
                                placeholder=""
                                onBlur={onBlur}
                                value={countryCode.find((code) => code.value === value)}
                                onChange={(value: any) => {
                                    onChange(value.value);
                                }}
                                {...field}
                                style={{height:44}}
                            />
                        )}
                    />
                </div>
                <Spacer direction="horizontal" size={10} />
                <div style={{width: '70%'}}>
                    <input
                        className="form-control"
                        placeholder="Enter valid mobile no."
                        {...register('mobile')}
                    />
                </div>
            </div>
            {errors.mobile && (
                <Text color="red" fontSize="xs">
                    Invalid mobile number
                </Text>
            )}
        </> }
      <Spacer direction="vertical" size={30} />
      <SubmitButton size="md" rounded block>
        Login
      </SubmitButton>
    </form>
  );
};

const Register = () => {
  const [registerData, setRegisterData] = useState<any>(null);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
        countryCode: '91',
        mobile: '',
        email: '',
        name: ''

    },
  });

  const onSubmit = (data: any) => {
      dispatch(signUp({
          email: data.email,
          name: data.name,
          mobile: parseFloat(data.mobile),
          countryCode: parseInt(data.countryCode),
          company: '',
          gst: '',
          type: "AGENT"
      }, () => {
          const newPath = window.location.origin + "/expert/profile";
          window.location.replace(newPath);
      }));

  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize="lg" color="gray">
        Lawyer Registration.
      </Text>
      <Spacer direction="vertical" size={15} />
      <div className="d-flex" style={{ justifyContent: 'center' }}>
        <div style={{ width: '20%' }}>
          <Controller
            control={control}
            name="countryCode"
            render={({ field: { value, onChange, onBlur, ...field } }) => (
              <ReactSelect
                getOptionValue={(option: any) => option.value}
                options={countryCode}
                placeholder=""
                onBlur={onBlur}
                value={countryCode.find((code) => code.value === value)}
                onChange={(value: any) => {
                  onChange(value.value);
                }}
                {...field}
              />
            )}
          />
        </div>
        <Spacer direction="horizontal" size={10} />
        <div style={{ width: '80%' }}>
          <input
            className="form-control"
            placeholder="Enter valid mobile no."
            {...register('mobile')}
          />
        </div>
      </div>
      {errors.mobile && (
        <Text color="red" fontSize="xs">
          Invalid mobile number
        </Text>
      )}
      <div style={{ width: '100%', margin: 'auto' }}>
        <Spacer direction="vertical" size={20} />
        <input
          className="form-control"
          placeholder="Enter you name..."
          {...register('name')}
        />
        {errors.name && (
          <Text color="red" fontSize="xs">
            Invalid Name
          </Text>
        )}
        <Spacer direction="vertical" size={20} />
        <input
          className="form-control"
          placeholder="Enter you email..."
          {...register('email')}
        />
      </div>
      {errors.email && (
        <Text color="red" fontSize="xs">
          Invalid Email Address
        </Text>
      )}
      <Spacer direction="vertical" size={30} />
      <SubmitButton size="md" rounded block>
        Register
      </SubmitButton>
    </form>
  );
};
const LoginRegister = ({register}: {register: boolean}) => {
  const [tabsState, setTabState] = useState<number>(0);
  useEffect(function (){
      if(register) setTabState(1);
  }, [register]);
  const handleTabState = (tabState: number) => {
    setTabState(tabState);
  };
  return (
    <Box>
      <Heading>
        <Text fontSize="sm" className="mb-0">
          FOR LAWYERS
        </Text>
      </Heading>
      <ul className="nav nav-tabs">
        <Tab active={tabsState === 0} onClick={() => handleTabState(0)}>
          <Button>Login here</Button>
        </Tab>
        <Tab active={tabsState === 1} onClick={() => handleTabState(1)}>
          <Button>Register Now</Button>
        </Tab>
      </ul>
      <div className="px-2 py-3 px-md-3 py-md-4">
        {tabsState === 0 ? <Login /> : <Register />}
      </div>
    </Box>
  );
};

export default LoginRegister;
