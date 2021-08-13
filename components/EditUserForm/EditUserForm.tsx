import Text from '../../styled/Text';
import Spacer from '../../styled/Spacer';
import Button from '../../styled/Button';
import { FC } from 'react';
import { RootState } from '../../redux/store';
import "yup-phone";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useSelector } from 'react-redux';
import { Update_User_Profile } from '../../redux/loggedInUser/loggedInUser.actions';
import { useDispatch } from 'react-redux';
import useResponsiveDevice from '../useResponsiveDevice';
import {setLoadingState} from "../../redux/loader/loader.actions";

interface Step1Props {
    cb: Function;
}

const Step1: FC<Step1Props> = ({ cb }) => {
    const {isMobile} = useResponsiveDevice();
    const loginuser = useSelector((store: RootState) => store.loggedInUser);
    const dispatch = useDispatch();
    const signupSchesma = yup.object().shape({
        name: yup.string().required(),
        number: yup.string().phone().test('len', (val: string | undefined) => val?.length === 10).required(),
        state: yup.string().required(),
        email: yup.string().email().required(),
        city: yup.string().required(),
        gst: yup.string().nullable(),
        companyName: yup
            .string()
            .nullable()
            .when('gst', {
                is: (gst: string) => gst && gst.length > 0,
                then: yup.string().required(),
            }),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signupSchesma),
        defaultValues: {
            name: '' || loginuser.name,
            number: '' || loginuser.mobile,
            state: '' || loginuser.state,
            email: '' || loginuser.email,
            city: '' || loginuser.city,
            companyName: '' || loginuser.company,
            gst: '' || loginuser.gst,
        },
    });

    const onSubmit = (data: any) => {
        dispatch(setLoadingState(true));
        dispatch(
            Update_User_Profile(data, loginuser, () => {
                cb(data);
                dispatch(setLoadingState(false));
            })
        );
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Text fontSize="xxxl" fontFamily="montserrat" weight="bold">
                Update your profile information
            </Text>
            <Spacer direction="vertical" size={25} />
            <div className="row">
                <div className="col-12 col-md-6">
                    <Text color="label" fontSize="sm">
                        Your Name
                        <Text as="sup" fontSize="sm" color="red">
                            *
                        </Text>
                    </Text>
                    <input
                        className="form-control"
                        placeholder="Your Name"
                        {...register('name')}
                    />
                    {errors.name && (
                        <Text color="red" fontSize="xs">
                            {errors.name?.message}
                        </Text>
                    )}
                    <Spacer direction="vertical" size={20} />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <Text color="label" fontSize="sm">
                        Mobile No.
                        <Text as="sup" fontSize="sm" color="red">
                            *
                        </Text>
                    </Text>
                    <input
                        className="form-control"
                        placeholder="Your Mobile No."
                        {...register('number')}
                    />
                    {errors.number && (
                        <Text color="red" fontSize="xs">
                            {errors.number?.message}
                        </Text>
                    )}
                    <Spacer direction="vertical" size={20} />
                </div>
                <div className="col-12 col-md-6">
                    <Text color="label" fontSize="sm">
                        Email Address
                        <Text as="sup" fontSize="sm" color="red">
                            *
                        </Text>
                    </Text>
                    <input
                        className="form-control"
                        placeholder="Your Email Address"
                        {...register('email')}
                    />
                    {errors.email && (
                        <Text color="red" fontSize="xs">
                            {errors.email?.message}
                        </Text>
                    )}
                    <Spacer direction="vertical" size={20} />
                </div>
                <div className="col-12 col-md-6">
                    <Text color="label" fontSize="sm">
                        State
                        <Text as="sup" fontSize="sm" color="red">
                            *
                        </Text>
                    </Text>
                    <input
                        className="form-control"
                        placeholder="Your State"
                        {...register('state')}
                    />
                    {errors.state && (
                        <Text color="red" fontSize="xs">
                            {errors.state?.message}
                        </Text>
                    )}
                    <Spacer direction="vertical" size={20} />
                </div>
                <div className="col-12 col-md-6">
                    <Text color="label" fontSize="sm">
                        City
                        <Text as="sup" fontSize="sm" color="red">
                            *
                        </Text>
                    </Text>
                    <input
                        className="form-control"
                        placeholder="Your City"
                        {...register('city')}
                    />
                    {errors.city && (
                        <Text color="red" fontSize="xs">
                            {errors.city?.message}
                        </Text>
                    )}
                    <Spacer direction="vertical" size={20} />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <Text color="label" fontSize="sm">
                        Company Name
                    </Text>
                    <input
                        className="form-control"
                        placeholder="Your Company Name"
                        {...register('companyName')}
                        defaultValue={''}
                    />
                    {errors.companyName && (
                        <Text color="red" fontSize="xs">
                            {errors.companyName?.message}
                        </Text>
                    )}
                    <Spacer direction="vertical" size={20} />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <Text color="label" fontSize="sm">
                        GST No.
                    </Text>
                    <input
                        className="form-control"
                        placeholder="Your GST No."
                        {...register('gst')}
                        defaultValue={''}
                    />
                    {errors.gst && (
                        <Text color="red" fontSize="xs">
                            {errors.gst?.message}
                        </Text>
                    )}
                    <Spacer direction="vertical" size={20} />
                </div>
            </div>
            <Spacer direction="vertical" size={20} />

            <Button size="md" rounded block={isMobile}>
                Submit
                <img src="/icons/arrow-forward.svg" alt="Continue" width="15" />
            </Button>
        </form>
    );
};

export default Step1;
