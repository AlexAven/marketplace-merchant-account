import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchItem = createAsyncThunk(
  'items/fetchItem', async (id) => {
  const response = await fetch(`http://localhost:8000/advertisements/${id}`);
  const data = await response.json();
  return data;
});

export const updateItem = createAsyncThunk(
  'items/updateItem', async (updatedData) => {
  const response = await fetch(`http://localhost:8000/advertisements/${updatedData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });
  const data = await response.json();
  return data;
});

const updateItemDataSlice = createSlice({
  name: 'items',
  initialState: {
    currentItem: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItem.fulfilled, (state, action) => {
        state.currentItem = action.payload;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.currentItem = action.payload;
      });
  },
});

export default updateItemDataSlice.reducer;
