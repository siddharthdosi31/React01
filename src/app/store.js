import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "../features/companies/companySlice";

export const store = configureStore({
  reducer: {
    companies: companyReducer,
  },
});