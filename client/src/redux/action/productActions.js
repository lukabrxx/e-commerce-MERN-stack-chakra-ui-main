import axios from 'axios'
import { setProducts, setLoading, setError, setProduct, productReviewed, resetError } from '../slices/products'

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

// create product review
export const createProductReview = (productId, userId, comment, rating, title) => async (dispatch, getState) => {
  dispatch(setLoading());
  const {
    user: { userInfo },
  } = getState();

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(`/api/products/reviews/${productId}`, { comment, userId, rating, title }, config);
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch(productReviewed());
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    );
  }
};

// resetproduct error
export const resetProductError = () => async (dispatch) => {
  dispatch(resetError());
};