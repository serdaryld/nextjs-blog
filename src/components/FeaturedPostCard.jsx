import React from 'react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedPostCard = ({ post }) => (
  <div className="relative h-72 overflow-hidden group rounded-lg">
    <div
      className="absolute rounded-lg bg-center bg-no-repeat bg-cover shadow-md inline-block w-full h-full transition-transform duration-500 group-hover:scale-105"
      style={{ backgroundImage: `url('${post.featuredImage.url}')` }}
    />
    <div className="absolute rounded-lg bg-center opacity-50 from-gray-400 bg-gradient-to-b via-gray-700 to-black w-full h-full" />
    <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
      <p className="text-white mb-4 text-shadow font-semibold text-xs">
        {moment(post.createdAt).format('MMM DD, YYYY')}
      </p>
      <p className="text-white mb-4 text-shadow font-semibold text-xl lg:text-2xl text-center line-clamp-3 overflow-hidden text-ellipsis">
        {post.title}
      </p>
    </div>
    <div
      className="absolute top-2 left-2 md:left-0 md:transform md:-translate-x-full md:group-hover:translate-x-2 transition-all duration-500 bg-darkslateblue text-white text-xs font-semibold border-b"
    >
      Featured
    </div>
    <Link href={`/post/${post.slug}`}>
      <span className="cursor-pointer absolute w-full h-full" />
    </Link>
  </div>
);

export default FeaturedPostCard;
