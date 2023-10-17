import React from 'react';
import Join from './components/join/join';
import Chat from './components/chat/chat';


import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Join />} />
      <Route path="/Chat" element={<Chat />} />
      
    </Routes>
  );
}
export default App;
