import { FC } from 'react';
import { CheckoutFormData } from '../CheckoutBox';
import * as yup from 'yup';
import "yup-phone";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Spacer from '../../styled/Spacer';
import Text from '../../styled/Text';
import RadioBox from '../RadioBox';
import Button from '../../styled/Button';
import {
  checkout,
  updateAndCheckout,
} from '../../redux/currentOrder/currentOrder.actions';
import { useDispatch } from 'react-redux';
import {setLoadingState} from "../../redux/loader/loader.actions";

const besicDetailSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  countryCode: yup.string().required(),
  type: yup.string().required(),
  mobile: yup.string().phone().test('len', (val: string | undefined) => val?.length === 10).required(),
});

interface CheckoutFormProps {
  formData: CheckoutFormData | null;
  isUpdateRequested: boolean;
  setFormData: any;
  setActiveKey: any;
  loggedInUser: any;
  cart: any;
  tax: any;
  setIsUpdateRequested: any;
}

const CheckoutForm: FC<CheckoutFormProps> = ({
  formData,
  isUpdateRequested,
  setFormData,
  setActiveKey,
  loggedInUser,
  cart,
  tax,
  setIsUpdateRequested,
}) => {
  let {
    register,
    unregister,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(besicDetailSchema),
    defaultValues: {
      type: formData ? formData.type : 'INDIVIDUAL',
      name: formData?.name,
      email: formData?.email,
      countryCode: formData?.countryCode,
      mobile: formData?.mobile,
    },
  });
  const watchedType = watch<any>('type');
  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    dispatch(setLoadingState(true));
    if (isUpdateRequested) {
      console.log('Update requested', data);
      dispatch(
        updateAndCheckout(data, loggedInUser, cart, tax, () => {
          // setFormData(data);
          setIsUpdateRequested(false);
          dispatch(setLoadingState(false));
        })
      );
    } else {
      dispatch(
        checkout(data, cart, tax, () => {
          // setFormData(data);
          dispatch(setLoadingState(false));
        })
      );
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="row align-items-center">
        <div className="col-12 col-md-4" style={{
          display: "none"
        }}>
          <Spacer size={25} direction="vertical" />
          <Text fontSize="sm" as="label" color="label">
            You are
          </Text>
        </div>
        <div className="col-12 col-md-8" style={{display: "none"}}>
          <Controller
            control={control}
            name="type"
            render={({ field: { value, ref, onChange } }) => {
              return (
                <>
                  <RadioBox
                    checked={'INDIVIDUAL' === value}
                    value="INDIVIDUAL"
                    name="type"
                    style={{
                      display: "none"
                    }}
                    defaultChecked
                    onChange={(e) =>
                      e.target.checked && onChange(e.target.value)
                    }
                    ref={ref}
                  >
                    <Text>Individual</Text>
                  </RadioBox>
                  <Spacer direction="horizontal" size={15} />
                  <RadioBox
                    checked={'COMPANY' === value}
                    value="COMPANY"
                    name="type"
                    onChange={(e) =>
                      e.target.checked && onChange(e.target.value)
                    }
                    ref={ref}
                  >
                    <Text>Business</Text>
                  </RadioBox>
                </>
              );
            }}
          />
        </div>
        <div className="col-12 col-md-4">
          <Spacer size={25} direction="vertical" />
          <Text fontSize="sm" as="label" color="label">
            Your Name
          </Text>
        </div>
        <div className="col-12 col-md-8">
          <input className="form-control" {...register('name')} />
          {errors.name && (
            <Text color="red" fontSize="xs">
              {errors.name?.message}
            </Text>
          )}
        </div>
      </div>
      <Spacer size={25} direction="vertical" />
      <div className="row align-items-center">
        <div className="col-12 col-md-4">
          <Text fontSize="sm" as="label" color="label">
            Email Address
          </Text>
        </div>
        <div className="col-12 col-md-8">
          <input className="form-control" {...register('email')} />
          {errors.email && (
            <Text color="red" fontSize="xs">
              {errors.email?.message}
            </Text>
          )}
        </div>
      </div>
      <Spacer size={25} direction="vertical" />
      <div className="row align-items-center">
        <div className="col-12 col-md-4">
          <Text fontSize="sm" as="label" color="label">
            Mobile No.
          </Text>
        </div>
        <div className="col-12 col-md-8">
          <div className="d-flex">
            <select className="form-control" {...register('countryCode')}>
              <option value="91">+91</option>
            </select>
            <Spacer size={15} direction="horizontal" />
            <input
              className="form-control"
              {...register('mobile', { maxLength: 10 })}
            />
          </div>
          {errors.mobile && (
            <Text color="red" fontSize="xs">
              Invalid mobile number
            </Text>
          )}
        </div>
      </div>
      <Spacer size={25} direction="vertical" />
      <div className="row">
        <div className="col-12 col-md-4"></div>
        <div className="col-12 col-md-8">
          <Button size="md" rounded>
            Continue
            <img src="/icons/arrow-forward.svg" alt="Continue" width="15" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
