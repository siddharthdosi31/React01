
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "./components/Table";
import {
  fetchCompanies,
  selectCompanyData,
} from "./features/companies/companySlice";

function App() {
  const headers = [
    { name: "company", label: "Company" },
    { name: "contact", label: "Contact" },
    { name: "country", label: "Country" },
  ];

  // Get the dispatch function
  const dispatch = useDispatch();

  // Read data and status from Redux
  const data = useSelector(selectCompanyData);
  const loading = useSelector((state) => state.companies.loading);
  const error = useSelector((state) => state.companies.error);

  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-5 text-2xl font-bold text-gray-900">
          Company Directory
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <Table headers={headers} data={data} />
        )}
      </div>
    </main>
  );
}

export default App;
