import React,{useState} from 'react'
import { Grid,Button,TextField,Link } from '@material-ui/core';

function Posttitle(props) {
    const abc={
        title:"",
        description:""
    } 
    // let to=props.token;
    const [formData,setForm]=useState(abc);
    const {title,description}=formData
    const[tok,setTok]=useState(props.token);

    const changeHandle = e =>{
        setForm({...formData,[e.target.name]:e.target.value});
        
        console.log(formData)

    }

    const  SubmitHandle = async  e  =>{
        e.preventDefault();

        try{
            const tokk = props.token;
            let token="Bearer " + tok;
            // console.log(tokk);
            // let token= "Bearer "+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGQ5OGFiMGE0ZGM3MDE4ODRmMjhjZWMiLCJ1c2VybmFtZSI6ImFobWVkIiwiaWF0IjoxNjI0OTcwNzQ0LCJleHAiOjE2MjQ5NzQzNDR9.zvISvBAkIqoMM4hcL15R-rJCSLOpUtb9hiRlcXGcKqI";
            // console.log(token);
            
            const responseData = await fetch('https://backend1app.herokuapp.com/title/post',
            {
                method:'POST',
               
                headers:{
                    'Authorization':token,
                
                    'Accept':'application/json',
                    'Content-type':'application/json'
       
                },
                body:JSON.stringify(formData),
               
               })
           
            responseData.json()
            .then((res)=>{
                if  (res.message){
                    throw(res.message);
                }
                // setToken(res.token);
                // setuser(res.username);
                // setUser(res.username);
                console.log(res.title);
               

            })
            .catch((err)=>{
                console.log(err);
                // setError(err);

            })
            
          
        }
        catch (err){
            // setError(err);
            console.log("error before");

        }
        
    }

    return (
        <div>
            <Grid container>
                <Grid item lg={3}>
                    <form onSubmit={SubmitHandle}>
                    <TextField 
                     fullWidth 
                     type="text"
                     
                     label="title" 
                     variant="outlined" 
                     size="small"
                      name="title"
                      onChange={changeHandle}/>
                    <br/>
                    <br/>
                    <TextField 
                    
                     type="text"
                     fullWidth
                      label="description"
                       variant="outlined" 
                       size="small" 
                       onChange={changeHandle}
                       name="description"/>
                    <br/>
                    <br/>

                    <Button type="submit" fullWidth color="primary" variant="contained">POST</Button>
                    </form>
                </Grid>
            </Grid>
            
        </div>
    )
}

export default Posttitle
