// redux/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';
import {Web,DESKTOP} from './Data';
import { Console } from './Data';




const WebDevelopment = createSlice({
  name: 'WebDevelopment',
  initialState: Web,
  reducers: {},
});


const DesktopDevelopment=createSlice({
  name:'ABC',
  initialState:DESKTOP,
  reducers:{}
})

const ConsoleApp=createSlice({
  name:'ABC',
  initialState:Console,
  reducers:{}
})




const PDetail = createSlice({
  name: 'ABC',
  initialState:{},
  reducers: {
    setDetails: (state, action) => {
      if (action.payload.section === 'WEB') {
        const result = Web.filter(
          (project) => project.id === action.payload.ID
        );
        return result.length > 0 ? result[0] : {};
      }
      else if(action.payload.section==='DESKTOP'){
        const result = DESKTOP.filter(
          (project) => project.id === action.payload.ID
        );
        return result.length > 0 ? result[0] : {};
      }
      else if(action.payload.section==='CONSOLE'){
        const result = Console.filter(
          (project) => project.id === action.payload.ID
        );
        return result.length > 0 ? result[0] : {};
      }

      return state;
    },
  },
});

const STORE = configureStore({
  reducer: {
    WebDevelopment: WebDevelopment.reducer,
    DesktopDevelopment:DesktopDevelopment.reducer,
    PDetail: PDetail.reducer,
    ConsoleApp:ConsoleApp.reducer
  },
});
export const {setDetails}=PDetail.actions;
export default STORE;
