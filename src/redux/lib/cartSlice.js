import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name:'Cart',
    initialState:{
        cart:[]
    },
    reducers:{
        addCart:(state,action)=>{
            const found = state.cart.find(item=>item.id === action.payload.id)
            if(found){
                found.quantity = action.payload.quantity
                return
            }
            state.cart.push(action.payload)
        },
        removeFromCart:(state,action)=>{
            state.cart = state.cart.filter(i=>i.id !== action.payload)
        },
        updateCart:(state,action)=>{
          const found = state.cart.find(item=>item.id === action.payload.id)
            if(found){
                found.quantity = action.payload.quantity
            }
        },
        clearCart:(state)=>{
            state.cart = []
        },
        getUserCart:(state,action)=>{
            if(action.payload.length > 0){
                state.cart = action.payload
            }
        }
    }
})


export const {addCart,removeFromCart,updateCart,clearCart,getUserCart} = cartSlice.actions
export default cartSlice.reducer