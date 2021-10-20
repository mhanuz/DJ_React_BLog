import React,{useState,useEffect} from 'react';
import { useParams,useHistory } from 'react-router-dom';
import Axios from 'axios'
import { Link } from 'react-router-dom';
import { useStateValue } from '../State/StateProvider';
import slugify from 'react-slugify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const PostDetails = () => {

    const [{profile},dispatch]=useStateValue()
    const {id}=useParams()
    const [post,setPost]=useState(null)
    const history=useHistory()
    
    useEffect(() => {
        const getpostdata=async()=>{
            await Axios({
                method:"GET",
                url:`http://127.0.0.1:8000/api/${id}/`,
                headers:{
                    Authorization: `token ${window.localStorage.getItem("token")}`
                }
            }).then(response=>{
                setPost(response.data)
            })
        }
        getpostdata()
    })

    
    const deletePost=async()=>{
        await Axios({
            method:"DELETE",
            url:`http://127.0.0.1:8000/api/${id}`,
            headers:{
                Authorization: `token ${window.localStorage.getItem("token")}`
            }
        }).then(response=>{
            console.log(response.data)
            history.push("/")        

        }).catch(()=>{
            alert('something is wrong')
        })
    
    }

    const keepWaitDelete=()=>{
        oldPostDeleted()
        setTimeout(function(){ deletePost()}, 2000)
    }

    const oldPostDeleted=()=>{
        toast.success("Post has been deleted succesfully !!!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored" ,
            });
    }

    return (
        <div>
            {
                profile!==null? (
        <div className="container">
            
            <article class="media content-section">
                <img class="rounded-circle article-img" src={`http://127.0.0.1:8000${post?.user?.image}/`} alt="pic"/>
                <div class="media-body">
                    <div class="article-metadata">
                        <a class="mr-2" href={`/userallapost/${post?.user?.id}`}>{post?.user?.user?.username}</a>
                        <small class="text-muted">{post?.date}</small>
                        {
                            profile?.user['id'] === post?.user?.user?.id && (
                                <div>
                                    <Link to={`/update/${slugify(post.title).slice(0,25)}/${post?.id}`} class="btn btn-secondary btn-sm mt-1 mb-1" >Update</Link>
                                    <button onClick={keepWaitDelete} class="btn btn-danger btn-sm mt-1 mb-1">Delete</button>
                                </div>
                            )
                        }

                    </div>
                    <h2 class="article-title">{post?.title}</h2>
                        <img className="article_content_image" src={post?.image} alt="postimage" style={{width:"600px", height:"400px"}} />
                    <p class="article-content">{post?.description}</p>
                </div>
            </article>
            <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
        </div>):(<div style={{width:"400px", height:"400px", marginTop:"10px",
                             margin:"auto",
                             backgroundColor:"honeydew", alignItems:"center"}}>
                
                        <h3 style={{padding:"20px"}} >You are an unauthorized person. Please logged in to see details. Thanks to visit.</h3>
                        <button style={{marginLeft:"135px"}}><Link to="/" style={{textDecoration:'none'}}>Back to home</Link></button>
                    </div>)
                }


        </div>
    );
};

export default PostDetails;