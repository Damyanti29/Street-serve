import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/frontend_assets/assets'
const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For better experience download app</p>
        <div className="app-download-platform">
      <button>  <img src={assets.play_store} alt="" /> </button>
      <button> <img src={assets.app_store} alt="" /></button>
       
        </div>
     
    </div>
  )
}

export default AppDownload
