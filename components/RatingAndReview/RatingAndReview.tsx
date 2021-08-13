import React, { FC, useEffect, useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { useForm, Controller } from 'react-hook-form';
import { Modal } from 'react-bootstrap';
import StyledModal from '../../styled/StyledModal';
import Text from '../../styled/Text';
import Button from '../../styled/Button';
import ReactSelect from '../ReactSelect';
import countryCode from '../../constants/countryCode';
import Spacer from '../../styled/Spacer';
import backendApi from "../../api/backendApi";
import {errorToast, successToast} from "../../utils/toasts";
import {WRITE_REVIEW} from "../../constants/queries/reviews";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {checkout, updateAndCheckout} from "../../redux/currentOrder/currentOrder.actions";

interface RatingAndReviewProps {
    setShow: any;
    slug: string;
}

interface RatingModalProps {
  show: boolean;
  setShow: any;
  slug: string;
}

const ratingSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().nullable(),
    countryCode: yup.string().nullable(),
    mobile: yup.string().nullable().test('test-mobile', (newValue: string | null | undefined): boolean => {
        if(newValue === "" || newValue === null || newValue === undefined) return true;
        const regex = new RegExp('[0-9]{10}');
        if(regex.test(newValue)){
            return true;
        }

        return false;
    }),
    feedbackData: yup.string().required()
});

const RatingAndReview: FC<RatingAndReviewProps> = ({setShow, slug}) => {
  const [rating, setRating] = useState<number>(0);

    const {  register,
        unregister,
        handleSubmit,
        control,
        watch,
        formState: { errors } } = useForm({
        resolver: yupResolver(ratingSchema),
        defaultValues: {
            countryCode: '91',
            mobile: "",
            name: '',
            feedbackData: '',
            email: ""
        },
    });
    const watchedType = watch<any>('type');
  const onStarClick = (value: number) => {
    setRating(value);
  };

  const onStarHover = (value: number) => {
    setRating(value);
  };

    const onSubmit = handleSubmit(async(data) => {
       console.log(data);
       try{
           await backendApi.post('/', {
               query: WRITE_REVIEW,
               variables: {
                   email: data.email,
                   feedback_text: data.feedbackData,
                   mobile: isNaN(parseFloat(data.mobile)) ? 0 : parseFloat(data.mobile),
                   name: data.name,
                   star_rating: rating.toString(),
                   product_slug: slug
               }
           })
           successToast('Successfully added feedback');
           setShow(false);
       }catch (e) {
           errorToast(e.message);
       }
    }, (errors) => {
        console.log(errors)
    });

  return (
    <form onSubmit={onSubmit}>
        <div className="d-flex flex-column">
            <input className="form-control" placeholder="Enter Name" {...register('name')} />
            {errors.name && (
                <Text color="red" fontSize="xs">
                    {errors.name?.message}
                </Text>
            )}
        </div>
        <Spacer direction="vertical" size={10} />

        <div className="d-flex">
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
            <div style={{ width: '80%' }} className="d-flex flex-column">
                <input
                    className="form-control"
                    placeholder="Enter valid mobile no."
                    {...register('mobile')}
                />

                {errors.mobile && (
                    <Text color="red" fontSize="xs">
                        {errors.mobile?.message}
                    </Text>
                )}

            </div>
        </div>

        <div className="d-flex flex-column mt-3">
            <input
                className="form-control"
                placeholder="Enter email"
                {...register('email')}
            />
            {errors.email && (
                <Text color="red" fontSize="xs">
                    {errors.email?.message}
                </Text>
            )}
        </div>
        <div className=" mt-3">
        <Text fontSize="md" as="label" color="label" weight="semibold">
          Rate your Experience
        </Text>
        <div className="d-block" style={{ fontSize: '2rem' }}>
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={rating}
            starColor="#396AE8"
            emptyStarColor="gray"
            onStarClick={onStarClick}
            onStarHoverOut={onStarHover}
          />
        </div>
        </div>
      <Text
        fontSize="md"
        as="label"
        color="label"
        weight="semibold"
        className="mt-3"
      >
        Give Feedback
      </Text>
        <div className="d-flex flex-column">
            <textarea
                className="form-control mb-4"
                {...register('feedbackData')}
            />
            {errors.feedbackData && (
                <Text color="red" fontSize="xs">
                    {errors.feedbackData?.message}
                </Text>
            )}
        </div>

      <Button
        size={'md'}
        backgroundColor={'primary'}
        rounded>
        Submit Review
      </Button>
    </form>
  );
};

const RatingModal: FC<RatingModalProps> = ({ show, setShow, slug }) => {

  return (
    <StyledModal as={Modal} show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Text fontSize="xxl" fontFamily="montserrat" weight="bold">
          Submit your feedback
        </Text>
      </Modal.Header>

      <Modal.Body>
        <RatingAndReview setShow={setShow} slug={slug}/>
      </Modal.Body>
    </StyledModal>
  );
};

export { RatingAndReview, RatingModal };
