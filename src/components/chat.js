import React,{useState} from 'react';
import io from 'socket.io-client';
import Messages from './messages';
import './chat.css';

const socket = io.connect("https://backend1app.herokuapp.com");

function Chat() {
    const [userName, setUsername] = useState("");
    const [room, setroom] = useState("");
    const [showChat,setShow]=useState(false);

    const joinRoom=()=>{
        if(userName!=="" && room!==""){
            socket.emit("join_room",room);
            setShow(true);

        }

    }

    return (
        <div className="Message">
            {!showChat?
          
            <div className="joinChatContainer">
                <input type="text" placeholder="you...." onChange={(event)=>{setUsername(event.target.value)}}/>
                <input type="text" placeholder="Room id....." onChange={(event)=>{setroom(event.target.value)}}/>
                <button onClick={joinRoom}> Join a Room</button>
            </div>
            :
            <Messages socket={socket} username={userName} room={room} />
        }
            
        </div>
    )
}

export default Chat
