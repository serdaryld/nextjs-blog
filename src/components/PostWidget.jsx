import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import { getSimilarPosts, getRecentPosts } from '../services';

const PostWidget = async ({ categories, slug }) => {
  let relatedPosts = [];

  if (slug) {
    relatedPosts = await getSimilarPosts(categories, slug);
  } else {
    relatedPosts = await getRecentPosts();
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <>
    <div className="rounded-lg py-2 px-4 pb-4 mb-12">
      <h3 className="text-xl mb-8 font-semibold border-b border-gray-300 pb-4">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
      {relatedPosts.map((post, index) => (
        <Link href={`/post/${post.slug}`} key={index} 
         className="flex items-center w-full rounded mb-4 py-1 hover:px-1 hover:shadow-md transition-all duration-800">
          <div className="w-20 h-12 flex-none">
            <Image
              alt={post.title}
              height="60"
              width="60"
              unoptimized
              className="object-cover w-full h-full rounded"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs text-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
            <p className="text-md line-clamp-1 overflow-hidden text-ellipsis">{post.title}</p>
          </div>

        </Link>
      ))}
    </div>
    </>
  );
};

export default PostWidget;

export const revalidate = 60;