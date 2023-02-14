import React, { useEffect, useState } from 'react'
import { getCategories } from '../services'
import Link from 'next/link';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() =>{
    getCategories()
    .then((newCategories) => setCategories(newCategories))
  },[]);

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8 -mx-3 pb-7 '>
    
    <h3 className='text-xl mb-5 font-semibold border-b pb-4'> 
    Categories
    </h3>
    {categories.map((category) => (
      <Link key={category.slug} href={`/category/${category.slug}`}>
     
      <span className='cursor-pointer block pb-2 mb-2'>
      {category.name}
      </span>
       
      </Link>
    ))}
  </div>
    )
}

export default Categories

/*margin between categories title and categroy names is mb-5 */