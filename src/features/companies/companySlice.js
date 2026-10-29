
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

// Fetch company data from your Node.js API.

export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async ({ filter = "", sortConfig = null } = {}) => {
    const params = new URLSearchParams();

    params.set("filter", filter.trim());

    if (sortConfig) {
      params.set("sortCol", sortConfig.column);
      params.set("sortKey", sortConfig.direction);
    }

    // Explicitly request all records up to the chosen limit.
    params.set("page", "1");
    
    const response = await fetch(
      `http://localhost:8080/api?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch companies");
    }

    return await response.json();
  }
);


// Initial Redux state.
const initialState = {
  data: [],
  total: 0,
  loading: false,
  error: null,
  currentRequestId: null,
};

// Create the companies slice.
const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state, action) => {
        state.currentRequestId = action.meta.requestId;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }

        state.loading = false;
        state.currentRequestId = null;
        state.data = action.payload.rows;
        state.total = action.payload.total;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }

        state.loading = false;
        state.currentRequestId = null;
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
