import React, { FC, useEffect, useState } from 'react';
import { LoginModal, ModalBody } from '../dashboardTabs/DashboardPopup.styled';
import Text from '../../styled/Text';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { Col } from 'react-bootstrap';
import Link from 'next/link';
import Button from '../../styled/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Get_Time_Slot, scheduleACall } from '../../redux/cart/cart.actions';
import { errorToast } from '../../utils/toasts';
import getTimeString from '../../utils/getTimeString';
import { useDispatch } from 'react-redux';
import timeSlotParser from "../../utils/timeSlotParser";

interface ScheduleCallProps {
  setIsOpen: any;
}

const ScheduleCall: FC<ScheduleCallProps> = ({ setIsOpen }) => {
  const [timeSlot, setTimeslote] = useState([]);
  const [timeSlotdata, setTimeslotedata] = useState();
  const [dates, setDates] = useState('');

  const dispatch = useDispatch();

  const today = new Date();

  const orderData = useSelector((store: RootState) => store.currentOrders);
  const loggedInUserData = useSelector(
    (store: RootState) => store.loggedInUser
  );

  useEffect(() => {
    const timeString = getTimeString(dates);
    if (timeString)
      dispatch(Get_Time_Slot(timeString, setTimeslote, setTimeslotedata));
  }, [dates]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const CallbackData = {
        assignedUser: loggedInUserData._id,
        time_slot: timeSlotdata,
        _id: orderData.data.createOrder._id,
      };
      await scheduleACall(CallbackData);
    } catch (e) {
      errorToast(e.message);
    }
    handleClose();
  };

  return (
    <LoginModal show={true} onHide={handleClose} centered size="xl">
      <LoginModal.Header closeButton />
      <ModalBody>
        <div className="row">
          <div className="col-12 col-md-6">
            <Text color="black" fontSize="xxl" weight="bold">
              Schedule a Call
            </Text>
            <DayPickerInput
              classNames={{
                container: 'DayPickerInput d-block',
                overlayWrapper: 'DayPickerInput-OverlayWrapper',
                overlay: 'DayPickerInput-Overlay',
              }}
              component={(props: any) => (
                <input
                  {...props}
                  value={
                    dates !== ''
                      ? new Date(dates).toISOString().slice(0, 10)
                      : ''
                  }
                  placeholder="YYYY-MM-DD"
                  className="form-control"
                />
              )}
              dayPickerProps={{ disabledDays: { before: today } }}
              format="YYYY-MM-DD"
              onDayChange={(day: any) => {
                setDates(day);
              }}
            />
            <div className="mt-4" style={{ display: 'flex', flexWrap: 'wrap' }}>
              {timeSlot.map((el: any, i: number) => {
                console.log("Element is", el);
                return (
                  <span
                    key={i}
                    style={{
                      color: timeSlotdata == el ? 'white' : 'black',
                      background:
                        timeSlotdata == el ? '#9ea3dc' : 'hsl(0deg 0% 91%)',
                      padding: '10px',
                      borderRadius: '25px',
                      margin: '7px 5px',
                      marginRight: '5px',
                      marginBottom: '7px',
                      cursor: 'pointer',
                    }}
                    onClick={() => setTimeslotedata(el)}
                  >
                    {timeSlotParser(el)}
                  </span>
                );
              })}
            </div>
            <Col md={12} className="mt-5">
              <Link href="#">
                <a>
                  <Button
                    size="lg"
                    rounded
                    className="arrow_btn mr-2"
                    onClick={handleSubmit}
                  >
                    Schedule a Call
                  </Button>
                </a>
              </Link>
            </Col>
          </div>
        </div>
      </ModalBody>
    </LoginModal>
  );
};

export default ScheduleCall;
