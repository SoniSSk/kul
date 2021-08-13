import Blog from "./Blog.dto";

export default interface BlogCategory {
    id:   string;
    slug: string;
    name: string;
    blogs?: Blog[];
}