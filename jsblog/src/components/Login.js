import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
   
    const [username,setUsername]=useState(null)
    const [password,setPassword]=useState(null)

    const loginNow=async()=>{
        await Axios({
            method:"POST",
            url:"http://127.0.0.1:8000/login/",
            data:{
                'username':username,
                'password':password
            }
        }).then(response=>{
            
            // console.log(response.data['token'],"login page");
            window.localStorage.setItem('token',response.data['token'])
            notifySuccess()
            setTimeout(function(){ window.location.href="/" }, 1500); // window.location.href does page redirect and reload both 
              
            
            
        }).catch(()=>{
            notify()
        })
    }
     
    const notifySuccess = () => {
        toast.success('Succesfully Login', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            
    }
    const notify = () => {
        toast.warn('User Name or Password Wrong!!!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            });
            
    }

    return (
        <div>
        
        <div className="container" style={{marginTop:"100px"}}>   
        <div class="content-section">
        <fieldset class="form-group">
            <legend class="border-bottom mb-4">Log In</legend>
            <div>

                <div class="form-group">
                    <label >Username</label>
                    <input type="text"  onChange={(event)=>setUsername(event.target.value)} class="form-control" placeholder="Username" />
                </div>
                <div class="form-group">
                    <label >Password</label>
                    <input  type="password" onChange={(event)=>setPassword(event.target.value)} class="form-control" placeholder="Password" />
                </div>
            </div>
        </fieldset>
        <div class="form-group mt-2">
            <p class="btn btn-outline-info" onClick={loginNow} >Login</p>
            
        </div>
        <div class="border-top pt-3">
            <small class="text-muted">
                Need An Account?
                            <Link  to="/register/" class="ml-2">SignIn Up Now</Link>
            </small>
        </div>
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

</div>
    );
};

export default Login;