import { createSlice } from "@reduxjs/toolkit";
import { ADMIN_EMAIL } from "../envConfig";

const AppSlice = createSlice({
    initialState: {
        isLogged: false,
        isAdmin : false,
        cartProducts : [],
        allProducts : [],
        userData : {}
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
        }
    }
})
export const {login, logout, addProduct, setProducts} = AppSlice.actions

export default AppSlice.reducer