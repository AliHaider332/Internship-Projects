import { configureStore} from '@reduxjs/toolkit';
import topBarState from './Topbar';
import pages from './options';
import optionShow from './optionShow';
import barShow from './barShow';
import Detail from './productDetail'; 
import CART from './cart';

const store = configureStore({
  reducer: {
    topBarState: topBarState.reducer,
    pages: pages.reducer,
    optionShow: optionShow.reducer,
    barShow: barShow.reducer,
    Detail: Detail.reducer,
    CART: CART.reducer,
    

  },
});

export default store;
