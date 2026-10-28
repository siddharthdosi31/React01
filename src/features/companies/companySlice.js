
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

// Fetch company data from your Node.js API.
export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async () => {
    const response = await fetch("http://localhost:8080/api");

    if (!response.ok) {
      throw new Error("Failed to fetch companies");
    }

    const result = await response.json();

    return result.rows;
  }
);

// Initial Redux state.
const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Create the companies slice.
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
        state.error =
          action.error.message || "Something went wrong";
      });
  },
});

// Select company data from the Redux store.
const selectCompanyState = (state) => state.companies;

export const selectCompanyData = createSelector(
  [selectCompanyState],
  (companies) => companies.data
);

// Default export required by store.js.
export default companySlice.reducer;
