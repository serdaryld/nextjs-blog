import { getComments } from '../services';
import moment from 'moment';
import parse from 'html-react-parser';

export default async function Comments({ slug }) {
  const comments = await getComments(slug);

  if (comments.length === 0) return null;

  return (
    <div className="p-2 pb-12 mb-8">
      <h3 className="text-xl mb-6 font-semibold border-b border-gray-500 pb-4">
        {comments.length} Comments
      </h3>
      {comments.map((comment, index) => (
        <div key={index} className="border-b border-gray-200 mb-4 pb-4 mx-2">
          <p className="mb-4">
            <span className="font-semibold">{comment.name}</span>
            {' '}
            on
            {' '}
            {moment(comment.createdAt).format('MMM DD, YYYY')}
          </p>
          <p className="whitespace-pre-line w-full">{parse(comment.comment)}</p>
        </div>
      ))}
    </div>
  );
}

export const revalidate = 60;