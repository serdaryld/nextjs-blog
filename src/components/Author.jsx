import React from 'react';
import Image from 'next/image';

const Author = ({ author }) => (
  <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-5">
    <div className="absolute left-1/2 transform -translate-x-1/2 -top-14">
      <Image
        unoptimized
        alt={author.name}
        height="100"
        width="100"
        className="align-middle rounded-full"
        src={author.photo.url}
      />
    </div>
    <h3 className="mt-4 mb-4 text-xl font-bold">{author.name}</h3>
    <p className="text-ls">{author.bio}</p>
  </div>
);

export default Author;
