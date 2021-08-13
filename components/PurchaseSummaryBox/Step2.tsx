import DayPickerInput from "react-day-picker/DayPickerInput";
import Text from "../../styled/Text";
import Spacer from "../../styled/Spacer";
import Button from "../../styled/Button";
import { useState, useEffect } from "react";
import UploadBox from "../UploadBox";
import { useRouter } from "next/router";
import { RootState } from "../../redux/store";
import {
  emptyCart,
  Get_Signed_Url,
  Get_Time_Slot,
  Upload_docs_Url,
} from "../../redux/cart/cart.actions";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileToS3 } from "../../utils/fileUploadUtilities";
import { errorToast } from "../../utils/toasts";
import getTimeString from "../../utils/getTimeString";
import useResponsiveDevice from "../useResponsiveDevice";
import {Form, NavLink} from "react-bootstrap";
import timeSlotParser from "../../utils/timeSlotParser";
import {setLoadingState} from "../../redux/loader/loader.actions";

let today = new Date();

const Step2 = () => {
  const { isMobile } = useResponsiveDevice();
  const dispatch = useDispatch();
  const [files, setFiles] = useState<Array<any>>([]);
  const [url, setUrl] = useState<Array<any>>([]);
  const [timeSlot, setTimeslote] = useState<any>([]);
  const [timeSlotdata, setTimeslotedata] = useState();
  const [requrmentInfo, setrequiremntInfo] = useState<string>("");
  const [getTime, setgetTime] = useState<string>("06:00:00");
  const orderData = useSelector((store: RootState) => store.currentOrders);
  const loggedInUserData = useSelector(
    (store: RootState) => store.loggedInUser
  );

  const [dates, setDates] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const router = useRouter();

  useEffect(
    function () {
      if (timeSlotdata) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    },
    [requrmentInfo, timeSlotdata]
  );

  var todayDate =
    dates !== "" ? new Date(dates).toISOString().slice(0, 10) : "";
  const CallbackData = {
    assignedUser: loggedInUserData._id,
    time_slot: timeSlotdata,
    _id: orderData.data.createOrder._id,
  };

  useEffect(() => {
    const timeString = getTimeString(dates);
    if (timeString) {
      dispatch(Get_Time_Slot(timeString, setTimeslote, setTimeslotedata));
    }
  }, [dates, getTime]);

  useEffect(
    function () {
      console.log("Time slot data is", timeSlotdata);
    },
    [timeSlotdata]
  );

  const submitForm = () => {
    uploadDataToS3();
  };

  const uploadDataToS3 = async () => {
    try {
      setButtonDisabled(true);
      dispatch(setLoadingState(true));
      const fileItems = files.map((file) => (file ? file.file : undefined));
      const promises = uploadFileToS3(fileItems, url);
      await Promise.all(promises);
      const newurl = url.map((ur) => {
        let newur = ur.split("?");
        return newur[0];
      });
      const newdata = newurl.map((el, i) => {
        return {
          document_url: newurl[i],
          document_name: files[i]?.inputName,
          _id: orderData.data.createOrder._id,
        };
      });
      console.log("Uploaded all files successfully", newdata);
      dispatch(
        Upload_docs_Url(newdata, CallbackData, requrmentInfo, () => {
          dispatch(emptyCart());
          router.push("/dashboard").then(() =>  dispatch(setLoadingState(false)));
        })
      );
    } catch (e) {
      setButtonDisabled(false);
      dispatch(setLoadingState(false));
      errorToast(e.message);
    }
  };

  return (
    <>
      <Text fontSize="xxxl" fontFamily="montserrat" weight="bold">
        Tell us about your requirement
      </Text>
      <Spacer direction="vertical" size={25} />
      <div className="row">
        <div className="col-12 col-lg-8">
          <Text color="label" fontSize="base" weight="semibold">
            Describe your requirement
          </Text>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={3}
              value={requrmentInfo}
              onChange={(e) => setrequiremntInfo(e.target.value)}
              required
              className="form-control"
              placeholder="Describe your requirement"
            />
          </Form.Group>

          {/* <textarea /> */}
          <Spacer direction="vertical" size={20} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-8">
          <UploadBox
            setFiles={setFiles}
            files={files}
            setUrl={setUrl}
            url={url}
          />
          <Spacer direction="vertical" size={20} />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-6">
          <Text color="label" fontSize="base" weight="semibold">
            Schedule call with an expert
          </Text>

          <DayPickerInput
            classNames={{
              container: "DayPickerInput d-block",
              overlayWrapper: "DayPickerInput-OverlayWrapper",
              overlay: "DayPickerInput-Overlay",
            }}
            component={(props: any) => (
              <input
                {...props}
                value={todayDate}
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
          <div
            className="mt-4"
            style={{ display: "flex", flexWrap: "wrap", width: "100%" }}
          >
            {timeSlot &&
              timeSlot.map((el: any, i: number) => {
                return (
                  <span
                    key={i}
                    style={{
                      color: timeSlotdata == el ? "white" : "black",
                      background:
                        timeSlotdata == el ? "#9ea3dc" : "hsl(0deg 0% 91%)",
                      padding: "10px 20px",
                      borderRadius: "25px",
                      margin: "7px 5px",
                      marginRight: "5px",
                      marginBottom: "7px",
                      cursor: "pointer",
                    }}
                    onClick={() => setTimeslotedata(el)}
                  >
                    {timeSlotParser(el)}
                  </span>
                );
              })}
          </div>
          <Spacer direction="vertical" size={20} />
        </div>
      </div>
      <Spacer direction="vertical" size={20} />

      <div className="row">
        <Button size="md" rounded block={isMobile}
                onClick={() => submitForm()}
                disabled={buttonDisabled}
        >
          Submit your requirement
          <img src="/icons/arrow-forward.svg" alt="Continue" width="15" />
        </Button>

        <NavLink href={"/dashboard"}>
          Skip this step
        </NavLink>
      </div>

    </>
  );
};

export default Step2;
