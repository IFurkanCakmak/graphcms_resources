import React, {useRef,useState, useEffect} from 'react'
import { submitComment } from '../services';


const CommentsForm = ({slug}) => {
  const [error, setError]= useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMesage] =useState(false);
  const commentEl =useRef();
  const nameEl =useRef();
  const emailEl =useRef();
  const storeDataEl =useRef();

  useEffect(()=>{
    nameEl.current.value=window.localStorage.getItem('name')
    emailEl.current.value=window.localStorage.getItem('email')

  }, [])
  
  const handleCommitSubmission = () =>{
    setError(false);
    
    const { value: comment } = commentEl.current;
    const { value: name } = nameEl.current;
    const { value: email } = emailEl.current;
    const { checked: storeData } = storeDataEl.current  

    if(!comment || !nameEl || !email) {
      setError(true);
      return;
    }

    const commentObj ={name,email,comment,slug};

    if(storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    }
    else {
      window.localStorage.removeItem('name', name);
      window.localStorage.removeItem('email', email);
    }

    submitComment(commentObj)
    .then((res)=>{
      setShowSuccessMesage(true);
      setTimeout(() => {
        setShowSuccessMesage(false);
      }, 3000);
    })
  }
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 -mx-4'>
    <h3 className='text-sl mb-8 font-semibold border-b pb-4'>Share your thoughts</h3>
    <div className='grid grid-cols-1 gap-4 mb-4'>
    
    <textarea 
    ref={commentEl} 
    className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-200 text-gray-700'
    placeholder='Comment'
    name="comment"
    />

    </div>
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
    <input type='text' ref={nameEl}
    className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-200 text-gray-700'
    placeholder='Name'
    name="name"
    />
    <input type='text' ref={emailEl}
    className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-200 text-gray-700'
    placeholder='Email'
    name="email"
    />
    </div>
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4'>
    <div>
    <input ref={storeDataEl} type="checkbox" id="storeData" name="storeData" value="true" className='ml-1'/>
    <label className='text-gray-500 cursor-pointer ml-2' htmlFor='storeData'>Save my information for the next visit.</label>
    </div>
    </div>
   {error && <p className='text-xs text-red-500'>All fields are required</p>}
   <div className='mt-8'>
   <button 
   type="button" 
   onClick={handleCommitSubmission}
   className="transition-duration-500 ease hover:bg-red-700 inline-block bg-teal-600 text-md rounded-full text-white px-6 py-2 cursor-pointer"
   >
   Write a comment
   </button>
   {showSuccessMessage && <span className='text-xl float-right font-semibold mt-3 text-blue-600'>Comment submitted successfully for review.</span>}
   </div>
    </div>
  )
}

export default CommentsForm