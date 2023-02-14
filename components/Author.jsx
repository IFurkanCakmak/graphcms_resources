import React from 'react'


const Author = ({author}) => {
  return (
    <div className='text-center mt-20 mb-8 p-12 bg-black bg-opacity-60 relative rounded-lg -mx-4'>
    <div className='absolute left-1/2 transform -translate-x-1/2 -top-12'>
    <img
    alt={author.name}
    height='80px'
    width='80px'
    className='align-middle rounded-full'
    src={author.photo.url}
    />  

    </div>
    <h3 className='text-white my-2 text-xl font-bold'>{author.name}</h3>
    <p className='text-white text-lg'>{author.description}</p>
  
    </div>
  )
}

export default Author