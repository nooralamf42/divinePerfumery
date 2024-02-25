import { createSlice } from "@reduxjs/toolkit";
import { ADMIN_EMAIL } from "../envConfig";

const AppSlice = createSlice({
  initialState: {
    reduxInitiated: false,
    isLogged: false,
    isAdmin: false,
    cartProducts: [],
    allProducts: [],
    userData: {},
    selectedProduct: null,
  },
  name: "AppSlice",
  reducers: {
    initiateRedux: (state) => {
      state.reduxInitiated = true;
    },

    login: (state, actions) => {
      state.isLogged = true;
      state.userData = actions.payload.userData;
      state.cartProducts = actions.payload.userCart;
      if (
        actions.payload.providerUid == ADMIN_EMAIL ||
        actions.payload.email == ADMIN_EMAIL
      )
        state.isAdmin = true;
    },

    logout: (state) => {
      state.isLogged = false;
      state.isAdmin = false;
      state.cartProducts = [];
      state.userData = {};
    },

    setProducts: (state, actions) => {
      state.allProducts = actions.payload;
    },

    addProduct: (state, actions) => {
      state.allProducts = [...state.allProducts, actions.payload];
    },

    deleteProduct: (state, actions) => {
      state.allProducts = state.allProducts.filter(
        (product) => product.$id !== actions.payload
      );
    },

    updateProducts: (state, actions) => {
      state.allProducts = state.allProducts.map((product) =>
        product.$id === actions.payload.$id
          ? actions.payload.updatedProduct
          : product
      );
    },

    setSelectedProduct: (state, actions) => {
      state.selectedProduct = actions.payload;
    },

    addToCart: (state, actions) => {
      state.cartProducts = [...state.cartProducts, actions.payload];
    },

    removeFromCart: (state, actions) => {
      state.cartProducts = state.cartProducts.filter(
        (cartProduct) => cartProduct.$id !== actions.payload
      );
    },
  },
});
export const {
  login,
  logout,
  addProduct,
  setProducts,
  setSelectedProduct,
  updateProducts,
  deleteProduct,
  addToCart,
  removeFromCart,
  initiateRedux,
} = AppSlice.actions;

export default AppSlice.reducer;
