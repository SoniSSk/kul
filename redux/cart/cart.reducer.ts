import { ADD_ITEMS, EMPTY_CART } from "./cart.types";
import {act} from "react-dom/test-utils";

interface CartState {
    items: Array<any>;
};

const initState:CartState = {
    items: [],
};

const cartReducer = (state = initState, action: any) => {
    switch (action.type) {
        case ADD_ITEMS:
            const itemsToAdd = action.payload.filter((item: any) => {
                return (state.items.filter((stateItem: any) => (stateItem.id === item.id)).length === 0)
            })
            return {
                ...state, items: [...state.items, ...itemsToAdd]
            };
        case EMPTY_CART:
            return {
                ...state, items: []
            };
        default:
            return state;
    }
};

export default cartReducer;
