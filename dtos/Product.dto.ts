import Category from "./Category.dto";
import Image from "./Image.dto";
import ProductAddition from "./ProductAddition.dto";
import Seo from "./Seo.dto";
import Upsell from "./Upsell.dto";
import Variation from "./Variation.dto";
import Review from "./Review.dto";
import RelatedProduct from "./RelatedProduct.dto";

export enum ProductTypes {
    Simple = "simple",
    Variable = "variable",
}

export default interface Product {
    id:                string;
    name:              string;
    sku:               null | string;
    slug:              string;
    getTalkTime?:       any;
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
    promotionText:     string;
    product_addition:   ProductAddition;
    variations?:       Variation[];
    upsell?:           Upsell[];
    category:         Category;
    seo?:              Seo;
    reviews?: Review[];
    related?: RelatedProduct[];
}