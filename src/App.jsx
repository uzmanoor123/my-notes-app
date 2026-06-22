import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "../Pages/Home"
import Notes from "../Pages/Notes"
function App() {
 

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
