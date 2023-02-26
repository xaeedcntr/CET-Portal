import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route,Routes} from "react-router-dom"
import Home from './components/Home/Home';
import Header from './components/Layout/Header/header';
import Courses from './components/courses/Courses';
import Footer from './components/Layout/footer/Footer';
import Login from './components/Auth/Login';
import Signup from './components/Auth/signup';
import Forgetpassword from './components/Auth/Forgetpassword';
import Resetpassword from './components/Auth/resetpassword';
import Contactus from './components/Contactus/Contactus';
import Request from './components/request/Request';
import About from './components/About/About';
import Coursepage from './components/coursepage/coursepage';
import Profile from './components/Profile/profile';
import Changepassword from './components/Profile/changepassword';
import Updateprofile from './components/Profile/updateprofile';
import AdminDashboard from './components/Admin/Dashboard/Dashboard';
import Admincourses from './components/Admin/Admincourses/admincourses';
import Createcourse from './components/Admin/createcourse/createcourse';
import Users from './components/Admin/users/users';
import {useDispatch, useSelector} from "react-redux";
import toast,{Toaster} from "react-hot-toast";
import { getmyprofile } from './redux/action/useraction';

function App() {  

  window.addEventListener("contextmenu",(e)=>{
    e.preventDefault();
  })

  const {isauthenticated,user, message, error}= useSelector(state=>state.user);

  const dispatch=  useDispatch();

useEffect(()=>{
  if(error){
    toast.error(error);
    dispatch({type:'clearError'});
  }
  if(message){
    toast.success(message);
    dispatch({type:'clearMessage'});
  }
},[dispatch]);

useEffect(()=>{
 dispatch(getmyprofile())
},[dispatch,error,message]);


  return (<Router>

<Header isauthenticated={isauthenticated} user={user} />
    <Routes>
    
      <Route path="/" element={<Home />} />
      <Route path="/updateprofile" element={<Updateprofile />} />
      <Route path="/changepassword" element={<Changepassword />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/course/:id" element={<Coursepage />} />
      <Route path="/about" element={<About />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/contactus" element={<Contactus />} />
      <Route path="/request" element={<Request />} />
      <Route path="/login" element={<Login /> } />
      <Route path="/signup" element={<Signup /> } />
      <Route path="/forgetpassword" element={<Forgetpassword /> } />
      <Route path="/resetpassword/:token" element={<Resetpassword /> } />

      {/*Admin routes*/}

      <Route path="/admin/dashboard" element={<AdminDashboard /> } />
      <Route path="/admin/creatcourse" element={<Createcourse /> } />
      <Route path='/admin/courses' element={<Admincourses />}/>
      <Route path='/admin/users' element={<Users />}/>
    
    </Routes>
    <Footer />
    <Toaster />
  </Router>
  );  
}

export default App;
