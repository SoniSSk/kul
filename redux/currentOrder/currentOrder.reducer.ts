import { SET_CURRENT_ORDER } from "./currentOrder.types";

const initState:any = null;

const currentOrderReducer = (state = initState, action: any) => {
    switch (action.type) {
        case SET_CURRENT_ORDER:
            return {
                ...action.payload
            };
        default:
            return state;
    }
};

export default currentOrderReducer;
