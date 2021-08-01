import React ,{useState,useEffect,useCallback}from 'react';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"; 
import Hello from './components/hello';
import Confirm from './components/confirm';
import Login from "./components/login";
// import Dashboard from "./components/Dashboard";
import Signup from "./components/signup";
import { AuthContext } from "./components/auth";


let logoutTimer;

const  App=() => {

  const [token,setToken]=useState(false);
  const [user,setUserr]=useState(null);
  const[tokenRemainingtime,setTokenRemainingtime]=useState();

  const login = useCallback(
    (username,token,expirationDate) => {
      setToken(token);
      setUserr(username);

      const tokenexpirationDate = expirationDate || new Date(new Date().getTime() + 1000*60*60);
      setTokenRemainingtime(tokenexpirationDate);
           localStorage.setItem(
           'userData',
            JSON.stringify({
              token:token,
              user:username,
              expiration:tokenexpirationDate.toISOString()
      }));
     
    },
    [],
  )

  const logout = useCallback(
    () => {
      setToken(null);
      setTokenRemainingtime(null);
      localStorage.removeItem('userData');
    },
    [],
  )

  useEffect(() => {
    if(token&&tokenRemainingtime){
      const remainingTime = tokenRemainingtime.getTime() - new Date().getTime();

      logoutTimer = setTimeout(logout,remainingTime);
      console.log(logoutTimer);
    }
    else{
      clearTimeout(logoutTimer);
    }
    
   
  }, [token,logout,tokenRemainingtime])



  useEffect(() => {

    
    const storedData =JSON.parse(localStorage.getItem('userData'));
      if(
        storedData&& 
        storedData.token &&  
        new Date(storedData.expiration) > new Date())
      {
        login(storedData.user,storedData.token, new Date(storedData.expiration))
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
