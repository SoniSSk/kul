import Link from 'next/link';
import { FC } from 'react';

import Spacer from '../../styled/Spacer';
import Button from '../../styled/Button';
import Text from '../../styled/Text';
import { BlogCardWrapper } from './BlogCard.styled';
import Blog from '../../dtos/Blog.dto';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => {
  return (
    <BlogCardWrapper>
      {blog.featuredImage && (
        <Link href={`/blogs/${blog.slug}`}>
          <a>
            <img
              src={blog.featuredImage?.sourceUrl}
              alt={blog.featuredImage?.title}
              className="w-100"
            />
          </a>
        </Link>
      )}
      <Spacer direction="vertical" size={20} />
      {blog.tags?.length ? (
        <>
          {blog.tags.map((tag) => (
            <Link key={tag.id} href="#">
              <a className="color-inherit">
                <span
                  // color="black"
                  // backgroundColor="skyBlue"
                  className="mb-2 mr-2 tag-pill"
                >
                  {tag.name}
                </span>
              </a>
            </Link>
          ))}
          <Spacer direction="vertical" size={5} />
        </>
      ) : null}

      <Link href={`/blogs/${blog.slug}`}>
        <a className="color-inherit">
          <Text fontSize="lg" weight="midbold">{blog.title}</Text>
        </a>
      </Link>
      <Spacer direction="vertical" size={15} />
      <Text weight="midbold">
        by {blog.author.name}
        <Spacer as="span" direction="horizontal" size={5} /> ·
        <Spacer as="span" direction="horizontal" size={5} /> {blog.minimum_read_minute?.minimumReadMinute || 4} min read
      </Text>
    </BlogCardWrapper>
  );
};

export default BlogCard;
