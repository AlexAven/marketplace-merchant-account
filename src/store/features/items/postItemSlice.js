import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createAd = createAsyncThunk(
  'ads/createAd',
  async (newItem) => {
    const response = await fetch('http://localhost:8000/advertisements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    });

    return await response.json();
  },
);

const postItemSlice = createSlice({
  name: 'addItem',
  initialState: {
    items: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAd.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAd.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(createAd.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default postItemSlice.reducer;
