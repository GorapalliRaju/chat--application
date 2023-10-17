import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import './chat.css';
import InfoBar from '../infoBar/infoBar';
import Input from '../input/input.js';
import Messages from '../messages/messages.js';
const socket = io('http://localhost:5000'); // Move it outside the component

function Chat() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const data = new URLSearchParams(location.search);
    const name = data.get('name');
    const room = data.get('room');
    
    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, (error) => {
      if(error){
        console.error(error);
      }
    });

    return () => {
      socket.disconnect(); 
    };
  }, [location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []); 

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="innerContainer">
        <InfoBar room={room}/>
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    </div>
  );
}

export default Chat;

