import { configureStore, createSlice } from '@reduxjs/toolkit'
import topBarState from './Topbar';




const store=configureStore({
    reducer:{ topBarState: topBarState.reducer}
})

export default store;