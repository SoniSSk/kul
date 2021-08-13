export function getSalePrice(geolocation: string, item: any){
    if(geolocation === "in"){
        return `₹ ${item.salePrice} /-`;
    }

    return   `$ ${item.otherSalePrice}`;
}

export function getRegularPrice(geolocation: string, item: any){
    return geolocation === "in" ? `₹ ${item.regularPrice} /-` : `$ ${item.otherRegularPrice}`;
}

export function currencySymbol(geolocation: string){
    return geolocation === "in" ? "₹" : "$";
}

export function getNumericalSalePrice(geolocation: string, item: any){
    return geolocation === "in" ? item.salePrice : item.otherSalePrice;
}

export function getNumericalRegularPrice(geolocation: string, item: any){
    return geolocation === "in" ? item.regularPrice : item.otherRegularPrice;
}