import React,{useState} from 'react';
import { Link,useHistory } from 'react-router-dom';
import Axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
const Register = () => {
    const [username,setUsername]=useState(null)
    const [password1,setPassword1]=useState(null)
    const [password2,setPassword2]=useState(null)
    const history=useHistory()
    const registerNow=async()=>{

        if (username===null){
            userNameEmpty()
        }
        else if (username===''){
            userNameEmpty()
        }
        
        else if(username.match(/[0-9]/g)) {
            userNameNumber()
        }
        else if(username.match(/[^A-Za-z]/g)) {
            userNameSpecialCharacter()
        }

        else if (password1===null || password2===null){
            passWordNull()
        }
        else if (!password1.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g)){
            passWordFormat()
        }
        else{
            if(password1===password2){ 
                await Axios({
                    method:"POST",
                    url:"http://127.0.0.1:8000/register/",
                    data:{
                        'username':username,
                        'password':password1,
                    }

                }).then(response=>{
                    console.log(response.data)
                    Message()
                    setTimeout(function(){ history.push("/login") }, 3000);
                    
                }).catch(()=>{
                    errorMSG()
                })
            }
            else{
                missMatch()
                
            }
        }
    }

    const userNameEmpty=()=>{
        toast.warn("You didn't enter username", {
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

    const userNameNumber=()=>{
        toast.error('User name should be alphabet not digit!!', {
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
    const userNameSpecialCharacter=()=>{
        toast.error('User name should not contain special Character!!', {
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

    const passWordNull=()=>{
        toast.error('PassWord Shuold not be empty!!', {
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

    const passWordFormat=()=>{
        toast.error('Minimum eight characters, one letter and one number!!', {
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

    const Message = () => {
        toast.success('Successfully Registered!', {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }

    const errorMSG = () => {
        toast.error('Someting wrong with your data!', {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }

    const missMatch = () => {
        toast.warn(' You password does not match input correctly!', {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
    return (
        <div className="container">
    <div class="content-section">
        <fieldset class="form-group">
            <legend class="border-bottom mb-4">Register Now</legend>
            <div>
                <div class="form-group">
                    <label>Username</label>
                    <input  type="text" onChange={(event)=>setUsername(event.target.value)} class="form-control" placeholder="Username" />
                </div>
                <div class="form-group">
                    <label >Password</label>
                    <input type="password" onChange={(event)=>setPassword1(event.target.value)} class="form-control" placeholder="Password" />
                </div>

                <div class="form-group">
                    <label>Confirm Password</label>
                    <input type="password" onChange={(event)=> setPassword2(event.target.value)}  class="form-control" placeholder="Password" />
                </div>
            </div>
        </fieldset>
        <div class="form-group mt-2">
            <p class="btn btn-outline-info" onClick={registerNow}>Register</p>
        </div>
        <div class="border-top pt-3">
            <small class="text-muted">
                Have An Account?
                            <Link class="ml-2" to="/login">SignIn In Now</Link>
            </small>
        </div>
    </div>
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
</div >
    );
};

export default Register;