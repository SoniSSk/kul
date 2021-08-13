import { FC, useState } from 'react';
import { Form, Modal, ModalProps } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';
import "yup-phone";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import Text from '../../styled/Text';
import Button from '../../styled/Button';
import Spacer from '../../styled/Spacer';
import StyledModal from '../../styled/StyledModal';
import backendApi from '../../api/backendApi';
import { CREATE_LEAD_QUERY } from '../../constants/queries/leads';
import { errorToast, successToast } from '../../utils/toasts';
import RadioBox from '../RadioBox';
import {useDispatch} from "react-redux";
import {signUp} from "../../redux/loggedInUser/loggedInUser.actions";

interface TellUsFormData {
  fullName: string;
  email: string;
  countryCode: string;
  mobile: string;
  concernedArea: string;
  requirement: string;
  concernedAreaRadio: String;
}

const tellUsFormSchema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  countryCode: yup.string().required(),
  concernedArea: yup.string().required(),
  requirement: yup.string().required(),
  concernedAreaRadio: yup.string().required(),
  mobile: yup.string().phone().test('len', (val: string | undefined) => val?.length === 10).required(),
});
const legalConsultationOptions = [
  'Divorce & Child Custody',
  'Family & Matrimonial',
  'Property',
  'Will',
  'Criminal',
  'Consumer Protection',
  'Cheque Bounce',
  'Cyber Crime',
  'Labour & Employment',
  'Legal Notice',
  'Other Legal Problems',
];
const legalDocumentsOptions = [
  'Business Contracts',
  'HR & Labour Compliance',
  'Website & Digital Policies',
  'Startup',
  'Legal Notice',
  'Money Recovery',
  'Property & Real Estate',
];
const businessRegistrationOptions = [
  'Company Incorporation',
  'Trademark & Copyrights',
  'Registration & Licenses',
  'ROC Compliance',
  'Tax Compliance',
  'Accounting & Compliance',
];

const TellUsPopup: FC<ModalProps> = (props) => {
  const [concernedAreaActiveOptions, setConcernedAreaActiveOptions] = useState(
    legalConsultationOptions
  );

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<TellUsFormData>({
    resolver: yupResolver(tellUsFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      countryCode: '+91',
      mobile: '',
      concernedArea: '',
      requirement: '',
      concernedAreaRadio: 'Legal Consultation',
    },
  });
  const radioValue = watch('concernedAreaRadio');

  useEffect(() => {
    switch (radioValue) {
      case 'Legal Consultation':
        setConcernedAreaActiveOptions(legalConsultationOptions);
        break;
      case 'Legal Documents':
        setConcernedAreaActiveOptions(legalDocumentsOptions);
        break;
      case 'Business Registration':
        setConcernedAreaActiveOptions(businessRegistrationOptions);
        break;
      default:
        break;
    }
  }, [radioValue]);
  const onSubmit = async (data: any) => {
    try {
      await backendApi.post('/', {
        query: CREATE_LEAD_QUERY,
        variables: {
          address: data.address ? data.address : '',
          concerned_area: data.concernedArea,
          country_code: parseInt(data.countryCode),
          mobile: parseFloat(data.mobile),
          name: data.fullName,
          requirement: data.requirement,
        },
      });

      dispatch(signUp({
        email: data.email,
        name: data.fullName,
        mobile: parseFloat(data.mobile),
        countryCode: parseInt(data.countryCode),
        type: "INDIVIDUAL"
      }, () => {
        successToast(
            'Thank you for your interest. Our team will get back to you soon.'
        );
        props.onHide();
      }));

    } catch (e) {
      errorToast(e.message);
    }
  };

  return (
    <StyledModal {...props}>
      <Modal.Body>
        <button className="close-icon" onClick={props.onHide}>
          <img src="/icons/close.svg" width="22" alt="close" />
        </button>
        <Text fontSize="xxl" fontFamily="montserrat" weight="bold">
          Tell us about your requirement
        </Text>
        <Spacer direction="vertical" size={12} />
        <div className="row">
          <div className="col-15 col-md-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Text as="label" fontSize="sm" color="label">
                Your Name
              </Text>
              <Spacer direction="vertical" size={3} />
              <input
                {...register('fullName')}
                className="form-control"
                placeholder="Enter your Full name"
              />
              {errors.fullName && (
                <Text color="red" fontSize="xs">
                  {errors.fullName?.message}
                </Text>
              )}
              <Spacer direction="vertical" size={15} />

              <Text as="label" fontSize="sm" color="label">
                Email Address
              </Text>
              <Spacer direction="vertical" size={3} />
              <input
                {...register('email')}
                className="form-control"
                placeholder="Enter your Email Address"
              />
              {errors.email && (
                <Text color="red" fontSize="xs">
                  {errors.email?.message}
                </Text>
              )}
              <Spacer direction="vertical" size={15} />

              <Text as="label" fontSize="sm" color="label">
                Mobile No.
              </Text>
              <Spacer direction="vertical" size={3} />
              <div className="d-flex">
                <select className="form-control" {...register('countryCode')} style={{width: 80}}>
                  <option>+91</option>
                </select>
                <Spacer size={15} direction="horizontal" />
                <input
                  {...register('mobile', { maxLength: 10 })}
                  className="form-control"
                  placeholder="Enter your Mobile No."
                />
              </div>
              {errors.mobile && (
                <Text color="red" fontSize="xs">
                  Invalid mobile number
                </Text>
              )}
              <Spacer direction="vertical" size={15} />

              <Text as="label" fontSize="sm" color="label">
                Choose Concerned Area
              </Text>
              <div className="row">
                <div className="col">
                  <RadioBox
                    value="Legal Consultation"
                    {...register('concernedAreaRadio')}
                  >
                    <Text>Legal Consultation</Text>
                  </RadioBox>
                  <Spacer direction="horizontal" size={15} />
                  <RadioBox
                    value="Legal Documents"
                    {...register('concernedAreaRadio')}
                  >
                    <Text>Legal Documents</Text>
                  </RadioBox>
                  <Spacer direction="horizontal" size={15} />
                  <RadioBox
                    value="Business Registration"
                    {...register('concernedAreaRadio')}
                  >
                    <Text>Business Registration</Text>
                  </RadioBox>
                </div>
              </div>
              <Spacer direction="vertical" size={3} />
              <select {...register('concernedArea')} className="form-control">
                <option value="" disabled>
                  Select {radioValue}
                </option>
                {concernedAreaActiveOptions.map((option, index) => (
                  <option value={option} key={index}>
                    {option}
                  </option>
                ))}
              </select>
              <Spacer direction="vertical" size={15} />
              <Text as="label" fontSize="sm" color="label">
                Let us know your requirement
              </Text>
              <Spacer direction="vertical" size={3} />
              <textarea
                {...register('requirement')}
                className="form-control"
                placeholder="Describe your requirement"
              />
              {errors.requirement && (
                <Text color="red" fontSize="xs">
                  {errors.requirement?.message}
                </Text>
              )}
              <Spacer direction="vertical" size={15} />

              <Button size="md" rounded>
                Submit your requirement
              </Button>
            </form>
          </div>
        </div>
      </Modal.Body>
    </StyledModal>
  );
};

export default TellUsPopup;
