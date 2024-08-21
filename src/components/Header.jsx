import { getCategories } from '../services';
import Link from 'next/link';

export default async function Header() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 lg:px-14 mb-8">
      <div className="w-full inline-block border-b border-black py-6 md:py-8 pr-2">
        <div className="md:float-left block">
          <Link href="/">
            <img src='/logo.png' className='w-auto h-10 pb-1'/>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}>
              <span className="md:float-right mt-2 align-middle ml-4 font-semibold hover:underline cursor-pointer">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export const revalidate = 60;