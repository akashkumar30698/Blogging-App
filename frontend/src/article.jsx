import './navbar.css'
import { useLocation } from "react-router-dom"

function Article(){
     const location = useLocation()
     const { post } = location.state 
    
    return (
        <>
         <div className="center-container">
           <div key={post?._id} className="center bg-white shadow-md border border-gray-200 rounded-lg  mb-2">
              <a href="#">
                  <img className="rounded-t-lg" src={`${post?.blogImageURL}`} alt={post?.title} />
              </a>
              <div className="p-5">
                  <a href="#">
                      <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{post?.title}</h5>
                  </a>
                  <p className="font-normal text-gray-700 mb-3">{post?.body}</p>
              </div>
           </div>
        </div>
        </>
       
    )
}

export default Article
