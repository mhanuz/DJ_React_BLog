import React from 'react';
import { useStateValue } from '../State/StateProvider';
import { useState } from 'react';
import Axios from 'axios';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import {useHistory} from 'react-router-dom';
const Profile = () => {
    const [{profile},dispatch]=useStateValue()
    const [email, setemail] = useState(profile?.user.email) 
    const [fname, setfname] = useState(profile?.user.first_name)
    const [lname, setlname] = useState(profile?.user.last_name)
    const [Image, setImage] = useState(null)
    const [reload,setReload] = useState('') 
    const history=useHistory()
    // If we can reload app.js automatically then don't need apply useEffect here, this peice of code will be generate from app.js file 
    //  But we use here for understanding purpose
    useEffect(()=>{
        const getprofile=async()=>{   // async keeps everything wait untill the function execution 
            await Axios({
                method:"GET",
                url:"http://127.0.0.1:8000/profile/",
                headers:{
                    Authorization:`token ${window.localStorage.getItem('token')}`
                }
            }).then(response=>{
                dispatch({
                  type:'add_profile',
                  value:response.data["userdata"]
                }) 
                
            })
        }
        getprofile() // Just for reload the page we have to call the profile again 

    },[reload])

    const userdataupdate=async()=>{

        if(fname.match(/[\s]/) || lname.match(/[\s]/)){
            nameSpaceInvalid()
        }
        else if (fname.match(/[^A-Za-z]/g) || lname.match(/[^A-Za-z]/g) ){
            userName()
        }
        else if ( (fname=== null || fname==='') || (lname=== null || lname==='')){
            nameInvalid()
        }
        
        else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
            emailMatch()
        }
        else{
            await Axios({
                method:"POST",
                url:'http://127.0.0.1:8000/userdataupdate/',
                data:{
                    'first_name':fname, //In that case we should focus on property name.Property Name must be same as database/ model fields.
                    'last_name':lname, //Here we use django user model fields the list of user model field in django are auth_token, date_joined,
                    'email':email, // email, first_name, last_name, password,username, post, profile, user_permissions,is_staff, is_superuser
                },
                headers:{
                    Authorization: `token ${window.localStorage.getItem("token")}`
                }
            }).then(response=>{
                console.log(response.data)
                setReload(response.data)
                Message()
                setTimeout(function(){ history.push("/") }, 1500);
            })
    }
}

    const userName = () => {
        toast.info('Name should be in alphabet!!!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            });
            
    }

    const nameInvalid = () => {
        toast.info('Invalid name', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            });
            
    }

    const nameSpaceInvalid = () => {
        toast.info('Please use single name, remove space if any !!!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            });
            
    }
    const emailMatch = () => {
        toast.info('Not a Valid email', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            });
            
    }
    const Message = () => {
        toast.success('Successfully Updated info', {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            });
            
    }

    const updateimage=async()=>{
        let formField = new FormData()
        formField.append('image',Image)
        await Axios({
            method:"POST",
            url:"http://127.0.0.1:8000/profileupdate/",
            data:formField,
            headers:{
                Authorization: `token ${window.localStorage.getItem("token")}`
            }
        }).then(response=>{
            console.log(response.data)
            setReload(response.data)
        })
    }


    return (
        <div className="container">
    <div>
        <div class="content-section">
            <div class="media">
                <img class="rounded-circle account-img" src={`http://127.0.0.1:8000${profile?.image}/`} alt="profileImage" />
                <div class="media-body">
                    <h2 class="account-heading">{profile?.user.username}</h2>
                    <small class="form-text text-muted">Username name is Fiexd</small>
                    <p class="text-secondary">{profile?.user.email}</p>
                    <p>{profile?.user.first_name} {profile?.user.last_name}</p>
                </div>
            </div>
            <form method="POST" enctype="multipart/form-data">

                <fieldset class="form-group">
                    <legend class="border-bottom mb-4">Profile Info</legend>
                    <div class="form-group">
                        <label>Uplode Profile Picture</label>
                        <div class="row">
                            <div class="col">
                                <input onChange={(e)=>setImage(e.target.files[0])} type="file" class="form-control" />
                            </div>
                            <div class="col">
                                <p onClick={updateimage} className="btn btn-info">Upload</p>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>First Name</label>
                        <input onChange={(e)=>setfname(e.target.value)} type="text" class="form-control" value={fname} />
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input onChange={(e)=>setlname(e.target.value)} type="text" class="form-control" value={lname} />
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input onChange={(e)=>setemail(e.target.value)} type="email" class="form-control" value={email} />
                    </div>
                </fieldset>
                <div class="form-group mt-2">
                    <p class="btn btn-outline-info" onClick={userdataupdate} >Update</p>
                </div>
            </form>
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
    );
};

export default Profile;