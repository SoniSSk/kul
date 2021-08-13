import Image from "./Image.dto";

export default interface WhyChooseUs {
    description:    string;
    title:          string;
    icon?:           Image | null;
    image?:          Image | null;
}