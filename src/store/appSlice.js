import { createSlice } from "@reduxjs/toolkit";
import { ADMIN_EMAIL } from "../envConfig";

const AppSlice = createSlice({
    initialState: {
        isLogged: false,
        isAdmin : false,
        cartProducts : [],
        allProducts : [],
        userData : {},
        selectedProduct : false
    },
    name : 'AppSlice',
    reducers : {

        login : (state, actions) =>{
            state.isLogged = true;
            state.userData = actions.payload
            if(actions.payload.providerUid == ADMIN_EMAIL || actions.payload.email == ADMIN_EMAIL)
                state.isAdmin = true;
        },

        logout : (state) =>{
            state.isLogged = false
            state.isAdmin = false
            state.cartProducts = []
            state.userData = {}
        },

        setProducts : (state, actions)=>{
            state.allProducts = actions.payload
        },

        addProduct : (state, actions)=>{
            state.allProducts = [...state.allProducts, actions.payload]
        },

        deleteProduct : (state, actions)=>{
            state.allProducts = state.allProducts.filter(product=>product.$id!==actions.payload)
        },

        updateProducts : (state, actions)=>{
            state.allProducts = setProducts.allProducts.map(product=>product.$id === actions.payload.$id ? actions.payload.data : product)
        },

        setSelectedProduct : (state, actions) =>{
            state.selectedProduct = actions.payload
        }
    }
})
export const {login, logout, addProduct, setProducts, setSelectedProduct, updateProducts, deleteProduct} = AppSlice.actions

export default AppSlice.reducer