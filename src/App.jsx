import {
  DE,
  MX,
  AT,
  GB,
  CA,
  IT,
} from "../node_modules/country-flag-icons/react/3x2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "./components/Table";
import {
  fetchCompanies,
  selectCompanyData,
} from "./features/companies/companySlice";

function App() {
  const countryFlags = {
  Germany: DE,
  Mexico: MX,
  Austria: AT,
  UK: GB,
  Canada: CA,
  Italy: IT,
};
  const headers = [
  { name: "company", label: "Company" },
  { name: "contact", label: "Contact" },
  {
    name: "country",
    label: "Country",
    render: (row) => {
      const Flag = countryFlags[row.country];

      return (
        <div className="flex items-center gap-2">
          {Flag && (
            <Flag
              title={row.country}
              className="h-5 w-8"
            />
          )}
          <span>{row.country}</span>
        </div>
      );
    },
  },
];
  const dispatch = useDispatch();

  const data = useSelector(selectCompanyData);
  const loading = useSelector((state) => state.companies.loading);
  const error = useSelector((state) => state.companies.error);

  // Search and sorting state
  const [searchText, setSearchText] = useState("");
  const [sortColumn, setSortColumn] = useState("company");
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  // 1. Filter rows by searching every column
  const filteredData = data.filter((row) =>
    headers.some((header) =>
      String(row[header.name] ?? "")
        .toLowerCase()
        .includes(searchText.trim().toLowerCase())
    )
  );

  // 2. Sort the filtered rows by the selected column
  const sortedData = [...filteredData].sort((a, b) => {
    const valueA = String(a[sortColumn] ?? "");
    const valueB = String(b[sortColumn] ?? "");

    const comparison = valueA.localeCompare(valueB, undefined, {
      sensitivity: "base",
    });

    return sortDirection === "asc" ? comparison : -comparison;
  });

  return (
    <main className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-5 text-2xl font-bold text-gray-900">
          Company Directory
        </h1>

        {/* Search and sorting controls */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label
              htmlFor="table-search"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Filter
            </label>

            <input
              id="table-search"
              type="text"
              placeholder="Search any column..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label
              htmlFor="sort-column"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Sort by
            </label>

            <select
              id="sort-column"
              value={sortColumn}
              onChange={(event) => setSortColumn(event.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm sm:w-40"
            >
              {headers.map((header) => (
                <option key={header.name} value={header.name}>
                  {header.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="sort-direction"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Order
            </label>

            <select
              id="sort-direction"
              value={sortDirection}
              onChange={(event) => setSortDirection(event.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm sm:w-40"
            >
              <option value="asc">Ascending (A–Z)</option>
              <option value="desc">Descending (Z–A)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <>
            <p className="mb-2 text-sm text-gray-600">
              Showing {sortedData.length} of {data.length} companies
            </p>

            <Table headers={headers} data={sortedData} />
          </>
        )}
      </div>
    </main>
  );
}

export default App;
