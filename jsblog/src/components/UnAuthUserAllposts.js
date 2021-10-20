import React from 'react';
import { Link } from 'react-router-dom';

const UnAuthUserAllposts = () => {
    return (
        <div style={{width:"400px", height:"400px", marginTop:"10px",
        margin:"auto",
        backgroundColor:"honeydew", alignItems:"center"}}>
            <h3 style={{padding:"20px"}}>
            Authenticated token not found. You are not authorized person. Would you like to see all the posts of this user, <Link to="/login">login </Link> or <Link to="/register"> register </Link>yourself please.
            </h3>
        </div>
    );
};

export default UnAuthUserAllposts;