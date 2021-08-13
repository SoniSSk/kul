export default interface Variation {
    id:             string;
    databaseId:     number;
    name:           string;
    sku:            string;
    price:          null;
    regularPrice:   null;
    salePrice:      null;
    otherRegularPrice: string;
    otherSalePrice: string;
    dateOnSaleFrom: Date | null;
    dateOnSaleTo:   Date | null;
    description:    Array<string> | null;
}