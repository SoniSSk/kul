import { SET_CURRENCY } from "./currency.types";

interface CurrencyState {
    symbol: string;
    currency: string;
}

const initState: CurrencyState | null = null;

const currencyReducer = (state = initState, action: any) => {
    switch (action.type) {
        case SET_CURRENCY:
            return {
                ...action.payload
            };
        default:
            return state;
    }
};

export default currencyReducer;
