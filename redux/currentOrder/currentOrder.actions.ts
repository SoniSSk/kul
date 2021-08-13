import backendApi from '../../api/backendApi';
import {CREATE_ORDER_QUERY, REMOVE_DOCUMENT, UPDATE_PAYMENT_STATUS} from '../../constants/queries/order';
import {CREATE_USER_QUERY, Update_USER_Mutation} from '../../constants/queries/user';
import { errorToast } from '../../utils/toasts';
import { setLoggedInUser } from '../loggedInUser/loggedInUser.actions';
import { AppDispatch } from '../store';
import { SET_CURRENT_ORDER } from './currentOrder.types';
import loggedInUserReducer from "../loggedInUser/loggedInUser.reducer";
import {bool} from "yup";
import {setLoadingState} from "../loader/loader.actions";
import App from "next/app";
import {get} from "react-hook-form";
import {getPrices, getSavings} from "../../utils/pricesAndSavingsCalculator";

export const setOrder = (data: any) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_CURRENT_ORDER,
        payload: data
    });
};

export const checkoutOrderCreate = async (userRes: any, cart: any, tax:any) => {
    console.log("Requested order creation", cart);
    const prices = getPrices(cart);
    const savings = getSavings(prices);

    const orderRes = await backendApi.post('/', {
        query: CREATE_ORDER_QUERY,
        variables: {
            user: userRes._id,
            category_id: cart[0].category.id,
            total_amount: prices.totalPrice,
            tax: prices.taxTotal,
            subtotal: prices.totalSalePrice,
            discount: savings.totalSaving,
            currency: "INR",
            products: cart.map((el:any) => {
                return {
                    product_id: el.id,
                    product_name: el.name,
                    assigned_user: userRes._id,
                    amount: parseFloat(el.salePrice),
                }
            })
        }
    });
    console.log(orderRes);
    return orderRes;
}

export const checkout = (user: any, cart:any,tax:any, cb: Function) => async (dispatch: AppDispatch) => {
    try {
        const userRes = await backendApi.post('/', {
            query: CREATE_USER_QUERY,
            variables: {
                email: user.email,
                name: user.name,
                mobile: parseFloat(user.mobile),
                countryCode: parseInt(user.countryCode),
                type: user.type
            }
        });
        if (userRes.data.errors?.length) throw new Error(userRes.data.errors[0].message);
        dispatch(setLoggedInUser(userRes.data.data.createUser));
        // const orderRes = await checkoutOrderCreate(userRes.data.data.createUser, cart, tax);
        // dispatch(setOrder(orderRes.data));
        cb();
    } catch (error) {
        errorToast(error.message);
        dispatch(setLoadingState(false));
        console.log(error)
    }
};


export const updateAndCheckout = (user: any, loggedInUserData: any, cart:any,tax:any, cb: Function) => async (dispatch: AppDispatch) => {
    try {
        console.log("User data", loggedInUserData);
        const userRes = await backendApi.post('/', {
            query: Update_USER_Mutation,
            variables: {
                _id: loggedInUserData._id,
                country_code: user.countryCode? parseInt(user.countryCode) : loggedInUserData.country_code,
                email: user.email,
                mobile: parseFloat(user.mobile),
                name: user.name,
                type: user.type,
                gst: loggedInUserData.gst ? loggedInUserData.gst : "",
                company: loggedInUserData.companyName ? loggedInUserData.companyName : "",
                city: loggedInUserData.city ? loggedInUserData.city : "",
                state: loggedInUserData.state ? loggedInUserData.state : ""
            }
        });
        if (userRes.data.errors?.length) throw new Error(userRes.data.errors[0].message);
        console.log("User res is", userRes);
        dispatch(setLoggedInUser(userRes.data.data.updateUser));
        // const orderRes = await checkoutOrderCreate(userRes.data.data.updateUser, cart, tax);
        // dispatch(setOrder(orderRes.data));
        cb();
    } catch (error) {
        dispatch(setLoadingState(false));
        errorToast(error.message);
        console.log(error)
    }
};

export const createNewOrder = (user: any, cart: any, tax: any, cb: any) => async (dispatch: AppDispatch) => {
    try{
        const orderRes = await checkoutOrderCreate(user, cart, tax);
        dispatch(setOrder(orderRes.data));
        cb();
    }catch (e) {
        dispatch(setLoadingState(false));
        errorToast(e.message);
    }


}

export const updateOrderPaymentStatus = (paymentData: any, cb: Function) => async (dispatch: AppDispatch) => {
    try{
        const res = await backendApi.post('/', {
            query: UPDATE_PAYMENT_STATUS,
            variables: {
                order_id: paymentData.order_id,
                payment_status: paymentData.payment_status,
                paytm_order_id: paymentData.paytm_order_id ? paymentData.paytm_order_id : null,
                paytm_transaction_token: paymentData.paytm_transaction_token ? paymentData. paytm_transaction_token : null,
                razorpay_order_id: paymentData.razorpay_order_id ? paymentData.razorpay_order_id : null,
                razorpay_payment_id: paymentData.razorpay_payment_id ? paymentData.razorpay_payment_id : null,
                razorpay_signature: paymentData.razorpay_signature ? paymentData.razorpay_signature : null
            }
        });

        if(res.data.errors?.length){
            throw new Error(res.data.errors[0].message);
        } else{
            console.log(res.data);
            cb();
        }
    }catch (e) {
        dispatch(setLoadingState(false));
        errorToast(e.message);
    }
}

export const removeDocuments = async (documentData: Array<any>) => {
    try {
        const responses = documentData.map((item: any) => {
            return backendApi.post("/", {
                query: REMOVE_DOCUMENT,
                variables: {
                    id: item.id,
                    order_id: item.orderId
                }
            });
        });

        await Promise.all(responses);
    }catch (e) {
        errorToast(e.message);
    }
}