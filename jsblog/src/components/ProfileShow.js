import React,{useEffect} from 'react';
import { useStateValue } from '../State/StateProvider';
import Axios from 'axios';

const ProfileShow = () => {
    const [{profile},dispatch]=useStateValue()

    useEffect(()=>{
        const getprofile=async()=>{   // Just for reload the page we have to call the profile again 
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
        getprofile()

    },[])
    return (
        <div className="container">
            <div class="content-section">
            <div class="media">
                <img class="rounded-circle account-img" src={`http://127.0.0.1:8000${profile?.image}/`} alt="profileshow"/>
                <div class="media-body">
                    <h2 class="account-heading" style={{textTransform: 'uppercase'}}><small>username: </small>{profile?.user.username}</h2>
                    <p class="text-secondary">Email: {profile?.user.email}</p>
                    <p>Fullname: {profile?.user.first_name} {profile?.user.last_name}</p>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ProfileShow;