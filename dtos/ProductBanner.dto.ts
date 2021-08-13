import Image from "./Image.dto";

export default interface ProductBanner{
    bannerTitle1: string;
    bannerTitle2: string;
    bannerTitle3: string;
    image: Image | null;
}