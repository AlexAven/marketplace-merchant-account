import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchItem = createAsyncThunk(
  'ithItem',
  async (itemId) => {
    const response = await fetch(`http://localhost:8000/advertisements/${itemId}`);
    const data = await response.json();
    
    return data;
  },
);

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (itemsOnPage, { getState }) => {
    const  filter  = getState().itemPageSlice.filter;
    const response = await fetch('http://localhost:8000/advertisements');
    const paginateData = (data, pageSize) => {
      return Array.from({
        length: Math.ceil(data.length / pageSize)}, (_, i) =>
        data.slice(i * pageSize, i * pageSize + pageSize)
      );
    }; 
    const data = await response.json()
    .then(res => {
      if (filter === 'price') {
        return res.sort((a, b) => b.price - a.price);
      }
      if (filter === 'views') {
        return res.sort((a, b) => b.views - a.views);
      } 
      if (filter === 'likes') {
        return res.sort((a, b) => b.likes - a.likes);
      }
    });
    const result = paginateData(data, itemsOnPage);

    return result;
  },
);

const initialState = {
  items: null,
  filteredItems: null,
  currentItem: null,
  loading: false,
  error: null,
  totalItems: 10,
  currentRender: [],
  renderPage: 0,
  filter: 'price'
};

const itemPageSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    sortByPrice: (state) => {
      state.items.sort((a, b) => b.price - a.price);
    },
    sortByViews: (state) => {
      state.items.sort((a, b) => b.views - a.views);
    },
    sortByLikes: (state) => {
      state.items.sort((a, b) => b.likes - a.likes);
    },
    setRenderPage: (state, action) => {
      state.renderPage = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItem.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload;
      })
      .addCase(fetchItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.totalItems = action.payload.flat().length;
        state.items = action.payload;
        state.currentRender = state.items[state.renderPage];
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const {
  sortByViews,
  sortByLikes,
  sortByPrice,
  setFilter,
  setRenderPage,
  currentRender
} = itemPageSlice.actions;
export default itemPageSlice.reducer;
