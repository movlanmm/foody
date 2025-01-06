import { createSlice } from "@reduxjs/toolkit";


export const loadingSlice = createSlice({
    name:'loading',
    initialState:{
        loading:false
    },
    reducers:{
        loadingStart:(state)=>{
            state.loading = true
        },
        loaded: state=>{
            state.loading = false
        }
    }
})


export const {loadingStart,loaded} = loadingSlice.actions
export default loadingSlice.reducer