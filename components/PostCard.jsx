import React from 'react'
import moment from 'moment'
import Link from 'next/link'

const PostCard = ({article}) => {
  console.log(article);
  return (
    <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8 -mx-4">
    <div className="relative overflow-hidden shadow-md pb-80 mb-6">
    <img 
   src={article.featuredImage.url}
   alt={article.title}
   className='object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg'
 />
    </div>
    <h1 className="transiition duration-700 text-center mb-8 mt-4 cursor-pointer hover:text-teal-400 text-3xl font-semibold relative text-2xl">
    <Link href={`/article/${article.slug}`}>
    {article.title}
    </Link>
    </h1>
     <div className='block lg:flex text-center items-center justify-center mb-8 w-full'>
     <div className='flex items-center justify-center mb-4 lg:mb-0 w-full lg:w-auto '>
     <img
      alt={article.author.name}
      height="40px"
      width="40px"
      className='align-middle rounded-full -mt-2'
      src={article.author.photo.url}
     />
     <p className='inline align-middle text-gray-700 ml-2 mb-1 text-lg'>{article.author.name}</p>
     </div>
     <div className='font-medium text-gray-700 ml-2 -mt-1'>
     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-6 inline mr-2 text-teal-600 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{moment(article.createdAt).format('MMM DD ,YYYY')}
        </span>
        

     </div>
   
     </div>
     <p className='text-center text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8 -mt-2'>{article.excerpt} </p>
    <div className='text-center'>
    <Link href={`/article/${article.slug}`}>
    <span className='transition duration-500 transform hover:-translate-y-1 inline-block bg-teal-600 text-lg font-medium rounded-full text-white px-8 py-2 ml-2 cursor-pointer'>
    Read more
    </span>
    </Link>
    </div>
     </div>
  )
}



export default PostCard

/*sizing the post box is -mx */
/*for getting close an object to an object use -m or -p */