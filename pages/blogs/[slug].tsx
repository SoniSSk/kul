import { promises as fs } from 'fs';
import { filter, find, intersectionWith, isEqual, some } from 'lodash';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { FC } from 'react';
import Link from 'next/link';
import Head from 'next/head';

import {BLOGS_FILE, FOOTER_FILE, MENUS_FILE} from '../../constants/file-paths';
import Blog from '../../dtos/Blog.dto';
import Menus from '../../dtos/Menus.dto';
import MainLayout from '../../components/MainLayout';
import CorneredBox from '../../components/CorneredBox';
import BlogCard from '../../components/BlogCard';
import Text from '../../styled/Text';
import Spacer from '../../styled/Spacer';
import Button from '../../styled/Button';
import FooterDefinition from "../../dtos/Footer.dto";
import Breadcrumb, { BreadcrumbItem } from '../../components/Breadcrumb';
import { useRouter } from 'next/router';

interface BlogDetailProps {
  blog: Blog;
  menus: Menus;
  relatedBlogs: Blog[];
  footer: FooterDefinition;
}

const BlogDetail: FC<BlogDetailProps> = ({ menus, blog, relatedBlogs, footer }) => {
  const { asPath, pathname } = useRouter();

  console.log("Blog is", blog);

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
      label: blog.categories[0].name,
      link: "/blog-category/" + blog.categories[0].slug
    },
    {
      label: blog.title || "",
      link: asPath,
    },
  ];
  return (
    <MainLayout menus={menus} headerBgColorBack="secondary" footer={footer}>
      <Head>
        <title>{blog.title} &#8211; EzyLegal</title>
        {blog.seo && (
          <>
            <meta name="robots" content={blog.seo.robot} />
            <meta name="description" content={blog.seo.description} />
            <meta name="keywords" content={blog.seo.keywords} />
          </>
        )}
      </Head>
      <section style={{ backgroundColor: '#303765', padding: '30px 0 50px 0' }}>
        <div className="container">
          <Text fontSize="xxxl" color="white">
            Legal Guide
          </Text>
        </div>
      </section>
      <CorneredBox
        bgColor="white"
        bgColorBack="secondary"
        paddingTop="30px"
        paddingBottom="50px"
      >
        <div className="container">
        <Breadcrumb items={breadcrumbItems} />
          <Spacer direction="vertical" size={10} />
          <div className="row">
            <div className="col-12 col-md-9">
              <Text fontSize="xxxl" fontFamily="montserrat" weight="bold">
                {blog.title}
              </Text>
              <Spacer direction="vertical" size={5} />
              <Text>
                by {blog.author.name}
                <Spacer as="span" direction="horizontal" size={5} /> ·
                <Spacer as="span" direction="horizontal" size={5} /> 4 min read
              </Text>
              <Spacer direction="vertical" size={25} />
              <Text
                as="div"
                justify
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="blog-content"
              />
              <Spacer direction="vertical" size={25} />
              {blog.tags.length ? (
                <>
                  {blog.tags.map((tag) => (
                    <Link key={tag.id} href="#">
                      <a>
                        <Button
                          color="black"
                          backgroundColor="skyBlue"
                          size="xs"
                          className="mb-2 mr-2"
                          rounded
                        >
                          {tag.name}
                        </Button>
                      </a>
                    </Link>
                  ))}
                  <Spacer direction="vertical" size={5} />
                </>
              ) : null}
              <Spacer direction="vertical" size={40} />
              <div className="row align-items-center">
                <div className="col-auto">
                  <img
                    className="circle"
                    src={blog.author.avatar?.url}
                    alt={blog.author.name}
                    width="50"
                  />
                </div>
                <div className="col">
                  <Text fontSize="xs" color="gray">
                    Written by
                  </Text>
                  <Text fontSize="xs">{blog.author.name}</Text>
                </div>
              </div>
              <Spacer direction="vertical" size={25} />
            </div>
          </div>
          <Spacer direction="vertical" size={80} />
          <Text fontSize="xxxl" fontFamily="montserrat" weight="bold">
            Related Articles
          </Text>
          <Spacer direction="vertical" size={20} />
          <div className="row">
            {relatedBlogs?.map((blog) => (
              <div key={blog.id} className="col-12 col-md-4 d-flex">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
          <Spacer direction="vertical" size={25} />
        </div>
      </CorneredBox>
    </MainLayout>
  );
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // fetch menus
  const menuData = await fs.readFile(MENUS_FILE, { encoding: 'utf-8' });
  const menus: Menus = JSON.parse(menuData);

  // fetch blogs
  const blogsData = await fs.readFile(BLOGS_FILE, { encoding: 'utf-8' });
  const blogs: Blog[] = JSON.parse(blogsData);

  const blog: Blog | null =
    find(blogs, (blog: Blog) => blog.slug === (params as Params).slug) || null;

  if (!blog) {
    return {
      notFound: true,
    };
  }

  const relatedBlogs: Blog[] = filter(
    blogs,
    (item) => !!intersectionWith(item.categories, blog?.categories, isEqual)
  );

  const footerData = await fs.readFile(FOOTER_FILE, { encoding: 'utf-8' });
  const footer: FooterDefinition = JSON.parse(footerData);

  return {
    props: {
      blog,
      menus,
      relatedBlogs,
      footer
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // fetch blogs
  const blogsData = await fs.readFile(BLOGS_FILE, { encoding: 'utf-8' });
  const blogs: Blog[] = JSON.parse(blogsData);

  const paths = blogs.map((blog: any) => ({ params: { slug: blog.slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default BlogDetail;
