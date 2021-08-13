import Avatar from "./Avatar.dto";

export default interface Author {
    id?:   string;
    name: string;
    avatar?: Avatar;
};