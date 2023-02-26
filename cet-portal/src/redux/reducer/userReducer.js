import { createReducer } from "@reduxjs/toolkit";

export const userReducer=createReducer({},{
    loginrequest:(state)=>{

        state.loading=true;
    },
    loginsuccess:(state, action)=>{
        state.loading=false;
        state.isAuthenticated=true;
        state.user= action.payload.user;
        state.message= action.payload.message;

    },
    loginfail:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=false;
        state.error= action.payload;
        
    },

    loaduserrequest:(state)=>{

        state.loading=true;
    },
    loadusersuccess:(state, action)=>{
        state.loading=false;
        state.isAuthenticated=true;
        state.user= action.payload;
       

    },
    loaduserfail:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=false;
        state.error= action.payload;
        
    },

    clearError:(state)=>{
        state.error=null;
    },
    clearMessage:(state)=>{
        state.message=null;
    }
    
})