import { combineReducers } from 'redux';

import cartReducer from './cart/cart.reducer';
import currencyReducer from './currency/currency.reducer';
import taxReducer from './tax/tax.reducer';
import loggedInUserReducer from './loggedInUser/loggedInUser.reducer';
import currentOrderReducer from './currentOrder/currentOrder.reducer';
import locationReducer from "./location/location.reducer";
import loaderReducer from "./loader/loader.reducer";

const rootReducer = combineReducers({
    cart: cartReducer,
    tax: taxReducer,
    currency: currencyReducer,
    loggedInUser: loggedInUserReducer,
    currentOrders: currentOrderReducer,
    location: locationReducer,
    loader: loaderReducer
});

export default rootReducer;
