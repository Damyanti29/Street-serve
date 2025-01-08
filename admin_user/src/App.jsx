import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import SideBar from './components/sideBar/SideBar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/orders/orders'

const App = () => {
  const url="https://cafeteria-mern-backend.onrender.com"
  return (
    <div>
       <Navbar/>
       <hr/>
       <div className="app-content">
      <SideBar/>
     <Routes>
      <Route path='/add' element={<Add  url={url}/>}/>
      <Route path='/list' element={<List url={url} />}/>
      <Route path='/orders' element={<Orders url={url} />}/>
     </Routes>
       </div>
    </div>
  )
}

export default App
