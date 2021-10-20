import React from 'react';
import { Link } from 'react-router-dom';

const UnauthPostDetatils = () => {
    return (
        <div style={{width:"400px", height:"400px", marginTop:"10px",
        margin:"auto",
        backgroundColor:"honeydew", alignItems:"center"}}>
            <h3 style={{padding:"20px"}}>
            You are not authorized person.If you have an account please <Link to="/login">login </Link> if not <Link to="/register"> register </Link>yourself please.
            </h3>
        </div>
    );
};

export default UnauthPostDetatils;