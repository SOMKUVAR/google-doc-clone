import { useEffect, useState } from 'react'
import TextEditor from './Texteditor'
import {BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { v4 as uuidV4} from 'uuid';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<RedirectComponent/>}/>
        <Route path='/document/:id' element={<TextEditor/>}/>
      </Routes>
    </Router>
  )
}

const RedirectComponent = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    const dynamicPath = `/document/${uuidV4()}`;
    navigate(dynamicPath);
  },[navigate])
}

export default App
