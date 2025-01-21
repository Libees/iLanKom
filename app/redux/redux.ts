import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "config",
  initialState: {
    ip: '',
    auth: ''
  },
  reducers: {
    setStoreIp: (state,action) => {
        state.ip = action.payload
        console.log(state)
    },
    setStoreAuth: (state,action) => {
        state.auth = action.payload
    },
  },
});



export const { setStoreIp, setStoreAuth } = counterSlice.actions;

export const store = configureStore({
  reducer: counterSlice.reducer,
});