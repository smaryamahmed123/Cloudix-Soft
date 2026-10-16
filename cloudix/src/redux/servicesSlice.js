// // src/redux/servicesSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// const backendURL = import.meta.env.VITE_BACKEND_URL;

// export const fetchServices = createAsyncThunk("services/fetchAll", async () => {
//   const response = await axios.get(`${backendURL}/api/services`);
//     // Sort by order field so reordered list displays correctly
//   return response.data.sort((a, b) => a.order - b.order);
//   // return response.data;
// });

// const servicesSlice = createSlice({
//   name: "services",
//   initialState: {
//     data: [],
//     loading: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchServices.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchServices.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchServices.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default servicesSlice.reducer;


import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

export const fetchServices = createAsyncThunk("services/fetchAll", async () => {
  const { data } = await axios.get(`${backendURL}/api/services`);
  // Sort by order field so reordered list displays correctly
  return [...data].sort((a, b) => a.order - b.order);
});

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    data: [],
    loading: false,
    fetched: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.fetched = true;
        state.data = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.fetched = true; // prevents an endless retry loop on failure
        state.error = action.error.message;
      });
  },
});

export const selectVisibleServices = createSelector(
  (state) => state.services.data,
  (data) => data.filter((s) => s?.visible === true || s?.visible === "true")
);

export default servicesSlice.reducer;