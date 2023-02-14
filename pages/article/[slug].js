import React from 'react'
import { useRouter } from 'next/router'
import {getArticles, getArticleDetails} from '../../services'
import{ PostDetail, Categories, PostWidget, Author, Comments, CommentsForm , Loader} from '../../components'
import { AdjacentPosts } from '../../sections'

const PostDetails = ({article}) => {
const router= useRouter();

if(router.isFallback){
  return <Loader/>
}
/*that router means we able to see the articles we publish even in deployment version of app*/
  return (
    <div className='container mx-auto px-10 mb-8'>
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
    <div className='col-span-1 lg:col-span-8'>
    <PostDetail article={article}/>
    <Author author={article.author}/>
    <AdjacentPosts slug={article.slug} createdAt={article.createdAt} />
    <CommentsForm slug= {article.slug}/>
    <Comments slug= {article.slug}/>
    </div>
    <div className='col-span-1 lg:col-span-4'>
    <div className='relative lg:sticky top-8'>
    <PostWidget slug={article.slug} categories={article.categories.map((category) => category.slug)} />
    <Categories/>
    </div>
    </div>
    </div>
    </div>
  
    )
}

export default PostDetails

export async function getStaticProps({params}) {
  const data= await getArticleDetails(params.slug);

  return{
    props: {article : data}
  }
}

/* getStaticPaths is required for dynamic SSG pages and is missing for a dynamic url like '/article/[slug]' */

export async function getStaticPaths() {
  const articles =await getArticles();

  return {
    paths:articles.map(({node : {slug}}) =>({params: {slug}})),
    fallback:true,
  }
}

