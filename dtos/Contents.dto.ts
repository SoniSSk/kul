import Content from "./Content.dto";

export default interface Contents {
    heading: null | string;
    content: Content[] | null;
}