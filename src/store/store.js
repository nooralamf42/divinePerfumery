import { configureStore } from "@reduxjs/toolkit"
import AppSliceReducer from "./appSlice"
const store = configureStore({
    reducer : AppSliceReducer
})

export default store