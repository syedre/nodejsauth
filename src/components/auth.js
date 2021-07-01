import { createContext } from "react";

export const AuthContext= createContext({
   username:null,
    token:false,
    login:()=>{},
    logout:()=>{}
    
});