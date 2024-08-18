import { NextRequest, NextResponse } from 'next/server';
import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export async function POST(req: NextRequest) {
  const { name, email, comment, slug } = await req.json();

  const graphQLClient = new GraphQLClient(graphqlAPI!, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }) { id }
    }
  `;

  try {
    const result = await graphQLClient.request(query, { name, email, comment, slug });
    return NextResponse.json(result);
  } catch (error) {
    console.error('GraphQL Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
