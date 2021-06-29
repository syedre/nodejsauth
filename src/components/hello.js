import React,{useEffect,useState} from 'react'
import Form from './form';


const  Hello = () =>{
    const [initialstate,setinitial]=useState([]);

    const getData = async () => {
        const response = await fetch('https://backend1app.herokuapp.com/getuserdata');
        
       const data = await response.json();
        // console.log(data);
        setinitial(data)

    }

    useEffect( ()=>{
        // const response = await fetch('http://localhost:8000/user');
        getData();
        
       
    },[])

    return (
        <div>
            Hello
          
            {initialstate.map((abc)=>{
                const {title,description} = abc;
                return(
                <div>
                    {/* {title} */}

                    <br/>
                    {/* {description} */}
                    {/* {lastname} */}
                </div>
                )

            })}
            <center>
            <Form/>
            </center>
            
        </div>
    )
}

export default Hello
