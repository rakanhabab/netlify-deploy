import { createContext, useState, useEffect } from "react";
import { getProducts, getAllCategories } from "../services/productService";
import { json } from "react-router-dom";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    
    
    const loadCart = () => {
        const cartData = localStorage.getItem('cartData');
        return cartData ? JSON.parse(cartData) : [];
    }
    
    const [cartData, setCartData] = useState(loadCart());
    
    const saveCart = (items) => {
        localStorage.setItem('cartData', JSON.stringify(items));
    };

    useEffect(() => {
        saveCart(cartData);
    }, [cartData]);
    
    const addToCart = (product, quantity = 1) => {
        setCartData((prevCart) => {
          const update = prevCart.map((item) => (
            item.productId === product.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ));
      
          const isProductInCart = prevCart.some((item) => item.productId === product.productId);
          if (!isProductInCart) {
            update.push({ ...product, quantity });
          }
      
          saveCart(update); 
          return update;
        });
    };

    const removeFromCart = (productId) => {
        setCartData((prevCart) => {
          const update = prevCart.filter((item) => item.productId !== productId);
      
          saveCart(update);
          
          return update;
        });
    };

    const clearCart = () => {
        console.log("cart cleared");
        setCartData([]);
        localStorage.removeItem('cartData');
    };

    const updateQuantity = (productId, quantity) => {
        setCartData((prevCart) => {
          const update = prevCart.map((item) => {
            if (item.productId === productId) {
              return { ...item, quantity: Math.max(1, quantity) };
            }
            return item;
          });
    
          saveCart(update); 
          return update;
        });
    };
    
    const incrementQuantity = (productId) => {
        setCartData((prevCart) => {
          const updatedCart = prevCart.map((item) => {
              if (item.productId === productId) {
                  console.log(item.quantity+1);
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
      
          saveCart(updatedCart);
          return updatedCart;
        });
      };
      
      const decrementQuantity = (productId) => {
        setCartData((prevCart) => {
          const updatedCart = prevCart.map((item) => {
            if (item.productId == productId) {
              return item.quantity == 1 ? null : { ...item, quantity: item.quantity - 1 };
            }
            return item;
          }).filter(item => item !== null);
            
          saveCart(updatedCart);
          return updatedCart;
        });
      };

      

    
    
  return (
      <CartContext.Provider value={{
          cartData, setCartData,
          addToCart,
          removeFromCart,
          clearCart,
          updateQuantity,
          incrementQuantity,
          decrementQuantity
      }}>
      {children}
    </CartContext.Provider>
  );
};
