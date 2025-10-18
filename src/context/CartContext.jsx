import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on init
    try {
      const savedCart = localStorage.getItem("hoodagent_cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        // Clean old data: remove image base64 to prevent quota issues
        const cleaned = parsed.map(item => {
          const { image, description, stock, ...essentialData } = item;
          return {
            ...essentialData,
            rawPrice: item.rawPrice || (typeof item.price === 'number' ? item.price : 0),
            price: typeof item.price === 'string' ? item.price : `Rp ${item.price || 0}`,
            imageUrl: item.imageUrl || null,
          };
        });
        return cleaned;
      }
      return [];
    } catch (error) {
      console.error("Error loading cart:", error);
      localStorage.removeItem("hoodagent_cart");
      return [];
    }
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem("hoodagent_cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
      if (error.name === 'QuotaExceededError') {
        // If quota exceeded, clear old cart and try again with current item only
        console.warn("LocalStorage quota exceeded. Clearing old cart data.");
        localStorage.removeItem("hoodagent_cart");
        alert("Cart storage is full. Previous cart data has been cleared.");
      }
    }
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1, EXCLUDE large image data
        const { image, description, stock, ...essentialData } = product;
        return [...prevItems, {
          ...essentialData,
          quantity: 1,
          // Only store image URL if it's a URL, not base64
          imageUrl: image && !image.startsWith('data:') ? image : null
        }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get total items count
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.rawPrice || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
