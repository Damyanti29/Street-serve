import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
       <img src={assets.logo_footer} alt=""  className='logo-footer'/>
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia laudantium quibusdam accusantium itaque, rerum a consectetur fuga recusandae laborum consequuntur ex! Eaque iure, exercitationem quis nemo ipsum eveniet officia rerum.</p>
       <div className="footer-social-icon">
       <img src={assets.linkedin_icon} alt="" />
       <img src={assets.facebook_icon} alt="" />
       <img src={assets.twitter_icon} alt="" />
       </div>
     
        </div>
        <div className="footer-content-center">
         <h2>Damyanti's Company</h2>
         <ul>
          <li>Home</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>Privacy Policy</li>
         </ul>
        </div>
        <div className="footer-content-right">
         <h2>Get In Touch</h2>
         <ul>
          <li>+91-77389XXXXX</li>
          <li>contact@Delivery.com</li>
        
         </ul>
        </div>
      </div>
      <hr/>
      <p className="footer-copyright">
       Copyright © 2024 Cafeteria Billing System. All Rights Reserved.
      </p>
    </div>
  )
}

export default Footer
