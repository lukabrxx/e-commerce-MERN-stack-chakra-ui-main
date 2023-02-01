import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  error: null,
  userList: null,
  userRemoval: false,
  orders: null,
  orderRemoval: false,
  deliveredFlag: false,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    getUsers: (state, { payload }) => {
      state.userList = payload;
      state.error = null;
      state.loading = false;
    },
    userDelete: (state) => {
      state.error = null;
      state.loading = false;
      state.userRemoval = true;
    },
    resetError: (state) => {
        state.error = null;
        state.loading = false;
        state.userRemoval = false;
      },
      getOrders: (state, { payload }) => {
        state.orders = payload;
        state.error = null;
        state.loading = false;
      },
      setDeliveredFlag: (state) => {
        state.deliveredFlag = true;
        state.loading = false;
      },
      orderDelete: (state) => {
        state.error = null;
        state.loading = false;
        state.orderRemoval = true;
      },
  },
});

export const { setLoading, setError, getUsers, userDelete, resetError, setDeliveredFlag, orderDelete, getOrders } =
  adminSlice.actions;
export default adminSlice.reducer;

export const adminSelector = (state) => state.admin;