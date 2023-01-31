import axios from "axios"
import { setLoading, setError, userLogin, userLogout, updateUserProfile, resetUpdate, setUserOrders } from '../slices/user'

// * LOGIN
export const login = (email,password) => async(dispatch) => {
    dispatch(setLoading(true))
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            }
          }
          const { data } = await axios.post('/api/users/login', { email, password }, config);
    dispatch(userLogin(data));
    localStorage.setItem('userInfo', JSON.stringify(data))
    } catch(error) {
        dispatch(
            setError(
              error.response && error.response.data
                ? error.response.data
                : error.message
                ? error.message
                : 'An unexpected error has occured. Please try again later.'
            )
          );
        }
}
//* LOGOUT
export const logout = () => (dispatch) => {
  dispatch(resetUpdate())
  localStorage.removeItem('userInfo')
  dispatch(userLogout())
}
//* REGISTER 
export const register = (name, email, password) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/users/register', { name, email, password }, config);
    dispatch(userLogin(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    );
  }
};

// * UPDATE PROFILE
 //? getState is simmilar what we got from useSelector in our Screen x Components
export const updateProfile = (id,name,email,password) => async (dispatch, getState) => {
  const {user : {userInfo} } = getState() 

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      }
    }
    //? without config it would be not auth... 
    //? _id: id bcs we use _id as id, everything else is same key and same value
    const {data} = await axios.put(`/api/users/profile/${id}`, {_id: id, name, email, password}, config)
    localStorage.setItem("userInfo", JSON.stringify(data))
    dispatch(updateUserProfile(data))
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    );
  }
}
//* tell us everytime when update was successful (IMPORTENT) 
 //* we do it to avoid the loop
export const resetUpdateSuccess = () => async(dispatch) => {
dispatch(resetUpdate())
}

//* USER ORDERS

export const getUserOrders = () => async(dispatch, getState) => {
  dispatch(setLoading(true))
  const {user : {userInfo} } = getState() 
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      }
    }
    const {data} = await axios.get(`/api/users/${userInfo._id}`, config)
    dispatch(setUserOrders(data))
  } catch(error) {
    dispatch(
      setError(
        error.response && error.response.data
          ? error.response.data
          : error.message
          ? error.message
          : 'An unexpected error has occured. Please try again later.'
      )
    )
  }
}