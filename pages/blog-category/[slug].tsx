import { GetStaticPaths, GetStaticProps } from "next";
import { promises as fs } from "fs";
import {
  BLOG_CATEGORIES_FILE,
  BLOG_POST_BY_CATEGORIES_FILE,
  BLOGS_FILE,
  FOOTER_FILE,
  MENUS_FILE,
} from "../../constants/file-paths";
import BlogCategory from "../../dtos/BlogCategory.dto";
import { FC, Fragment } from "react";
import Menus from "../../dtos/Menus.dto";
import Blog from "../../dtos/Blog.dto";
import { filter, find, intersectionWith, isEqual } from "lodash";
import FooterDefinition from "../../dtos/Footer.dto";
import { BLOG_POSTS_BY_CATEGORY } from "../../constants/graphql";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import MainLayout from "../../components/MainLayout";
import Text from "../../styled/Text";
import Link from "next/link";
import Spacer from "../../styled/Spacer";
import BlogCard from "../../components/BlogCard";
import { Container } from "react-bootstrap";
import Breadcrumb, { BreadcrumbItem } from "../../components/Breadcrumb";
import { useRouter } from "next/router";
interface BlogPostProps {
  menus: Menus;
  blogPosts: Blog[];
  footer: FooterDefinition;
  slug: string;
}

const BlogPosts: FC<BlogPostProps> = ({ menus, blogPosts, footer, slug }) => {
  const { asPath, pathname } = useRouter();

  const categories: BlogCategory[] = blogPosts.flatMap((post) => post.categories);

  const currentCategory = categories.filter((category) => category.slug === slug);

  console.log("Current category", currentCategory);

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: 'Blogs',
      link: "/blogs",
    },
    {
      label: currentCategory.length ? currentCategory[0].name : "",
      link: asPath,
    },
  ];
  console.log(blogPosts);
  return (
    <MainLayout menus={menus} headerBgColorBack="secondary" footer={footer}>
      <Head>
        <title>Blogs &#8211; EzyLegal</title>
      </Head>
      {blogPosts.length ? (
        <section
          style={{ backgroundColor: "#303765", padding: "30px 0 50px 0" }}
        >
          <div className="container">
            <Text fontSize="lg" color="white">
              EzyLegal Blogs
            </Text>
            <Text fontSize="xxxl" color="white">
              {currentCategory.length ? currentCategory[0].name : ""}
            </Text>
          </div>
        </section>
      ) : null}
      <Container>
        <Spacer direction="vertical" size={10} />
        <Breadcrumb items={breadcrumbItems} />
        <Spacer direction="vertical" size={10} />
        {blogPosts?.length && currentCategory.length ? (
          <Fragment key={currentCategory[0].id}>
            <Spacer direction="vertical" size={20} />
            <div className="row">
              {blogPosts.map((blog) => (
                <div key={blog.id} className="col-12 col-md-4 d-flex">
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>
            <Spacer direction="vertical" size={20} />
          </Fragment>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <Text fontSize={"lg"}>
              {" "}
              Sorry no blogs of this category available{" "}
            </Text>
          </div>
        )}
      </Container>
    </MainLayout>
  );
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // fetch menus
  const menuData = await fs.readFile(MENUS_FILE, { encoding: "utf-8" });
  const menus: Menus = JSON.parse(menuData);

  // fetch blogs
  try {
    const slug = (params as Params).slug;
    const blogsForCategoryData = await fs.readFile(
      `${BLOG_POST_BY_CATEGORIES_FILE}/${slug}.json`,
      { encoding: "utf-8" }
    );

    const blogPosts: Blog[] = JSON.parse(blogsForCategoryData);

    const footerData = await fs.readFile(FOOTER_FILE, { encoding: "utf-8" });
    const footer: FooterDefinition = JSON.parse(footerData);

    return {
      props: {
        menus,
        blogPosts,
        footer,
        slug
      },
    };
  } catch (e) {
    console.log((params as Params).slug, e);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // fetch blogs
  const blogsData = await fs.readFile(BLOG_CATEGORIES_FILE, {
    encoding: "utf-8",
  });
  const blogs: BlogCategory[] = JSON.parse(blogsData);

  const paths = blogs.map((blog: any) => ({ params: { slug: blog.slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default BlogPosts;
