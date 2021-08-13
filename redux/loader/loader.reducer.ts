import { SET_LOADING_STATE } from "./loader.types";

const initState: any = {
    showLoader: true
}

const loaderReducer = (state=initState, action: any) => {
    switch (action.type) {
        case SET_LOADING_STATE:
            return {
                showLoader: action.payload
            };
        default:
            return state;
    }
}

export default loaderReducer;