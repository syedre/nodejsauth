import React ,{useState,useEffect}from 'react';
import { Grid,Button,TextField,Link } from '@material-ui/core';
import Login from './login';
import Alert from '@material-ui/lab/Alert';

function Signup() {
    const abc={
        username:"",
        password:""
    }
 
 const [error,setError]=useState(null);
   const[userid,setUser]=useState(null);
    const [formData,setForm]=useState(abc);
    const {username,password}=formData

    useEffect(() => {
        if(userid){
        setError(null);
       
        // history.push('/dashboard')
        }
        
    }, [userid])


    const changeHandle = e =>{
        setForm({...formData,[e.target.name]:e.target.value});
        
        console.log(formData)

    }

    const  SubmitHandle = async  e  =>{
        e.preventDefault();

        try{
            const responseData = await fetch('http://localhost:8000/signup',
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
                // setToken(res.token);
                // setuser(res.username);
                setUser(res.username);
                console.log(res.username);
               

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
        <div>
           
            
            <Grid container 
            direction="column" 
            justify="center"
            alignItems="center"
            style={{ minHeight: '90vh' }} >
                <Grid item lg={3} xs={10} style={{padding:"25px"}}>

                  <Grid>
                      <Grid item lg={12}>
                          <div style={{textAlign:"left",marginBottom:"20px",fontWeight:'bold',fontSize:"25px",color:"#3F51B5"}}>SIGN UP</div>
                      </Grid>
                  </Grid>  


                <form onSubmit={SubmitHandle}>
                
                
                <TextField 
                    style={{marginBottom:"20px"}}
                    required
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
                        required
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
                        SIGN UP
                    </Button>
            </form>
            <Grid container style={{marginTop:"20px"}}>
                <Grid item lg={12}>
                    <Link href="/login" >login
                        </Link>
                    </Grid>
            </Grid>

            <Grid container style={{marginTop:"20px"}}>
                <Grid item lg={12}>
                         { userid && <>
                        <Alert severity="success">Your account has been created</Alert>
                    </>
                        }
                   
                </Grid>
            </Grid>

            <Grid container style={{marginTop:"20px"}}>
                <Grid item lg={12}>
                         {error && <>
                        <Alert severity="error">{error}</Alert>
                    </>
                        }
                   
                </Grid>
            </Grid>

            
            </Grid>
            </Grid>
            
        </div>
    )
}

export default Signup
