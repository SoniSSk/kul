import Author from "./Author.dto";
import BlogCategory from "./BlogCategory.dto";
import Image from "./Image.dto";
import Seo from "./Seo.dto";

export default interface Blog {
    slug:          string;
    featuredImage: Image | null;
    tags:          BlogCategory[];
    seo:           Seo;
    date:          Date;
    content:       string;
    id:            string;
    author:        Author;
    title:         string;
    excerpt:       string;
    categories:    BlogCategory[];
    minimum_read_minute?: {
        minimumReadMinute: string;
    }
}