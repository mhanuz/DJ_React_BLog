import React,{useEffect} from "react";
import Axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,useHistory
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './components/Home';
import PostDetails from './components/PostDetails';
import Profile from './components/Profile';
import { useStateValue } from './State/StateProvider';
import Login from './components/Login';
import Register from './components/Register';
import NewPost from './components/NewPost';
import UpdatePost from './components/UpdatePost';
import UserAllposts from './components/UserAllposts';
import NotFound from './components/NotFound';
import UnauthPostDetatils from "./components/UnauthPostDetatils";
import UnAuthUserAllposts from "./components/UnAuthUserAllposts";
import ProfileShow from "./components/ProfileShow";
function App() {
  const [{profile},dispatch]=useStateValue()
  const history=useHistory()
  
  useEffect(() => {
    try{const getprofile=async()=>{
        await Axios({
            method:"GET",
            url:"http://127.0.0.1:8000/profile/",
            headers:{
                Authorization:`token ${window.localStorage.getItem("token")}`
            }
        }).then(response=>{
            dispatch({
              type:'add_profile',
              value:response.data["userdata"]
            }) 
            
        })
    }
    getprofile()}
    catch{
      history.push("/login")
      dispatch({
        type:'add_profile',
        value: null,
      })
    }
}, [])
  return (
    <Router>
      <Navbar/>

      
        {
          profile !==null? (
            
            <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profileshow" component={ProfileShow} />
            <Route exact path="/newpost/" component={NewPost} />
            <Route exact path="/update/:update/:id" component={UpdatePost} />
            <Route exact path="/details/:details/:id/" component={PostDetails} />
            <Route path="/userallapost/:id" component={UserAllposts} />
            <Route path="*" component ={NotFound} />
            </Switch>
          ):(
            <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/details/:details/:id/" component={UnauthPostDetatils} />
            <Route path="/userallapost/:id" component={UnAuthUserAllposts} />
            <Route path="*" component ={NotFound} />
            </Switch>
          )
        }
        
        
      
    </Router>
  );
}

export default App;

