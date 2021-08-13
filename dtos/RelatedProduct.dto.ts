import Image from "./Image.dto";
import {ProductTypes} from "./Product.dto";

export default interface RelatedProduct{
    id:                string;
    name:              string;
    sku:               null | string;
    slug:              string;
    link:              string;
    shortDescription:  string;
    description:       null | string;
    dateOnSaleTo:      null;
    dateOnSaleFrom:    null;
    onSale:            boolean;
    reviewCount:       number;
    averageRating:     number;
    productTypes:      ProductTypes;
    regularPrice?:     null | string;
    salePrice?:        null | string;
    price?:            null | string;
    otherRegularPrice: null | string;
    otherSalePrice:    null | string;
    image:             Image | null;
    promotionText:      string;
}