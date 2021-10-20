import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import slugify from 'react-slugify';
const UserAllposts = () => {
    const {id} =useParams();
    const [posts, setPosts] = useState(null)
    const  [singleuserposts,setSingleUserPosts] = useState(null)

    useEffect(() => {
        const getposts=async()=>{
            await Axios({
                method:"GET",
                url:"http://127.0.0.1:8000/api/",
                headers:{
                    Authorization : `token ${window.localStorage.getItem("token")}`
                }
            }).then(response=>{
                setPosts(response.data) 
            })
        }
        getposts()
    }, [])
    const userData=(id)=>{
        const userallPosts = posts?.filter((data)=> data.user.id == id)
        console.log(userallPosts, "single post")
        setSingleUserPosts(userallPosts)
    }
    
    return (
        <div>
            
            
            {
                singleuserposts === null? (<div style={{width:"400px", height:"400px", marginTop:"10px",
                margin:"auto",
                backgroundColor:"honeydew", alignItems:"center"}}>
                        <h1 style={{padding:"20px"}}>Would you like to see all the posts of this user??</h1>
                        <button onClick={()=>userData(id)} style={{marginLeft:"135px"}}>Yes I am !</button>
                        <button style={{marginLeft:"95px", marginTop:"5px"}}><Link to="/" style={{textDecoration:'none', color:"black"}}>No, Back Me Home !</Link></button>
                    </div>) :(<div>
                    {
                        singleuserposts.map((post,i)=>
                        <div class="media content-section">
                        <img class="rounded-circle article-img" src={`http://127.0.0.1:8000${post.user.image}/`} alt="userimage" />
                        <div class="media-body">
                                <div class="article-metadata">
                                    <small class="mr-2">Posted by:{post.user.user.username}</small>               
                                    <small class="text-muted"> Date:{post.date}</small>
                                </div>
                                <h2><Link class="article-title" to={`/details/${slugify(post.title).slice(0,25)}/${post.id}/`}>{post.title}</Link></h2>
                                <p class="article-content" style={{textAlign: "justify", textIndent: '50px'}}>{post.description}</p>  
                                       
                        </div>
                    </div>
                        )
                    }
                </div>)
            }

        </div>
    );
};

export default UserAllposts;