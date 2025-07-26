
import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const url = "backend";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!itemId) return;

    // Ensure cartItem is valid before updating
    if (!cartItem || typeof cartItem !== 'object') {
      console.warn("Cart not initialized correctly.");
      return;
    }

    setCartItem((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));

    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, {
          headers: { token }
        });
      } catch (err) {
        console.error("Failed to sync cart with backend:", err);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    if (!itemId) return;
    if (!cartItem || typeof cartItem !== 'object') return;

    if (!cartItem[itemId]) {
      alert("Cart is Empty !!\nDon't go hungry");
      return;
    }

    setCartItem((prev) => ({
      ...prev,
      [itemId]: Math.max(prev[itemId] - 1, 0)
    }));

    if (token) {
      try {
        await axios.post(url + "/api/cart/remove", { itemId }, {
          headers: { token }
        });
      } catch (err) {
        console.error("Failed to sync cart removal:", err);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(url + "/api/food/list");
      setFoodList(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch food list:", err);
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, {
        headers: { token }
      });
      setCartItem(response.data.cartData || {}); // fallback to empty object
    } catch (err) {
      console.error("Failed to load cart data:", err);
      setCartItem({}); // fallback to avoid breaking cart
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

