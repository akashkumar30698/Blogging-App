import React, { useEffect, useState } from 'react';
import './navbar.css';
import Cookies from 'js-cookie';
import { useNavigate,useLocation } from 'react-router-dom';

function Cards() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [postId, setPostId] = useState(null);
    const [deleteMessage, setDeleteMessage] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const navigate = useNavigate();
  
   


    useEffect(() => {
        const fetchPosts = async () => {
            const token = Cookies.get("Login-Token");

            if (!token) {
                setLoading(false);
                return;
            }
                                            ///            passing updated values through query parameters
            try {                                                        //                       |
                const response = await fetch(`${import.meta.env.VITE_APP_URL}/:user/posts?page=${page}&limit=6`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    setPosts(data.posts);
                    setTotalPages(data.totalPages);
                } else {
                    throw new Error('Failed to fetch posts');
                }
            } catch (err) {
                setError(err.message);
                console.log("Error fetching data from backend at post.jsx", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleClick = (post) => {
        navigate(`/article/${post._id}`, { state: { post } });
    };

    const handleDeleteClick = async (postId) => {
        setDeleteLoading(true);
        setPostId(postId);

        try {
            const token = Cookies.get("Login-Token");

            const response = await fetch(`${import.meta.env.VITE_APP_URL}/:user/posts`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },  
                body: JSON.stringify({ postId: postId }),
            });

            if (response.ok) {
                const data = await response.json();

                if (data.success) {
                    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
                    setDeleteMessage(true);
                    setTimeout(() => { setDeleteMessage(false); }, 2000);
                }
            } else {
                throw new Error('Failed to delete posts');
            }
        } catch (err) {
            setError(err.message);
            console.log("Error fetching data from backend at post.jsx", err);
        } finally {
            setDeleteLoading(false);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNextPage =   () => {       
           if(page < totalPages){
            setPage(page + 1)
           }

    };

    return (
        <>
            {deleteMessage && (
                <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <span className="font-medium">Success!</span> Your blog has been deleted successfully.
                </div>
            )}

            <div className="post-length max-w-lg mx-auto posts">
                {posts.length === 0 ? (
                    <div>No Posts Available</div>
                ) : (
                    posts.map((post) => (
                        <div key={post._id} className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
                            <a href="#">
                                <img className="rounded-t-lg" src={`${post.blogImageURL}`} alt={post.title} />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">{post.title}</h5>
                                </a>
                                <p className="font-normal text-gray-700 mb-3">{post.body}</p>
                                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" onClick={() => handleClick(post)}>
                                    Read more
                                </button>
                                <button className="css text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" onClick={() => handleDeleteClick(post._id)}>
                                    {deleteLoading ? "Deleting" : "Delete"}
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="pagination  max-w-lg mx-auto posts">
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center items-center" onClick={handlePreviousPage} >
                    Previous
                </button>
                <span>{`Page ${page} of ${totalPages}`}</span>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center  items-center"  onClick={handleNextPage} >
                    Next
                </button>
            </div>
        </>
    );
}

export default Cards;
