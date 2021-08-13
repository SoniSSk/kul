import {SET_LOCATION} from "./location.types";


const initialState = {
    geolocation: null
}

export default function locationReducer(state=initialState, action: any) {
    switch (action.type){
        case SET_LOCATION:
            return {
                ...state,
                geolocation: action.payload
            };
        default:
            return state;
    }
}
