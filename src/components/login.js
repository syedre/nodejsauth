import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { Grid,Button,TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Dashboard from './Dashboard';




function Login() {
    const abc={
        username:"",
        password:""
    }
   
    const [formData,setForm]=useState(abc);
    const {username,password}=formData
    const[token,setToken]=useState(null);
    const[uid,setuser]=useState(null);
    const[error,setError]=useState(null);

    // for reloading when username changes
    const[u1,setU1]= useState(username);
    const[p1,setP1]= useState(password);
    let history =useHistory();

    const changeHandle = e =>{
        setForm({...formData,[e.target.name]:e.target.value});
        setU1(e.target.username);
        console.log('abc')

    }

                useEffect(() => {
                    if(token){
                    setError(null);
                   
                    // history.push('/dashboard')
                    }
                    
                }, [token])



     

       const  SubmitHandle = async  e  =>{
        e.preventDefault();

        try{
            const responseData = await fetch('http://localhost:8000/login',
            {
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-type':'application/json'
       
                },
                body:JSON.stringify(formData)   
               })
           
            responseData.json()
            .then((res)=>{
                if  (res.message){
                    throw(res.message);
                }
                setToken(res.token);
                setuser(res.username);
               

            })
            .catch((err)=>{
                console.log(err);
                setError(err);

            })
            
          
        }
        catch (err){
            // setError(err);
            console.log("error before");

        }
        
    }
    return (
        <>

        { !token
        ?
            <Grid container 
            direction="column" 
            justify="center"
            alignItems="center"
            style={{ minHeight: '90vh' }} >
                <Grid item lg={3} xs={10} style={{padding:"25px"}}>

                  <Grid>
                      <Grid item lg={12}>
                          <div style={{textAlign:"left",marginBottom:"20px",fontWeight:'bold',fontSize:"25px",color:"#3F51B5"}}>LOGIN</div>
                      </Grid>
                  </Grid>  


                <form onSubmit={SubmitHandle}>
                
                
                <TextField 
                    style={{marginBottom:"20px"}}
                    size="small" 
                    label="UserName" 
                    variant="outlined" 
                    fullWidth type="text" 
                    name="username" 
                    value={username} 
                    onChange={changeHandle} 
                />
              

               
                   
                 <TextField  
                        style={{marginBottom:"20px"}}
                        size="small" 
                        fullWidth 
                        variant="outlined" 
                        label="Password" 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={changeHandle}
                    />
              
                    <Button 
                    type="submit" 
                    fullWidth 
                    variant="contained" 
                    color="primary">
                        Submit
                    </Button>
            </form>
            <Grid container style={{marginTop:"20px"}}>
                <Grid item lg={12}>
                        {error && <>
                        <Alert severity="error">{error}</Alert>
                    </>}
                    <br/>
                    {!error&&
                    <div>{uid}</div>
                    }
                </Grid>
            </Grid>
                   

                </Grid>
            </Grid>
            :

            <Dashboard  username={uid} />

             }
           
            
          

           

            
        </>
    )
}

export default Login
