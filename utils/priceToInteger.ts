export default function priceToInteger(price: string|null|undefined){
    if(price === null || price === undefined) return 0;
    return Number(price.replace(/[^0-9.-]+/g,""))
}