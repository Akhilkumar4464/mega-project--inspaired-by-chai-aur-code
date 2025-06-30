 import React from 'react'
 import appwriteService from '../Appwrite/Config'

  import { Link} from 'react-router-dom'
 
 function PostCards({$id , title , featuredImage, } ) {
   return (
    <Link to= {`/post/${$id}`} >
         <div className=' w-full bg-gray-100  rounded-2xl p-4'>
 <div className='w-full justify-center mb-4 '>
     <img className=' rounded-xl' src={ appwriteService.getFilePreview(featuredImage)}  alt={title} />
 </div>
 <h2
  className='text-lg font-bold text-gray-800'>
 { title}
 </h2>
         </div>
    </Link>
   )
 }
 
 export default PostCards
 