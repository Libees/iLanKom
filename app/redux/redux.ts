import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "config",
  initialState: {
    config:{
      ip:'',
      auth: ''
    }
  },
  reducers: {
    setConfig:(state,action) => {
      console.log(action)
      state = action.payload
    }
  },
});



export const {setConfig } = counterSlice.actions;

export const store = configureStore({
  reducer: counterSlice.reducer,
});