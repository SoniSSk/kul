import {FC, useEffect, useState} from 'react';

import LoginBox from './LoginBox';
import SignupBox from './SignupBox';
import { LoginModal, ModalBody, ModalHeader } from './LoginPopup.styled';

interface LoginModalProps{
    show: boolean;
    handleClose: any;
    tabValue: string;
    setTab: any;
    mobileView? : boolean;
}

const LoginPopup: FC<LoginModalProps> = ({ show, handleClose, tabValue, setTab, mobileView}) => {

    return (
        <LoginModal show={show} onHide={handleClose} centered size="xl">
            {mobileView ? <ModalHeader color="primary" closeButton/> : null}
            <ModalBody>
                { tabValue === "LOGIN" ? <LoginBox setTab={setTab} handleClose={handleClose}/> : <SignupBox setTab={setTab} handleClose={handleClose}/>}
            </ModalBody>
        </LoginModal>
    );
};

export default LoginPopup;