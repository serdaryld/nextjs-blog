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
    <div className="rounded-lg py-2 px-4 pb-4 mb-12">
      <h3 className="text-xl mb-6 border-b border-gray-300 pb-4">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
      {relatedPosts.map((post, index) => (
        <Link href={`/post/${post.slug}`} key={index} 
         className="flex items-center w-full rounded mb-3 py-1 hover:px-2 hover:shadow-md transition-all duration-800">
          <div className="flex-grow">
            <p className="text-gray-500 font-xs text-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
            <p className="text-md font-semibold line-clamp-1 overflow-hidden text-ellipsis">{post.title}</p>
          </div>

        </Link>
      ))}
    </div>
  );
};

export default PostWidget;

export const revalidate = 60;