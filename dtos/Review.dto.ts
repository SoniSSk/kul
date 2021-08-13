import Author from "./Author.dto";
import Replies from "./Replies.dto";

export default interface Review{
    id: string;
    content: string;
    date: string;
    rating: string;
    author: Author;
    replies?: Replies[];
}