import {server} from "../store";
import axios from "axios"

export const login =(email,password)=> async dispatch=>{
    try{
        dispatch(
                {
                    type:'loginrequest'
                }
            );
        const {data} = await axios.post(`${server}/login`, {email,password},{
            headers:{
                "Content-type":"application/json"
            },withCredentials:true,
        });
        console.log(data);

        dispatch({type:'loginsuccess',payload:data});
    }catch(error){
        dispatch({type:'loginfail',payload:error.response.data.message});

    }
}

export const getmyprofile =()=> async dispatch=>{
    try{
        dispatch({type:'loaduserrequest'});
        const {data} = await axios.get(`${server}/me`, 
        {
            withCredentials:true,
        });
        console.log(data);

        dispatch({type:'loadusersuccess',payload:data.user});
    }catch(error){
        dispatch({type:'loaduserfail',payload:error.response.data.message});

    }
}