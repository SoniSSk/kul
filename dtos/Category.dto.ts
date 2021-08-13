import Image from "./Image.dto";
import Product from "./Product.dto";

export default interface Category {
    count:       number | null;
    id:          string;
    name:        string;
    description: null | string;
    slug:        string;
    link:        string;
    image:       Image | null;
    products:    Product[];
}
