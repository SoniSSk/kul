import { SET_LOGGEDIN_USER } from "./loggedInUser.types";

const initState:any = null;

const loggedInUserReducer = (state = initState, action: any) => {
    switch (action.type) {
        case SET_LOGGEDIN_USER:
            return {
                ...action.payload
            };
        default:
            return state;
    }
};

export default loggedInUserReducer;
