import {createSlice} from "@reduxjs/toolkit"

// pocetna vrijednost 
export const initialState = {
    loading: false,
    error: null,
    cart: [],
    expressShiping: false,
    subtotal: 0
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        setLoading: (state) => {
            state.loading = true 
        },
        cartItemAdd: (state, {payload}) => {
            const existingItem = state.cart.find((item) => item.id === payload.id)

            if(existingItem) {
                state.cart = state.cart.map((item) => (item.id ===existingItem ? payload : item ))
            } else {
                state.cart = [...state.cart, payload]
            }
            state.loading = false
            state.error = null
        },
        setError: (state,{payload}) => {
            state.error = payload 
            state.loading = false
        }
    }
})

export const {setLoading, setError, cartItemAdd} = cartSlice.actions; // to actions 

export default cartSlice.reducer 

export const cartSelector = (state) => state.cart // to store 