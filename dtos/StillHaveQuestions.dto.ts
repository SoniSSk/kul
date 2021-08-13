import Image from "./Image.dto";

interface Timing{
    availableSlot: string;
}

interface RightBox{
    heading: string;
    timing: Timing[];
}

interface Button{
    text: string;
    link: string;
}

interface LeftBox{
    heading: string;
    content: string;
    image: Image;
    button: Button;
}

export default interface StillHaveQuestions{
    heading: string;
    leftBox: LeftBox;
    rightBox: RightBox;
}