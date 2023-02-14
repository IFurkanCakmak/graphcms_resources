import React , {useState, useEffect} from 'react'
import moment from 'moment'
import Link from 'next/link'

import { getRecentArticles, getSimilarArticles } from '../services'

const PostWidget = ({categories, slug}) => {
  const [relatedArticles, setRelatedArticles]= useState([]);
/* home page we see the recent posts but in the single article page we see related post to provide this info check the slug,
and the slug is gonna be something that i pass in postwidget  */
  useEffect(()=> {
    if(slug) {
      getSimilarArticles(categories, slug).then((result) => {
        setRelatedArticles(result);
      });
    } else {
      getRecentArticles()
      .then((result) =>{ setRelatedArticles(result);
    });
  }

  },[slug]) /*this change only when slug changes*/

  console.log(relatedArticles)
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8 -mt-20 lg:-mt-0 -mx-3'>
    <h3 className='text-xl mb-8 font-semibold border-b pb-4'> 
    {slug ? 'Related Articles' : 'Recent Articles'} 
    </h3>
    {relatedArticles.map((article)=> (
      <div key={article.title} className="flex items-center w-full mb-4">
      <div className='w-16 flex-none'>
      <img
      alt={article.title}
      height="60px"
      width="60px"
      className='align-middle rounded-full'
      src={article.featuredImage.url}
      />
      </div>
      <div className='flex-grow ml-4'>
      <p className='text-gray-500 font-xs'>
      {moment(article.createdAt).format('MMM DD, YYYY')}
      </p>
      <Link href={`/article/${article.slug}`} key={article.title} className='text-md'>
      {article.title}
      </Link>
      </div>

      </div>

    ))}
    </div>
  );
};

export default PostWidget;