import Tax from "../../dtos/Tax.dto";
import { SET_TAXES } from "./tax.types";

const initState:Tax | null = null;

const taxReducer = (state = initState, action: any) => {
    switch (action.type) {
        case SET_TAXES:
            return {
                ...action.payload
            };
        default:
            return state;
    }
};

export default taxReducer;
