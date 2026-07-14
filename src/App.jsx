import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home"
import Notes from "./Pages/Notes"
import Register from './Pages/Register';
import Login from './Pages/Login';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
         <Route path='/register' element={<Register/>} />
        <Route path= '/login' element={<Login/>} />
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/notes/:id" element={<Notes />} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
