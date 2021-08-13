import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import "yup-phone";

import Button from '../../../styled/Button';
import Text from '../../../styled/Text';
import Spacer from '../../../styled/Spacer';
import ReactSelect from '../../ReactSelect';
import countryCode from '../../../constants/countryCode';
import backendApi from '../../../api/backendApi';
import { LOGIN_QUERY } from '../../../constants/queries/user';
import { errorToast } from '../../../utils/toasts';

interface Step1Props {
  setTab: Function;
  setLoginData: Function;
}

const loginSchema = yup.object().shape({
  countryCode: yup.string().required(),
  mobile: yup.string().phone().test('len', (val: string | undefined) => val?.length === 10).required(),
});

const Step1: FC<Step1Props> = ({ setTab, setLoginData }) => {
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

  const onSubmit = (data: any) => {
    backendApi
      .post('/', {
        query: LOGIN_QUERY,
        variables: {
          mobile: parseFloat(data.mobile),
          countryCode: parseInt(data.countryCode),
        },
      })
      .then((res) => {
        if (res.data.data) {
          setLoginData(getValues());
        } else if (res.data.errors.length) {
          throw new Error(res.data.errors[0].message);
        }
      })
      .catch((error) => {
        errorToast(error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text fontSize="lg" color="gray">
        Login by Mobile No.
      </Text>
      <Spacer direction="vertical" size={15} />
      <div className="d-flex">
        <div>
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
      <Spacer direction="vertical" size={30} />
      <Button size="md" block rounded color="white" backgroundColor="primary">
        Login
      </Button>
      <Spacer direction="vertical" size={60} />
      <Text center fontSize="md" color="gray">
        New to EzyLegal?
        <Text
          as="button"
          fontSize="md"
          inline
          color="primary"
          style={{
              background: "transparent",
              border: "unset"
          }}
          onClick={() => setTab('SIGNUP')}
        >
          Create an Account
        </Text>
      </Text>
    </form>
  );
};

export default Step1;
