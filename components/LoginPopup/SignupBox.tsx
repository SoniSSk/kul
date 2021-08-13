import { FC, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import "yup-phone";
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

import Button from '../../styled/Button';
import Text from '../../styled/Text';
import Spacer from '../../styled/Spacer';
import ReactSelect from '../ReactSelect';
import {LoginLeftSideBox, LoginRightSideBox, ModalHeader} from './LoginPopup.styled';
import countryCode from '../../constants/countryCode';
import RadioBox from '../RadioBox';
import { signUp } from '../../redux/loggedInUser/loggedInUser.actions';

const signupSchema = yup.object().shape({
  type: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  countryCode: yup.string().required(),
  mobile: yup.string().phone().test('len', (val: string | undefined) => val?.length === 10).required(),
  company: yup.string().when('type', {
    is: 'Business',
    then: yup.string().required(),
    otherwise: yup.string(),
  }),
  gst: yup.string().when('type', {
    is: 'Business',
    then: yup.string().required(),
    otherwise: yup.string(),
  }),
});

interface SignupBoxProps {
  setTab: Function;
  handleClose: Function;
}

const SignupBox: FC<SignupBoxProps> = ({ setTab, handleClose }) => {
  const {
    register,
    unregister,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      name: '',
      type: 'INDIVIDUAL',
      countryCode: '91',
      email: '',
      mobile: '',
      company: '',
      gst: '',
    },
  });

  const watchedType = watch('type');

  const dispatch = useDispatch();

  useEffect(() => {
    if (watchedType === 'INDIVIDUAL') {
      unregister(['company', 'gst']);
    }
  }, [watchedType]);

  const onSubmit = (data: any) => {
    console.log(data);
    dispatch(
      signUp(data, () => {
        handleClose();
      })
    );
  };

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
            Create an Account
          </Text>
          <Text color="white" fontSize="lg">
            You can track all services at <br /> one place
          </Text>
        </LoginLeftSideBox>
      </div>
      <div className="col-12 col-md-7 p-0">
        <ModalHeader closeButton backgroundColor="white" color={"primary"}/>
        <LoginRightSideBox>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Text fontSize="lg" color="gray">
                Create an Account
              </Text>
              <Spacer direction="vertical" size={20} />
              <Text fontSize="sm" color="label">
                Your Name
              </Text>
              <input
                className="form-control"
                placeholder="Enter your Full name"
                {...register('name')}
              />
              {errors.name && (
                <Text color="red" fontSize="xs">
                  {errors.name?.message}
                </Text>
              )}
              <Spacer direction="vertical" size={20} />
              <Text fontSize="sm" color="label">
                Email Address
              </Text>
              <input
                className="form-control"
                placeholder="Enter your Email Address"
                {...register('email')}
              />
              {errors.email && (
                <Text color="red" fontSize="xs">
                  {errors.email?.message}
                </Text>
              )}
              <Spacer direction="vertical" size={20} />
              <Text fontSize="sm" color="label">
                Mobile No.
              </Text>
              <div className="d-flex">
                <div>
                  <Controller
                    control={control}
                    name="countryCode"
                    render={({
                      field: { value, onChange, onBlur, ...field },
                    }) => (
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
                <div>
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
              {watchedType === 'COMPANY' ? (
                <>
                  <Spacer direction="vertical" size={20} />
                  <Text fontSize="sm" color="label">
                    Company Name
                  </Text>
                  <input
                    className="form-control"
                    placeholder="Enter your Company Name"
                    {...register('company')}
                  />
                  {errors.company && (
                    <Text color="red" fontSize="xs">
                      {errors.company?.message}
                    </Text>
                  )}
                  <Spacer direction="vertical" size={20} />
                  <Text fontSize="sm" color="label">
                    GST Number
                  </Text>
                  <input
                    className="form-control"
                    placeholder="Companies GST number"
                    {...register('gst')}
                  />
                  {errors.gst && (
                    <Text color="red" fontSize="xs">
                      {errors.gst?.message}
                    </Text>
                  )}
                </>
              ) : null}
              <Spacer direction="vertical" size={20} />
              <Button
                size="md"
                block
                rounded
                color="white"
                backgroundColor="primary"
              >
                Create Account
              </Button>
              <Spacer direction="vertical" size={60} />
              <Text center fontSize="md" color="gray">
                Already a User?
                <Text
                  as="button"
                  fontSize="md"
                  inline
                  color="primary"
                  style={{
                    background: "transparent",
                    border: "unset"
                  }}
                  onClick={() => setTab('LOGIN')}
                >
                  Login here
                </Text>
              </Text>
            </form>
          </div>
        </LoginRightSideBox>
      </div>
    </div>
  );
};

export default SignupBox;
