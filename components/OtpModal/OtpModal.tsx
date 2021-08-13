import {FC, useState} from "react";
import StyledModal from "../../styled/StyledModal";
import OtpInput from "react-otp-input";
import Spacer from "../../styled/Spacer";
import Button from "../../styled/Button";
import {loginUser, verifyOtp} from "../../redux/loggedInUser/loggedInUser.actions";
import {useDispatch} from "react-redux";
import {setLoadingState} from "../../redux/loader/loader.actions";
import {errorToast, successToast} from "../../utils/toasts";
import Text from "../../styled/Text";

interface OtpModalProps{
    handleClose: Function;
    mobile: number;
    countryCode: number;
    cb: Function;
}

const OtpModal: FC<OtpModalProps> = ({ handleClose, mobile, countryCode, cb }) => {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const verifyMobile = () => {
        dispatch(setLoadingState(true));
        dispatch(verifyOtp({
            mobile: mobile,
            otp: otp
        }, () => {
            cb();
            dispatch(setLoadingState(false));
        }));
    }

    const forceOtpSend = () => {
        try{
            dispatch(loginUser({
                "mobile": mobile,
                "countryCode": countryCode
            }, () => {
                successToast("Otp sent successfully!")
            }))
        }catch (e) {
            errorToast(e.message);
        }
    }

    return(
        <StyledModal show={true} onHide={handleClose}>
            <StyledModal.Header closeButton> Enter Otp </StyledModal.Header>
            <StyledModal.Body>
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

                <Spacer direction="vertical" size={30} />
                <Button size="md" block rounded color="white" backgroundColor="primary" onClick={verifyMobile}>
                    Verify
                </Button>

                <div className="row mt-4">
                    <Text fontSize="md"> If you didn't receive the OTP </Text>
                    <Text fontSize="md" className="ml-2" as="button" inline color="primary"  style={{
                        cursor: "pointer",
                        background: "transparent",
                        border: "unset"
                    }} onClick={forceOtpSend}>
                        Send Again
                    </Text>
                </div>
            </StyledModal.Body>
        </StyledModal>
    )
}

export default OtpModal;