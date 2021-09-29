import React,{useState,useEffect} from 'react';
import './chat.css';
import ScrollToBottom from 'react-scroll-to-bottom';

function Messages({socket,username,room}) {
    const [currentMessage,setcurrentmessage] = useState(''); 
    const [messageList,setmessageList] = useState([]); 

    const sendMessage = async() => {
        if(currentMessage!==''){
            const messageData = {
                room:room,
                author:username,
                message:currentMessage,
                time: new Date(Date.now()).getHours() +":"+new Date(Date.now()).getMinutes()

            }
            await socket.emit("send_message",messageData);
            setmessageList((list)=>[...list,messageData]);
            


        }
    }

    useEffect(() => {
       
       socket.on("recieve_message",(data)=>{
           setmessageList((list)=>[...list,data]);
          

       })
    }, [socket])
     return (
        <div className="chat-window">
           <div className="chat-header">
               <p>Live Chat</p>
           </div>
           <div className="chat-body">
               <ScrollToBottom className="message-container">
               {messageList.map((content)=>{
                   return(
                       <div className="message" id={username === content.author?"you":"other"}>
                           <div className="message-content">
                               <p>{content.message}</p>
                            </div>
                               
                                <div className="message-meta">
                                    <p>{content.time}</p>
                                    <p>{content.author}</p>
                               
                               </div>
                          

                       </div>
                   )

               })
               }
               </ScrollToBottom>
           </div>
           <div className="chat-footer">
               <input type="text"
               onChange={(event)=>{setcurrentmessage(event.target.value)}}
                placeholder="hey......"/>
               <button onClick={sendMessage}>
                    entr
               </button>
           </div>
            
        </div>
    )
}

export default Messages
