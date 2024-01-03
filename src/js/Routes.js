import { Routes, Route, Link ,BrowserRouter} from 'react-router-dom';
import React from 'react'
import Home from '../js/pages/home'
import About from '../js/pages/about'

export default function RouterFile() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
