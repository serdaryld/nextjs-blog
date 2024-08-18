import { AdjacentPostCard } from '../components';
import { getAdjacentPosts } from '../services';

const AdjacentPosts = async ({ createdAt, slug }) => {

  const adjacentPosts = await getAdjacentPosts(createdAt, slug) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-8 gap-12 mb-8">
        <>
          {adjacentPosts.previous && (
            <div className={`${adjacentPosts.next ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'} adjacent-post rounded-lg relative h-60`}>
              <AdjacentPostCard post={adjacentPosts.previous} position="LEFT" />
            </div>
          )}
          {adjacentPosts.next && (
            <div className={`${adjacentPosts.previous ? 'col-span-1 lg:col-span-4' : 'col-span-1 lg:col-span-8'} adjacent-post rounded-lg relative h-60`}>
              <AdjacentPostCard post={adjacentPosts.next} position="RIGHT" />
            </div>
          )}
        </>
    </div>
  );
};

export default AdjacentPosts;

export const revalidate = 60;