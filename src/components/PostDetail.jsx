import React from 'react';
import { RichText } from '@graphcms/rich-text-react-renderer';
import moment from 'moment';
import Link from 'next/link';

const PostDetail = ({ post }) => {
  return (
    <div className="rounded-lg lg:p-3 pb-12 mb-8">
      <div className="relative overflow-hidden mb-6">
        <img src={post.featuredImage.url} alt="" className="object-top h-40 md:h-60 lg:h-80 w-full object-cover rounded-lg" />
      </div>
      <div>
        <h1 className="mb-4 text-3xl font-semibold">{post.title}</h1>
        <div className="flex items-center mb-14 w-full">
          <span className="align-middle font-medium text-gray-700 pl-0.5">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
          <div className="flex flex-wrap ml-4 ">
            {post.category.map((cat, index) => (
              <Link
                href={`/category/${cat.slug}`}
                key={index}
                className="text-xs font-semibold px-2 py-1 rounded-full mr-2"
                style={{
                  color: cat.color.hex, 
                  borderColor: cat.color.hex,
                  borderWidth: '2px',
                  borderStyle: 'solid',
                }}
              >
                #{cat.slug}
              </Link>
            ))}
          </div>
        </div>
        <div className='text-justify'>
        <RichText
          content={post.content.raw}
          renderers={{
            h3: ({ children }) => <h3 className="text-xl font-semibold mb-4">{children}</h3>,
            h4: ({ children }) => <h4 className="text-lg font-semibold mb-4">{children}</h4>,
            h5: ({ children }) => <h4 className="text-md font-semibold mb-4">{children}</h4>,
            h6: ({ children }) => <h4 className="text-md font-semibold mb-4">{children}</h4>,
            p: ({ children }) => <p className="mb-8">{children}</p>,
            bold: ({ children }) => <strong>{children}</strong>,
            italic: ({ children }) => <em>{children}</em>,
            underline: ({ children }) => <u>{children}</u>,
            img: ({ src, altText, height, width }) => (
              <img src={src} alt={altText} height={height} width={width} className="mb-8" />
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-8">
                {children}
              </blockquote>
            ),
            a: ({ children, href }) => (
              <a href={href} className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          }}
        />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
