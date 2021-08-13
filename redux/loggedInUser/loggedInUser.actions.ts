import backendApi from '../../api/backendApi';
import {CREATE_USER_QUERY, LOGIN_QUERY, OTP_VERIFY_QUERY, Update_USER_Mutation} from '../../constants/queries/user';
import { errorToast } from '../../utils/toasts';
import { AppDispatch } from '../store';
import { SET_LOGGEDIN_USER } from './loggedInUser.types';
import {setLoadingState} from "../loader/loader.actions";

export const setLoggedInUser = (data: any) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_LOGGEDIN_USER,
        payload: data
    });
};

export const signUp = (user: any, cb: Function) => async (dispatch: AppDispatch) => {
    try {
        const userRes = await backendApi.post('/', {
            query: CREATE_USER_QUERY,
            variables: {
                email: user.email,
                name: user.name,
                mobile: parseFloat(user.mobile),
                countryCode: parseInt(user.countryCode),
                type: user.type
                // company: user.'company,'
                // gst: user.gst
            }
        });
        if (userRes.data.errors?.length) throw new Error(userRes.data.errors[0].message);
        console.log(userRes)
        localStorage.setItem("ezyLegalUserData", JSON.stringify(userRes.data.data.createUser));
        dispatch(setLoggedInUser(userRes.data.data.createUser));
        cb();
    } catch (error) {
        errorToast(error.message);
    }
}
export const Update_User_Profile = (user: any,logingUserData:any, cb: Function) => async (dispatch: AppDispatch) => {
    try {
        const userRes = await backendApi.post('/', {
            query: Update_USER_Mutation,
            variables: {
                _id: logingUserData._id,
                city: user.city,
                company: (user.companyName !== null ? user.companyName : ""),
                country_code: logingUserData.country_code,
                email: user.email,
                gst: (user.gst !== null ? user.gst : ""),
                mobile: parseFloat(user.number),
                name: user.name,
                state: user.state,
            }
        });
        if (userRes.data.errors?.length) throw new Error(userRes.data.errors[0].message);
        console.log("Updated user data", userRes.data.data.updateUser);
        localStorage.setItem("ezyLegalUserData", JSON.stringify(userRes.data.data.updateUser));
        dispatch(setLoggedInUser(userRes.data.data.updateUser));
        cb();
    } catch (error) {
        dispatch(setLoadingState(false));
        errorToast(error.message);
    }
}

export const loginUser = (data: any, cb: any) => async (dispatch: AppDispatch) => {
    try {
        const userRes = await backendApi.post('/', {
            query: LOGIN_QUERY,
            variables: {
                mobile: parseFloat(data.mobile), 
                countryCode: parseInt(data.countryCode)
            }
        });
        if(userRes.data.errors?.length) throw new Error(userRes.data.errors[0].message);
        cb();
    } catch (error) {
        errorToast(error.message);
    }
}

export const verifyOtp = (data: any, cb: Function) => async (dispatch: AppDispatch) => {
    try{
        const userRes = await backendApi.post('/', {
            query: OTP_VERIFY_QUERY,
            variables: {
                mobile: parseFloat(data.mobile),
                otp: parseFloat(data.otp)
            }
        });
        if (userRes.data.errors?.length) throw new Error(userRes.data.errors[0].message);
        console.log("Otp Data is", userRes);
        localStorage.setItem("ezyLegalUserData", JSON.stringify(userRes.data.data.verifyOtp));
        dispatch(setLoggedInUser(userRes.data.data.verifyOtp));
        cb();
    }catch (e) {
        dispatch(setLoadingState(false));
        errorToast(e.message);
    }
}
