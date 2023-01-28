import axios from 'axios'
import { setProducts, setLoading, setError, setProduct } from '../slices/products'

// all products
export  const getProducts = () => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const { data } = await axios.get('/api/products') // proxy is in package.json added
    dispatch(setProducts(data)) // data are our products from backend
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.',
      ),
    )
  }
}

// single product
export const getProduct = (id) => async(dispatch) => {
  dispatch(setLoading(true))
  try{
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(setProduct(data))
  } catch(error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.',
      ),
    )
  }
}