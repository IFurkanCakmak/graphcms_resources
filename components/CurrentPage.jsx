import React from "react";
import Link from "next/link";

 const CurrentPage = ({article}) => {
        
  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-6 mb-8 -mx-4 ">
 <div className="text-center lg:text-left md:text-left justify-center border-b p-3">

 <a>Home / Article / </a><b>{article.title}</b>
 </div>
    
    
      
    </div>
  )
      
}

export default CurrentPage
