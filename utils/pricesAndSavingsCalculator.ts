import {sumBy} from "lodash";
import Upsell from "../dtos/Upsell.dto";
import savePercentage from "./savePercentage";

export function getPrices(cartItems: Array<any>){
    const subTotal = sumBy(cartItems, (o) => Number(o.salePrice));
    const taxTotal = sumBy(
        cartItems,
        (o) => Number(o.totalSalePrice) - Number(o.salePrice)
    );

    return {
        totalRegularPrice: sumBy(cartItems, (o) => Number(o.regularPrice)),
        totalSalePrice: subTotal,
        totalPrice: subTotal + taxTotal,
        taxTotal: Math.round(taxTotal),
    };
}

export function getSavings(prices: any){
    return {
        totalSaving: prices.totalRegularPrice - prices.totalSalePrice,
        totalSavingPer: savePercentage(
            prices.totalRegularPrice,
            prices.totalSalePrice
        ),
    };
}