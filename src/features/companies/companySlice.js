
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

// 1. Create an async thunk to fetch company data
export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async () => {
    const response = await fetch("/data.json");

    if (!response.ok) {
      throw new Error("Failed to fetch company data");
    }

    return await response.json();
  }
);

// 2. Define the initial Redux state
const initialState = {
  data: [],
  loading: false,
  error: null,
};

// 3. Create a slice
const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

// 4. Select the company data using createSelector
const selectCompanyState = (state) => state.companies;

export const selectCompanyData = createSelector(
  [selectCompanyState],
  (companies) => companies.data
);

export default companySlice.reducer;
