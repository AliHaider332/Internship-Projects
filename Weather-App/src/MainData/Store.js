// Store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Location Slice
const LOCATION_DATA = createSlice({
  name: 'LOCATION_DATA',
  initialState: { lat: null, long: null },
  reducers: {
    updateLocation: (state, action) => {
      state.lat = action.payload.lat;
      state.long = action.payload.long;
    },
  },
});

// City Name Slice
const CITY_NAME = createSlice({
  name: 'CITY_NAME',
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
