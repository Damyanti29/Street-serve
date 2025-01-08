import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../components/context/storeContext'
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const { cartItem, food_list, removeFromCart , getTotalCartAmount,url } = useContext(StoreContext);
  const navigate =useNavigate();
  return (
    <div>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item) => {
            if (cartItem[item._id] > 0) {
              return (
                <div className="Cart">
                  <div key={item._id} className="cart-items-title cart-items-item">
                    <img src={url+"/images/"+item.image} alt="" className="" />
                    <p>{item.name}</p>
                    <p>Rs.{item.price}</p>
                    <p>{cartItem[item._id]}</p>
                    <p>Rs.{item.price * cartItem[item._id]}</p>
                    <p className='cross' onClick={()=>removeFromCart(item._id)}>x</p>

                  </div>
                  <hr />
                </div>

              )
            }
          })}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>Rs.{getTotalCartAmount()}</p>
              </div>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>Rs.{getTotalCartAmount()===0?0:20}</p>
              </div>
              <hr/>
              <div className="cart-total-details">
               <b>Total</b>
                <b>Rs.{getTotalCartAmount()===0?0:getTotalCartAmount()+20}</b>
              </div>
            </div>
            <button onClick={()=>navigate('/order')}>PROCEED TO PAY</button>
          </div>
         
        <div className="promocode">
          <div>
            <p>if you have a promo code,Enter it here</p>
            <div className="pc-input">
              <input type='text' placeholder='promo code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
     
    </div>
  )
}

export default Cart
