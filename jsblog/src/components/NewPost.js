import React,{useState} from 'react';
import Axios from 'axios'
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const NewPost = () => {
    const [title,setTitle]=useState(null)
    const [content,setContent]=useState(null)
    const [image,setImage]=useState(null)

    const location = useHistory()
    const addNewPost=async()=>{
        if (title===null || title===''){
            titleEmpty()
        }
        else if (title.match(/[^\s\d,-_A-Za-z]/g)){
            titleInvalid()
        }
        else if(content===null|| content===''){
            descInvalid()
        }
        else{
        let formField = new FormData()
        formField.append("title",title)
        formField.append("description",content)
        if(image!==null){
            formField.append('image',image)
        }
        await Axios({
            method:"POST",
            url:"http://127.0.0.1:8000/api/",
            data:formField,
            headers:{
                Authorization: `token ${window.localStorage.getItem("token")}`
            }
        }).then(response=>{
            console.log(response.data)
            newPostCreated()
            setTimeout(function(){location.push("/")},2000)           
        })
    }
}
    const titleEmpty=()=>{
        toast.info("You didn't write anything !!!", {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored" ,
            });
    }

    const titleInvalid=()=>{
        toast.info("The title can contain only alphabets and digits !!!", {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored" ,
            });
    }

    const descInvalid=()=>{
        toast.info("Invalid description !!!", {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored" ,
            });
    }

    const newPostCreated=()=>{
        toast.success("Post has been created succesfully !!!", {
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
        <div className="container">
    <div class="form-group">
        <label >Title</label>
        <input onChange={(e)=> setTitle(e.target.value)} type="text" class="form-control" placeholder="Post title" />
    </div>
    <div class="form-group">
        <label >Description</label>
        <textarea onChange={(e)=> setContent(e.target.value)} placeholder="Description" class="form-control" rows="3"></textarea>
    </div>
    <div class="form-group">
        <label >Image</label>
        <input onChange={(e)=> setImage(e.target.files[0])} type="file" class="form-control" />
    </div>
    <p  className="btn btn-info my-2" onClick={addNewPost}>New Post</p>
    <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </div>
    );
};

export default NewPost;