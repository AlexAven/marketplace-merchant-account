import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrder = createAsyncThunk(
  'items/fetchOrder',
  async (orderId) => {
    const response = await fetch(`http://localhost:8000/orders/${orderId}`);
    const data = await response.json();

    return data;
  },
);

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    const response = await fetch('http://localhost:8000/orders');
    const data = await response.json()
      .then(res => res.sort((a, b) => b.status.toString().toLowerCase() - a.status.toString().toLowerCase()));
    return data;
  }
);

const initialState = {
  orders: null,
  filteredOrders: null,
  currentOrder: null,
  loading: false,
  error: null,
};

const getOrdersDataSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    sortByTotal: (state) => {
      state.orders.sort((a, b) => b.total - a.total);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.filteredOrders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { sortByTotal } = getOrdersDataSlice.actions;
export default getOrdersDataSlice.reducer;
