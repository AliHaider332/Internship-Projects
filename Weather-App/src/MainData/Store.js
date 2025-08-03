import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const LOCATION_DATA = createSlice({
  name: 'ABC',
  initialState: { long: null, lat: null },
  reducers: {
    updateLocation: (state, action) => {
      state.long = action.payload.x;
      state.lat = action.payload.y;
    },
  },
});

const CITY_NAME = createSlice({
  name: 'ABC',
  initialState: null,
  reducers: {
    updateCity: (state, action) => action.payload,
  },
});

const STORE = configureStore({
  reducer: {
    LOCATION_DATA: LOCATION_DATA.reducer,
    CITY_NAME: CITY_NAME.reducer,
  },
});
export default STORE;
export const { updateLocation } = LOCATION_DATA.actions;
export const { updateCity } = CITY_NAME.actions;
