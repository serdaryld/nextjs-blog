import React from 'react';
import { getFeaturedPosts } from '../services';
import FeaturedPostCard from '../components/FeaturedPostCard'; // Adjust the path as necessary
import Carousel from '../components/Carousel'; // Adjust the path as necessary

const FeaturedPosts = async () => {
  const featuredPosts = await getFeaturedPosts();

  return (
   <div className='px-4 sm:px-2 mb-6'>
    <Carousel slides={featuredPosts.map((post, index) => (
      <FeaturedPostCard key={index} post={post} />
    ))}
     options={{ loop: true }}>
      
    </Carousel>
   </div>
  );
};

export default FeaturedPosts;

export const revalidate = 60;