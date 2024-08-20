import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
query MyQuery {
  postsConnection(orderBy: createdAt_DESC) {
    edges {
      node {
        author {
          bio
          id
          name
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        category {
          name
          slug
          color{
            hex
          }
        }
      }
    }
  }
}

    `

    const result = await request(graphqlAPI, query)

    return result.postsConnection.edges;
} 

export const getRecentPosts = async () => {
    const query = gql`
      query GetRecentPosts {
        posts(
          orderBy: createdAt_DESC
          last: 4
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
      }
    `;
    const result = await request(graphqlAPI, query);
  
    return result.posts;
  };

  export const getSimilarPosts = async (category, slug) => {
    const query = gql`
      query GetSimilarPosts($slug: String!, $category: [String!]) {
        posts(
          where: {slug_not: $slug, AND: {category_some: {slug_in: $category}}}
          last: 4
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
      }
    `;
    const result = await request(graphqlAPI, query, { slug, category });

    return result.posts;
  };


  export const getCategories = async () => {
    const query = gql`
      query GetGategories {
          categories {
            name
            slug
            color{
              hex
            }
          }
      }
    `;
  
    const result = await request(graphqlAPI, query);

    return result.categories;
  };



  export const getPostDetails = async (slug) => {
    const query = gql`
      query GetPostDetails($slug : String!) {
        post(where: {slug: $slug}) {
          title
          excerpt
          featuredImage {
            url
          }
          author{
            name
            bio
            photo {
              url
            }
          }
          category {
            name
            slug
            color{
              hex
            }
          }  
          createdAt
          slug
          content {
            raw
          }
        }
      }
    `;
  
    const result = await request(graphqlAPI, query, { slug });
  
    return result.post;
  };



  export const submitComment = async (obj) => {
    const result = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
  
    return result.json();
  };
  

  export const getComments = async (slug) => {
    const query = gql`
      query GetComments($slug:String!) {
        comments(where: {post: {slug:$slug}}){
          name
          createdAt
          comment
        }
      }
    `;
  
    const result = await request(graphqlAPI, query, { slug });
  
    return result.comments;
  };

  
  export const getFeaturedPosts = async () => {
    const query = gql`
      query GetFeaturedPosts {
        posts(where: {featuredPost: true}) {
          author {
            name
            photo {
              url
            }
          }
          featuredImage {
            url
          }
          title
          slug
          createdAt
        }
      }   
    `;
  
    const result = await request(graphqlAPI, query);
  
    return result.posts;
  };


  export const getCategoryPost = async (slug) => {
    const query = gql`
      query GetCategoryPost($slug: String!) {
        postsConnection(where: {category_some: {slug: $slug}}) {
          edges {
            cursor
            node {
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              createdAt
              slug
              title
              excerpt
              featuredImage {
                url
              }
              category {
                name
                slug
                color{
                  hex
                }
              }
            }
          }
        }
      }
    `;
  
    const result = await request(graphqlAPI, query, { slug });
  
    return result.postsConnection.edges;
  };


  export const getAdjacentPosts = async (createdAt, slug) => {
    const query = gql`
      query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
        next:posts(
          first: 1
          orderBy: createdAt_ASC
          where: {slug_not: $slug, AND: {createdAt_gte: $createdAt}}
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
        previous:posts(
          first: 1
          orderBy: createdAt_DESC
          where: {slug_not: $slug, AND: {createdAt_lte: $createdAt}}
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
      }
    `;
  
    const result = await request(graphqlAPI, query, { slug, createdAt });
  
    return { next: result.next[0], previous: result.previous[0] };
  };