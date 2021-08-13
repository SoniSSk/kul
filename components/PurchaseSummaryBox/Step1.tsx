import Text from '../../styled/Text';
import Spacer from '../../styled/Spacer';
import Button from '../../styled/Button';
import {FC, useState} from 'react';
import { RootState } from '../../redux/store';

import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useSelector } from 'react-redux';
import {loginUser, Update_User_Profile} from '../../redux/loggedInUser/loggedInUser.actions';
import { useDispatch } from 'react-redux';
import OtpModal from "../OtpModal/OtpModal";
import useResponsiveDevice from '../useResponsiveDevice';
import EditUserForm from "../EditUserForm/EditUserForm";

interface Step1Props {
  setTab: Function;
}

const Step1: FC<Step1Props> = ({ setTab }) => {

  const [showModal, setShowModal] = useState(false);
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser);
  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    if (loggedInUser.status === "VERIFIED") {
      setTab('STEP2');
    } else {
      dispatch(loginUser({
        mobile: data.number,
        countryCode: loggedInUser.country_code
      }, () => {
        setShowModal(true);
      }))
    }
  }
  return (
    <div>
      {showModal ? <OtpModal handleClose={() => setShowModal(false)} mobile={loggedInUser.mobile} cb={() => {
        setTab("STEP2");
      }} countryCode={loggedInUser.country_code}/> : null}
      <EditUserForm cb={onSubmit} />
    </div>
  );
};

export default Step1;
