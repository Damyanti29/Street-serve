import React from 'react'
import './Explore.css'
import { menu_list } from '../../assets/frontend_assets/assets'
const Explore = ({category,setCategory}) => {
  return (
    <div className="Explore" id="Explore">
        <h1>Explore our Menu</h1>
        <p className="Explore-text">Choose from diverse menu your favourite</p>
        <div className="explore-list">
            {menu_list.map((item,index)=>{
            return  <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}key={index}className="explore-list-item">
                <img src={item.menu_image} alt="" className={category===item.menu_name?"active":""} />
                <p>{item.menu_name}</p>
            </div>
            })}
        </div>
        <hr/>
    </div>

  )
}

export default Explore
