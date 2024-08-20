import React from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

const PostCard = ({ post }) => (
  <div className="relative rounded-lg pb-12 my-3 mx-4 mb-8 lg:hover:shadow-md transition duration-800 group overflow-hidden">
    <div className="relative overflow-hidden pb-40 md:pb-60 lg:pb-80 mb-6">
     <Link href={`/post/${post.slug}`}>
      <img
        src={post.featuredImage.url}
        alt=""
        className="object-top absolute h-40 md:h-60 lg:h-80 w-full object-cover rounded-lg transition-all duration-400 lg:group-hover:rounded-b-none"
      />
     </Link> 
    </div>
    <div className='px-4'>
      <div className="block lg:flex items-center mb-4">
          <span className="font-medium text-gray-500 pl-0.5">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
      </div>
      <h1 className="inline-block hover:underline mb-2 cursor-pointer text-2xl lg:text-3xl font-semibold">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h1>
      <p className="text-lg text-gray-700 font-normal mb-4 line-clamp-2 overflow-hidden text-ellipsis">
        {post.excerpt}
      </p>
      <div>
        <Link href={`/post/${post.slug}`}>
          <span className="inline-block bg-black text-lg font-medium rounded-full text-white px-8 py-2 cursor-pointer transition-all duration-600 hover:px-12">
          Continue Reading</span>
        </Link>
      </div>
    </div>
    <div className="flex flex-wrap space-x-2 absolute top-2 right-2 md:right-0 md:transform md:translate-x-full md:group-hover:-translate-x-2 transition-all duration-500">
            {post.category.map((cat, index) => (
               <Link href={`/category/${cat.slug}`} key={index} className='bg-black opacity-80 text-white text-xs font-semibold px-2 py-1 rounded-lg'>#{cat.slug}</Link>
            ))}
    </div>
  </div>
);

export default PostCard;
