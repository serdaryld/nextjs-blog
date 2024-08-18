import { getCategories } from '../services';
import Link from 'next/link';

export default async function Categories() {
  const categories = await getCategories();

  return (
    <div className="rounded-lg py-2 px-4 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b border-gray-300 pb-4">Categories</h3>
      <div className='inline-flex flex-col'>
       {categories.map((category, index) => (
        <Link key={index} href={`/category/${category.slug}`}>
          <span className={'inline-block cursor-pointer pb-3 mb-3 hover:underline'}>
            {category.name}
          </span>
        </Link>
       ))}
      </div>
    </div>
  );
}

export const revalidate = 60;