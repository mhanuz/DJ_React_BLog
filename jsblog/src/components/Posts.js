import React,{useEffect,useState} from 'react';
import Axios from 'axios';
import SinglePost from './SinglePost';

const Posts = () => {
    const [posts, setPosts] = useState(null)
    const [reload,setReload] = useState(null)
    useEffect(() => {
        const getposts=async()=>{
            await Axios({
                method:"GET",
                url:"http://127.0.0.1:8000/api/",
                // headers:{
                //     Authorization : `token ${window.localStorage.getItem("token")}`
                // }
            }).then(response=>{
                console.log(response.data)
                setPosts(response.data)
                setReload(response.data)
            })
        }
        getposts()
    }, [reload])
    return (
        <div>
            {
                        posts!=null?(
                            <>
                                {
                                    posts.map((data,i)=>
                                    <SinglePost post={data} key={i} />
                                )
                                }
                                
                            </>
                        
                            )
                        
                        
                        :(<h1>Data is loading.....</h1>)
                    }
        </div>

    );
};

export default Posts;