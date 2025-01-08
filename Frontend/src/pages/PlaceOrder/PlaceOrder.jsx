import React, { useContext,  useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../components/context/storeContext'
import axios from 'axios'
const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItem,url}=useContext(StoreContext)

const [data,setData]= useState({
  firstName:"",
  lastName:"",
  email:"",
  street:"",
  city:"",
  state:"",
  zipcode:"",
  country:"",
  phone:""

})

const onChangeHandler =(event)=>{
  const name = event.target.name;
  const value = event.target.value;
  setData(data=>({...data,[name]:value}))
}

const placeOrder = async (event) => {
  event.preventDefault();
  let orderItems =[];
  food_list.map((item)=>{
    if (cartItem[item._id]) {
      let itemInfo = item;
      itemInfo["quantity"] = cartItem[item._id];
      orderItems.push(itemInfo);
    }
  })

  let orderData={
    address:data,
    items:orderItems,
    amount:getTotalCartAmount()+20,

  }
  let response=await axios.post(url+"/api/order/placeOrder",orderData,{headers:{token}});
  if (response.data.success) {
    const {session_url} =response.data;
    window.location.replace(session_url);
  }
  else{
    alert(" YOU HAVE SUCCESSFULLY OVERVIEW THE PROJECT !!");
  }
  
}

  return (
    
      <form onSubmit={placeOrder} className="order">
    <div className="order-left">
      <p className="title">
        Delivery Information
      </p>
      <div className="multi">
        <input name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First Name' required/>
        <input  name='lastName' onChange={onChangeHandler} value={data.lastName}type='text'placeholder='Last Name' required/>
      </div>
      <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='EMAIL ID' />
      <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
      
    <div className="multi">
        <input name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='city' required/>
        <input name='state' onChange={onChangeHandler} value={data.state} type='text'placeholder='state' required/>
        </div>
      <div className="multi">
        <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='zip code' required/>
        <input name='country' onChange={onChangeHandler} value={data.country} type='text'placeholder='country' required />
      </div>
      <input name='phone' onChange={onChangeHandler} value={data.phone} type='text'placeholder='phone' required/>
      </div>
    <div className="order-right">
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
            <button type='submit' > PAY</button>
          </div>
         
    </div>
   </form>
   

  )
}

export default PlaceOrder
