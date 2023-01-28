import {createSlice} from "@reduxjs/toolkit"

// pocetna vrijednost 
export const initialState = {
    loading: false,
    error: null,
    products: [],
    product: null 
}

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers:{
        setLoading: (state) => {
            state.loading = true 
        },
        setProducts: (state, {payload}) => { // state is state payload is like data (action.payload)
            state.loading = false // because it stops loading we have what we need
            state.error= null 
            state.products= payload
        },
        setError: (state,{payload}) => {
            state.error = payload 
            state.loading = false
        },
        setProduct: (state, {payload}) => {
            state.product = payload
            state.loading = false
            state.error = null 
        }
    }
})
console.log(productsSlice)
export const {setLoading, setError, setProducts, setProduct} = productsSlice.actions; // to actions 

export default productsSlice.reducer 

export const productsSelector = (state) => state.products // to store 