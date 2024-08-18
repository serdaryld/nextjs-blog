import { getCategoryPost, getCategories } from '../../../services';
import { PostCard, Categories, Loader } from '../../../components';

export default async function CategoryPost({ params }) {
  const { slug } = params || {};
  let posts = [];
  let categories = [];
  let loading = true;

  if (slug) {
    try {
      posts = await getCategoryPost(slug);
      categories = await getCategories();
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      loading = false;
    }
  }

  const category = categories.find((cat) => cat.slug === slug);

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto lg:px-10 mb-8">
      <h1 className='inline-block m-4 mb-10 font-semibold text-2xl cursor-pointer' 
       style={{ color: category.color.hex }}>#{slug}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-9">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node || post} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-3">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 60;
