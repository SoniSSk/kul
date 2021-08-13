import {getNumericalRegularPrice, getNumericalSalePrice} from "./currencyConverter";

function actualPriceCalculator(cartItems: Array<any>, taxRate: string, geolocation: string): Array<any>{
    return cartItems.map((item) => {
        const salePrice = Math.floor(((100 * getNumericalSalePrice(geolocation, item))/(100 + Number(taxRate))));
        const regularPrice = Math.floor(((100 * getNumericalRegularPrice(geolocation, item))/(100 + Number(taxRate))));
        return {
            ...item,
            salePrice,
            regularPrice,
            totalSalePrice: getNumericalSalePrice(geolocation, item),
            totalRegularPrice: getNumericalRegularPrice(geolocation, item),
            otherSalePrice: salePrice,
            otherRegularPrice: regularPrice
        };
    });
}

export default actualPriceCalculator;