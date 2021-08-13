import Author from "./Author.dto";

export default interface Replies{
    id: string;
    content: string;
    date: string;
    rating: string;
    author: Author;
}