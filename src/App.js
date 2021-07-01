import React ,{useState,useEffect,useCallback}from 'react';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"; 
import Hello from './components/hello';
import Confirm from './components/confirm';
import Login from "./components/login";
// import Dashboard from "./components/Dashboard";
import Signup from "./components/signup";
import { AuthContext } from "./components/auth";

const  App=() => {

  const [token,setToken]=useState(false);
  const [user,setUserr]=useState(null);

  const login = useCallback(
    (username,token) => {
      setToken(token);
      setUserr(username);
      
    localStorage.setItem('userData',JSON.stringify({token:token,user:username}));
     
    },
    [],
  )

  const logout = useCallback(
    () => {
      setToken(null);
      localStorage.removeItem('userData');
    },
    [],
  )

  useEffect(() => {

    const storedData =JSON.parse(localStorage.getItem('userData'));
      if(storedData&& storedData.token){
        login(storedData.user,storedData.token)
      }
    
    
  }, [login])

 

  


  return (

    <AuthContext.Provider value={{username:user,token:token,login:login,logout:logout}}>
        <Router >
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/confirm" component={Confirm}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>


        </Switch>

      
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
