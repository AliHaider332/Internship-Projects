import { configureStore, createSlice } from '@reduxjs/toolkit';
import topBarState from './Topbar';
import pages from './options';
import optionShow from './optionShow';
import barShow from './barShow';
import Detail from './productDetail'; 
const store = configureStore({
  reducer: {
    topBarState: topBarState.reducer,
    pages: pages.reducer,
    optionShow: optionShow.reducer,
    barShow: barShow.reducer,
    Detail: Detail.reducer,

  },
});

export default store;
