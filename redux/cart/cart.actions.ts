import Router from 'next/router';
import { AppDispatch } from '../store';
import backendApi from '../../api/backendApi';
import { ADD_ITEMS, EMPTY_CART } from "./cart.types";
import {Get_Signed_URL,Get_Time_Slotes,Uploard_Document_Url,SheduleForCall,requirmentInfo} from '../../constants/queries/order'
import { errorToast } from '../../utils/toasts';
import {setLoadingState} from "../loader/loader.actions";
export const addItems = (data: any) => (dispatch: AppDispatch) => {
    dispatch({
        type: ADD_ITEMS,
        payload: data
    });

    Router.push('/checkout');
};

export const Get_Signed_Url = (data: any,state: any,url: any,cb: Function) => async (dispatch: AppDispatch) => {
    try {
        const getUrl = await backendApi.post('/', {
            query: Get_Signed_URL,
            variables: {
                docType: data
            }
        });
        if (getUrl.data.errors?.length) throw new Error(getUrl.data.errors[0].message);
        state([...url,getUrl.data.data.getSignedUrl.url])
         cb()
    } catch (error) {
        errorToast(error.message);
    }
}
export const Get_Time_Slot = (time: any, setTimeslote:any, setTimeslotedata: any) => async (dispatch: AppDispatch) => {
    try {
        const getTime = await backendApi.post('/', {
            query: Get_Time_Slotes,
            variables: {
                time: time
            }
        });
        if (getTime.data.errors?.length) {
            setTimeslote([])
            setTimeslotedata(undefined);
            throw new Error(getTime.data.errors[0].message);
        }
        setTimeslotedata(undefined);
        setTimeslote(getTime.data.data.getTimeSlot)
    } catch (error) {
        errorToast(error.message);
    }
}

export const Upload_docs_Url = (url:any,callBackSlote:any,requrmentInfo:String,cb:Function) => async (dispatch: AppDispatch) => {
    try {
        const promises = url.map((documentData: any) => {
            return backendApi.post('/', {
                query: Uploard_Document_Url,
                variables: {
                    document_name: documentData.document_name,
                    document_url: documentData.document_url,
                    _id: documentData._id
                }
            });
        });

        try {
            const resolvedPromises = await Promise.all(promises);
            resolvedPromises.forEach((promiseResponse: any) => {
                console.log("Response from promise", promiseResponse);
                if(promiseResponse.data.errors?.length) throw new Error(promiseResponse.data.errors[0].message);
            })


            await backendApi.post('/', {
                query: requirmentInfo,
                variables: {
                    _id: callBackSlote._id,
                    requirmentInfo: requrmentInfo
                }
            });
            await backendApi.post('/', {
                query: SheduleForCall,
                variables: {
                    _id: callBackSlote._id,
                    assignedUser: callBackSlote.assignedUser,
                    time_slot: callBackSlote.time_slot
                }
            });
            cb()
        }catch (e) {
            dispatch(setLoadingState(false));
            throw new Error(e);
        }
        // if (requestCallBack.data.errors?.length) throw new Error(requestCallBack.data.errors[0].message);

    } catch (error) {
        dispatch(setLoadingState(false));
        errorToast(error.message);
    }
}

export const scheduleACall = async(callBackSlot: any) => {
    await backendApi.post('/', {
        query: SheduleForCall,
        variables: {
            _id: callBackSlot._id,
            assignedUser: callBackSlot.assignedUser,
            time_slot: callBackSlot.time_slot
        }
    });
}

export const emptyCart = () => (dispatch: AppDispatch) => {
    dispatch({
        type: EMPTY_CART
    });
};