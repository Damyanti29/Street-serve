// import React, { useState } from 'react'
// import './Navbar.css'
// import { assets } from '../../assets/frontend_assets/assets'
// import { Link ,useNavigate} from 'react-router-dom';
// import { useContext } from 'react';
// import { StoreContext } from '../context/StoreContext';


// const Navbar = ({setShowLogin}) => {

//     const [menu,setMenu]=useState("menu");
//     const {getTotalCartAmount,token,setToken}=useContext(StoreContext)

//     const navigate = useNavigate();

//     const logout =()=>{
//       localStorage.removeItem("token");
//       setToken("");
//       navigate("/");

//     }

//   return (
//     <div className="navBar">
//        <Link to="/"><img src={assets.logo} alt="" className="logo" /></Link>
//       <ul className="navbar-menu">
//         <Link to="/" onClick={()=>setMenu("home")}className={menu==="home"?"active":""}>Home</Link>
//         <a  href="#Explore" onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
//         {/* <a href="#app-download" onClick={()=>setMenu("mobile")}className={menu==="mobile"?"active":""}>Mobile-Download</a> */}
//         <a href="#footer" onClick={()=>setMenu("contact-us")}className={menu==="contact-us"?"active":""}>Contact Us</a>
//       </ul>
//       <div className="navbar-right">
//         <img src={assets.search_icon} alt="" />
//         <div className="navbar-search">
//            <Link to="/cart"><img src={assets.basket_icon} alt=""  /></Link> 
//             <div className={getTotalCartAmount()===0?"":"dot"}></div>
//         </div>
//         {!token?<button onClick={()=>setShowLogin(true)}>sign up</button>:
//         <div className="navbar-profile">
//           <img src={assets.profile_icon} alt="" />
//           <ul className="nav-dropdown">
//             <li> <img src={assets.bag_icon} alt="" /><p>Orders</p></li>
//             <hr/>
//             <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>LogOut</p></li>
          
//           </ul>

//         </div>  
//         }
        
//       </div>
//     </div>
//   )
// }

// export default Navbar
import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';

const Navbar = ({ setShowLogin, search, setSearch }) => {
  const [menu, setMenu] = useState("menu");
  const [showSearch, setShowSearch] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <div className="navBar">
      <Link to="/"><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href="#Explore" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        {/* <a href="#app-download" onClick={()=>setMenu("mobile")}className={menu==="mobile"?"active":""}>Mobile-Download</a> */}
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-bar">
          {showSearch && (
            <input
              type="text"
              placeholder="Search menu..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="navbar-search-input"
              autoFocus
            />
          )}
          <img
            src={assets.search_icon}
            alt="search"
            className="navbar-search-icon"
            onClick={() => setShowSearch(prev => !prev)}
            style={{ cursor: 'pointer', marginLeft: '10px' }}
          />
        </div>
        <div className="navbar-search">
          <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign up</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-dropdown">
              <li> <img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>LogOut</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar