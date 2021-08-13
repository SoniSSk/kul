import {SET_LOCATION} from "./location.types";
import {AppDispatch} from "../store";

export const setLocation = (currGeolocation: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_LOCATION,
        payload: currGeolocation
    });
}