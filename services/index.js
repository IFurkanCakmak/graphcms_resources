import {request, gql} from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getArticles = async () => {
    const query = gql `
    query MyQuery {
        articlesConnection {
          edges {
            node {
              author {
                description
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
              categories {
                name
                slug
              }
            }
          }
        }
      }`

      const result = await request(graphqlAPI, query);

      return result.articlesConnection.edges;
};

export const getArticleDetails = async (slug) => {
  const query = gql `
  query GetArticleDetails($slug : String!) {
    article(where: {slug: $slug}) {
     
            author {
              description
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
            categories {
              name
              slug
            }
            content{
              raw
            }
          }
        }
    `

    const result = await request(graphqlAPI, query, {slug});

    return result.article;
};

export const getRecentArticles = async () => {
const query = gql `
query GetArticleDetails() {
  articles(orderBy: createdAt_ASC
    last : 3
    ){
      title
      featuredImage{
        url
      }
      createdAt
      slug
    }
}
`


const result = await request(graphqlAPI, query);

return result.articles;
}

export const getSimilarArticles = async (categories, slug) =>{
  const query =gql`
  query GetArticleDetails($slug: String!, $categories: [String!]) {
    articles(
      where:{slug_not : $slug, AND: {categories_some: {slug_in:$categories}}}
      last: 3
    ){
      title
      featuredImage{
        url
      }
      createdAt
      slug
    }
  }
  `

  const result = await request(graphqlAPI, query , {categories,slug});

return result.articles;
}

/* slug_not because not taking the current content we looking*/

export const getCategories = async () =>{
  const query =gql`
  query GetCategories{
    categories {
      name
      slug
    }
  }`

  const result = await request(graphqlAPI, query);

  return result.categories;
}

export const submitComment = async (obj) =>{
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify(obj),
  })

  return result.json();

} 

/* in nextjs we can send a http reuquest in our next js backend server and no need any seperate nodejs server. 
the async function in line 136 is fetch comments from next js server by writing a request to next js backend */

export const getComments = async (slug) =>{
  const query =gql`
  query GetComments($slug:String!){
    comments(where: {article: {slug:$slug}}) {
      name
      createdAt
      comment
    }
    
  }`

  const result = await request(graphqlAPI, query ,{slug});

  return result.comments;
}

/* getcomments function is we want to fetch all comments from "where in an object "article" which  has that  slug*/

export const getTopArticles = async () => {
  const query = gql`
    query GetCategoryArticle() {
      articles(where: {featuredArticle: true}) {
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

  return result.articles;
};

export const getCategoryArticle = async (slug) => {
  const query = gql`
    query GetCategoryArticle($slug: String!) {
      articlesConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              description
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
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.articlesConnection.edges;
};



export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!,$slug:String!) {
      next:articles(
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
      previous:articles(
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