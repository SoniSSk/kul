import countries from '../../constants/currencies';
import { AppDispatch } from '../store';
import { SET_CURRENCY } from './currency.types';

export const setCurrency = (country: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch({
            type: SET_CURRENCY,
            payload: countries[country || 'IN']
        });
    } catch (error) {
        console.log(error);
    }
};