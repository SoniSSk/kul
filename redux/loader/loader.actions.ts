import { SET_LOADING_STATE } from "./loader.types";
import { AppDispatch } from "../store";

export const setLoadingState = (isLoading: boolean) => (dispatch: AppDispatch) => {
    dispatch({
        type: SET_LOADING_STATE,
        payload: isLoading
    });
}