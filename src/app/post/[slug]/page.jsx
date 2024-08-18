import { getPostDetails, getPosts } from '../../../services';
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '../../../components';
import { AdjacentPosts } from '../../../sections';

export default async function PostDetails({ params }) {
  const { slug } = params;
  let post = null;

  if (slug) {
    try {
      post = await getPostDetails(slug);
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  }

  if (!post) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 lg:px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <AdjacentPosts slug={post.slug} createdAt={post.createdAt} />
          <CommentsForm slug={post.slug} />
          <Comments slug={post.slug} />
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget slug={post.slug} categories={post.category.map((category) => category.slug)} />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}


export const revalidate = 60;