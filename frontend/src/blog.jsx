import { useState, useRef } from "react";
import Cookies from 'js-cookie';
import { useNavigate ,useLocation } from "react-router-dom";
import Navbar from "./navbar";



function Blog() {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const location = useLocation()
    const [formData, setFormData] = useState({
        upload: "",
        title: "",
        body: "",
    });

    const fileRef = useRef(null) //Used for resetting files as you cant directly result file data


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        // console.log(files[0]) ---> files[0] holds the name of the file like example.png
        if (name === "upload") {
            setFormData({ ...formData, [name]: files[0] });//Files[0] usually created when you have to send images(uploaded by user) or videos to backend


        } else {
            setFormData({ ...formData, [name]: value });
        }
    }

    const handleUserSubmit = async (e) => {
        e.preventDefault();

        
      


        const token = localStorage.getItem("LoginToken") || Cookies.get("Login-Token");
        
     

 

        if (!token) {
            navigate("/login");
            return console.log("Login required ");
        }

        setLoading(true)





        //                              Usually created when you have to send files to backend
       //                                |
        const formDataToSend = new FormData();  //It is usually creates empty formData in this you can pass values
        formDataToSend.append('upload', formData.upload);
        formDataToSend.append('title', formData.title);
        formDataToSend.append('body', formData.body);

        try {
            const res = await fetch(`${import.meta.env.VITE_APP_URL}/:user/blog`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }, //Dont use 'Content-Type': 'application/json' as it is not able to transfer  large files like images
                body: formDataToSend,
            
            });

            if (res.ok) {
                const data = await res.json();
                setSuccess(true)

                //Reset Form
                setFormData({
                    upload: "",
                    title: "",
                    body: "",
                });


                //Resetting File
                if (fileRef.current) {
                    fileRef.current.value = ""
                }


                setError(false)

                // Auto-hide the alert after 3 seconds
                setTimeout(() => setSuccess(false), 2000);
            } else {
                setError(true)
                console.log("Error posting blog:",err, res.statusText);
            }
        } catch (err) {
            console.log("Error posting blog to the server", err);
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
            <Navbar />
            {success && (
                <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <span className="font-medium">Success!</span> Your blog has been posted.
                </div>
            )}

            <form onSubmit={handleUserSubmit} className="mg-t max-w-lg mx-auto" encType="multipart/form-data" >
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black" htmlFor="user_avatar">Upload Photo</label>
                <input className="block w-full text-sm text-black-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-black-400 focus:outline-none dark:bg-white-700 dark:border-gray-600" aria-describedby="user_avatar_help" id="user_avatar" type="file" name="upload" ref={fileRef} onChange={handleChange} required />

                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Title</label>
                <input id="title" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} value={formData.title} name="title" required />

                <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your message</label>
                <textarea id="body" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} value={formData.body} name="body" required></textarea>
                {error && <p className='text-red-700'>Error Posting Blog ! Please Try Again</p>}
                <button
                    className="mg-t align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="submit"
                >
                  {loading? "Adding..." : "Add Blog"}
                </button>
            </form>
        </>
    );
}

export default Blog;
