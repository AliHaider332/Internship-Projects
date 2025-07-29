import { createSlice } from "@reduxjs/toolkit"
const pages=createSlice(
    {
        name:'ABC',
        initialState: [
            { layout: 'Shop', path: '/' },
            { layout: 'On Sale', path: 'sales' },
            { layout: 'New Arrival', path: 'arrival' },
            { layout: 'Brands', path: 'brands' },
          ],
          reducers:{

          }
    }
)
export default pages;