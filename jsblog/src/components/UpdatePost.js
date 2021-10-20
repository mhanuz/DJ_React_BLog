import React,{useEffect,useState} from 'react';
import { useParams , useHistory} from 'react-router-dom';
import Axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const UpdatePost = () => {
    const {id}=useParams()
    const history=useHistory()


    const [title,setTitle] = useState(null) // Div unmount error dekhale ei  {} dibo 
    const [description,setDescripton] = useState(null)
    const [image,setImage] = useState(null) // old image
    const [image1,setImage1] = useState("") //for new input image
    
    
    useEffect(() => {
        const getpostdata=async()=>{
            await Axios({
                method:"GET",
                url: `http://127.0.0.1:8000/api/${id}`,
                headers:{
                    Authorization: `token ${window.localStorage.getItem("token")}`
                }
            }).then(response=>{
                setTitle(response.data['title'])
                setDescripton(response.data['description'])
                setImage(response.data['image'])              
            })
        }
        getpostdata()
    },[])
    
    
    const updatePost=async()=>{
        if (title===null || title===''){
            titleEmpty()
        }
        else if (title.match(/[^\s\d,-_A-Za-z0-9]/g)){
            titleInvalid()
        }
        else if(description===null|| description===''){
            descInvalid()
        }else{
        let formField = new FormData()
        formField.append("title",title)
        formField.append("description",description)
        if(image1!==null){
            formField.append('image',image1)
        }
        await Axios({
            method:"PUT",
            url:`http://127.0.0.1:8000/api/${id}/`,
            data:formField,
            headers:{
                Authorization: `token ${window.localStorage.getItem("token")}`
            }
        }).then(response=>{
            console.log(response.data)
            oldPostUpdated()
            setTimeout(function(){ history.push("/")},2000)
        }).catch(()=>{
            alert("somthng is worng")
        })
    }
}   

        const titleEmpty=()=>{
            toast.error("You didn't write anything !!!", {
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
            toast.warn("The title can contain only alphabets and digits !!!", {
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

        const oldPostUpdated=()=>{
            toast.success("Post has been updated succesfully !!!", {
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
    <h1>Update</h1>
    <div className="p-3">
        <div class="form-group">
            <label>Title</label>
            <input onChange={(e) =>  setTitle(e.target.value) } type="text" class="form-control" value={title} />
            
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea onChange={(e) => setDescripton(e.target.value)} class="form-control" rows="3" value={description}></textarea>

        </div>
        <div class="form-group">
            <img className="update__image" src={image} alt="" srcset="" />
            <label>Ulpode Image</label>
            <input
                onChange={(e) => setImage1(e.target.files[0])}
                className="form-control"
                type="file" />
        </div>
    </div>
    <div>
        <p  className="btn btn-info" onClick={updatePost} >Update</p>
    </div>
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
</div>
    );
};

export default UpdatePost;