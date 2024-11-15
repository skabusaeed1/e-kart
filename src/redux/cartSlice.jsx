import { createSlice } from "@reduxjs/toolkit";


let initialState = [];
if( localStorage.getItem("cart") && localStorage.getItem("cart").length > 0){
   initialState = JSON.parse(localStorage.getItem("cart"));
}

const cartSlice = createSlice({

    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload)
        },
        deleteFromCart(state, action) {
            // console.log(action.payload);
            return state.filter((item,i) => i != action.payload);
        },
        emptyCart(state, action){
            localStorage.removeItem("cart");
            return state;
        }
    }
})


export const { addToCart, deleteFromCart, emptyCart } = cartSlice.actions;


export default cartSlice.reducer