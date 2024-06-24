import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  qtyStatus: { status: false, id: null },
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setQtyStatus(state, action) {
      state.qtyStatus = { ...state.qtyStatus, ...action.payload };
    },

    setAddItem(state, action) {
      let index = 0;
      const cartItems = state.cartItems;
      const product = action.payload;
      let updatedCartItems;

      index = cartItems.findIndex((item) => item._id === product._id);

      if (index != -1) {
        if (cartItems[index].availableQuantity > 0) {
          cartItems[index].quantity += 1;
          cartItems[index].availableQuantity -= 1;
        }
        updatedCartItems = cartItems;
      } else {
        updatedCartItems = [
          ...cartItems,
          {
            ...product,
            quantity: 1,
            availableQuantity: product.quantity - 1,
          },
        ];
      }

      state.cartItems = updatedCartItems;
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    },

    setIncreaseQty(state, action) {
      const cartItems = state.cartItems;

      const updatedCartItems = cartItems.filter((item) => {
        if (item._id === action.payload && item.availableQuantity > 0) {
          item.quantity++;
          item.availableQuantity--;
          return item;
        }
        return item;
      });

      state.cartItems = updatedCartItems;
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    },

    setDecreaseQty(state, action) {
      const cartItems = state.cartItems;

      const updatedCartItems = cartItems.filter((item) => {
        if (item._id === action.payload) {
          if (item.quantity > 1) {
            item.quantity--;
            item.availableQuantity++;
            return item;
          }
        } else {
          return item;
        }
      });

      state.cartItems = updatedCartItems;
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    },

    setRemoveItem(state, action) {
      const cartItems = state.cartItems;

      const updatedCartItems = cartItems.filter(
        (item) => item._id !== action.payload
      );

      state.cartItems = updatedCartItems;
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    },

    clearCart(state, action) {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },

    setLoadItemsToCart(state, action) {
      const products = action.payload;
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      let updatedCartItems = cartItems;
      if (products.length !== 0) {
        updatedCartItems = products.map((product) => {
          const index = cartItems.findIndex((item) => {
            return item._id === product.product._id;
          });
          if (index && index != -1) {
            cartItems[index].quantity += product.quantity;
          } else {
            return {
              ...product.product,
              quantity: product.quantity,
            };
          }
        });
      } else {
        updatedCartItems = cartItems;
      }
      state.cartItems = updatedCartItems;
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
