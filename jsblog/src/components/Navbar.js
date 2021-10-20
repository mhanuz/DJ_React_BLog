import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../State/StateProvider';
const Navbar = () => {
    const [{profile}, dispatch]=useStateValue()

    const logOut=()=>{
        window.localStorage.clear()
        window.location.href="/"
    }
    return (
        <div className="site-header">
            <nav className="navbar navbar-expand-md navbar-dark bg-steel fixed-top">
                <div className="container">
                    <Link className="navbar-brand mr-4" to="/">Learn python</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarToggle">

                        <div className="navbar-nav ml-auto">
                            {
                                profile!==null? (
                                    <>
                                        <Link className="nav-item nav-link" to="/newpost">New Post</Link>
                                        <Link className="nav-item nav-link" to="/profile">Profile</Link>
                                        <Link className="nav-item nav-link" to="/" onClick={logOut} >Logout</Link>
                                        <Link style={{float:'right', textDecoration:"none", color:"white", marginLeft:"700px", marginTop:"6px"}} to="/profileshow"> Login as {profile?.user.username}</Link>
                                    </>
                                ):
                                (
                                <>
                                <Link className="nav-item nav-link" to="/login" >Login</Link>
                                <Link className="nav-item nav-link"  to="/register">Register</Link>
                                </>
                                )
                            }
                        
                                
                                
                                    
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;