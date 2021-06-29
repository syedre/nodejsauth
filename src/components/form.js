import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';


function Form() {
    const abc={
        title:"",
        description:""
    }
    let history =useHistory();
    const [formData,setForm]=useState(abc);
    const {title,description}=formData


     const changeHandle = e =>{
        setForm({...formData,[e.target.name]:e.target.value});
        console.log('abc')

    }

       const SubmitHandle =(e)=>{
        e.preventDefault();
        fetch('https://backend1app.herokuapp.com/post',{
         method:'POST',
         headers:{
             'Accept':'application/json',
             'Content-type':'application/json'

         },
         body:JSON.stringify(formData)   
        }).then((result)=>{
            console.warn("result",result);
        })
        history.push('/confirm')
        
        // console.log(formData);
    }
    return (
        <div>
            <form onSubmit={SubmitHandle}>
                <div>title</div>
                
                <input type="text" name="title" value={title} onChange={changeHandle} />
                <br/>

                <div>
                    <div>description</div>
                <input type="text" name="description" value={description} onChange={changeHandle}/>
                </div>
                <button type="submit">submit</button>
            </form>

           

            
        </div>
    )
}

export default Form
