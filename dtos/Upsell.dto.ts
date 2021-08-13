export default interface Upsell {
    id:                string;
    otherRegularPrice: null | string;
    otherSalePrice:    null | string;
    name:              string;
    regularPrice:      null | string;
    salePrice:         null | string;
    dateOnSaleFrom:    null;
    dateOnSaleTo:      null;
}