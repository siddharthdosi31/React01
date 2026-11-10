
import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

// Fetch company data from your Node.js API.

export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async ({
    filter = "",
    sortConfig = null,
    page = 1,
    limit = 100,
    append = false,
  } = {}) => {
    const params = new URLSearchParams();

    params.set("filter", filter.trim());
    params.set("page", String(page));
    params.set("limit", String(limit));

    if (sortConfig) {
      params.set("sortCol", sortConfig.column);
      params.set("sortKey", sortConfig.direction);
    }

    const response = await fetch(
      `http://localhost:8080/api?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch companies");
    }

    const result = await response.json();

    // Return append along with the API response.
    return {
      ...result,
      append,
    };
  }
);
export const submitCompany = createAsyncThunk(
  "companies/submitCompany",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        const message = result.errors
          ? Object.values(result.errors).join(", ")
          : result.message || "Failed to add company";

        return rejectWithValue(message);
      }

      return result;
    } catch (error) {
      return rejectWithValue(
        error.message || "Unable to connect to the server"
      );
    }
  }
);

export const editCompany = createAsyncThunk(
  "companies/editCompany",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/edit/${id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result.errors || "Failed to edit company");
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial Redux state.
const initialState = {
  data: [],
  total: 0,
  loading: false,
  error: null,
  currentRequestId: null,
  submitLoading: false,
  submitError: null,
  lastAddedCompany: null,
  editLoading: false,
editError: null,
};

// Create the companies slice.
const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    clearSubmitStatus: (state) => {
      state.submitError = null;
      state.lastAddedCompany = null;
    },
  },

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

        // Append rows when loading the next page.
        if (action.payload.append) {
          state.data.push(...action.payload.rows);
        } else {
          state.data = action.payload.rows;
        }

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
      })
      // SUBMIT COMPANY: Pending
      .addCase(submitCompany.pending, (state) => {
        state.submitLoading = true;
        state.submitError = null;
      })

      // SUBMIT COMPANY: Fulfilled
      .addCase(submitCompany.fulfilled, (state, action) => {
        state.submitLoading = false;
        state.submitError = null;
        state.lastAddedCompany = action.payload;
      })

      // SUBMIT COMPANY: Rejected
      .addCase(submitCompany.rejected, (state, action) => {
        state.submitLoading = false;
        state.submitError =
          action.payload || action.error.message;
      })
      .addCase(editCompany.pending, (state) => {
        state.editLoading = true;
        state.editError = null;
      })

      .addCase(editCompany.fulfilled, (state, action) => {
        state.editLoading = false;

        const updatedCompany = action.payload;

        const index = state.data.findIndex(
          (company) => company.id === updatedCompany.id
        );

        if (index !== -1) {
          state.data[index] = updatedCompany;
        }
      })

      .addCase(editCompany.rejected, (state, action) => {
        state.editLoading = false;
        state.editError = action.payload || action.error.message;
      });

  },
});

// Select company data from the Redux store.
const selectCompanyState = (state) => state.companies;

export const selectCompanyData = createSelector(
  [selectCompanyState],
  (companies) => companies.data
);
// Export regular Redux actions.
export const { clearSubmitStatus } = companySlice.actions;
// Export the reducer to be used in the Redux store.
export default companySlice.reducer;
