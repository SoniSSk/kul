import api from '../../api';
import { TAX_QUERY } from '../../constants/graphql';
import Tax from '../../dtos/Tax.dto';
import { AppDispatch } from '../store';
import { SET_TAXES } from './tax.types';

export const getTaxes = (locale: string) => async (dispatch: AppDispatch) => {
    try {
        const res = await api.post('/', {
            query: TAX_QUERY
        });

        const tax: Tax = res.data.data.taxRates.nodes.find((tax: Tax) => String(tax.country).toLowerCase() === locale);

        dispatch({
            type: SET_TAXES,
            payload: tax
        });
    } catch (error) {
        console.log(error);
    }
};