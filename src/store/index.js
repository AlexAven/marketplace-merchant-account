import { configureStore } from "@reduxjs/toolkit";

import getOrdersDataSlice from "./features/items/getOrdersDataSlice";
import postItemSlice from "./features/items/postItemSlice";
import itemPageSlice from "./features/items/itemPageSlice";
import updateItemDataSlice from "./features/items/updateItemDataSlice";

export const store = configureStore({
  reducer: {
    getOrdersDataSlice,
    postItemSlice,
    itemPageSlice,
    updateItemDataSlice
  },
});