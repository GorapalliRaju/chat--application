// App.js
import React from 'react';
import Join from './components/join/join';
import Login from './components/login/login';
import Chat from './components/chat/chat';
import Register from './components/register/register';
import { Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Join" element={<Join />} />
      <Route path="/Chat" element={<Chat />} />
      <Route path="/Register" element={<Register />}
      />
    </Routes>
  );
}

export default App;
