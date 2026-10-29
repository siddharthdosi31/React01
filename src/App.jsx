
import {
  US,
  GB,
  CA,
  IE,
  JP,
  SG,
  CN,
  SE,
  NL,
  IN,
  AU,
  FR,
  BR,
  IT,
  DE,
  KR,
  AE,
  ES,
} from "country-flag-icons/react/3x2";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "./components/Table";

import {
  fetchCompanies,
  selectCompanyData,
} from "./features/companies/companySlice";

function App() {
  const countryFlags = {
    USA: US,
    GBR: GB,
    CAN: CA,
    IRL: IE,
    JPN: JP,
    SGP: SG,
    CHN: CN,
    SWE: SE,
    NLD: NL,
    IND: IN,
    AUS: AU,
    FRA: FR,
    BRA: BR,
    ITA: IT,
    DEU: DE,
    KOR: KR,
    ARE: AE,
    ESP: ES,
  };

  const countryNames = {
    USA: "United States",
    GBR: "United Kingdom",
    CAN: "Canada",
    IRL: "Ireland",
    JPN: "Japan",
    SGP: "Singapore",
    CHN: "China",
    SWE: "Sweden",
    NLD: "Netherlands",
    IND: "India",
    AUS: "Australia",
    FRA: "France",
    BRA: "Brazil",
    ITA: "Italy",
    DEU: "Germany",
    KOR: "South Korea",
    ARE: "United Arab Emirates",
    ESP: "Spain",
  };

  const headers = [
    {
      name: "company",
      label: "Company",
      sortable: true,
    },
    {
      name: "contact",
      label: "Contact",
      sortable: true,
    },
    {
      name: "country",
      label: "Country",
      sortable: true,
      render: (row) => {
        const countryCode = String(
          row.country ?? ""
        ).toUpperCase();

        const Flag = countryFlags[countryCode];
        const countryName =
          countryNames[countryCode] ?? row.country;

        return (
          <div className="flex items-center gap-3">
            {Flag && (
              <Flag
                title={countryName}
                className="h-5 w-8 rounded-sm shadow-sm"
              />
            )}
            <span className="font-medium text-slate-600">
              {countryName}
            </span>
          </div>
        );
      },
    },
  ];

  const dispatch = useDispatch();

  const data = useSelector(selectCompanyData);
  const total = useSelector(
    (state) => state.companies.total
  );
  const loading = useSelector(
    (state) => state.companies.loading
  );
  const error = useSelector(
    (state) => state.companies.error
  );

  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    dispatch(
      fetchCompanies({
        filter: searchText,
        sortConfig,
        page: currentPage,
        limit,
      })
    );
  }, [dispatch, searchText, sortConfig, currentPage]);

  function handleSearchChange(event) {
    setCurrentPage(1);
    setSearchText(event.target.value);
  }

  function handleSortChange(nextSortConfig) {
    setCurrentPage(1);
    setSortConfig(nextSortConfig);
  }

  function goToPage(pageNumber) {
    if (
      pageNumber >= 1 &&
      pageNumber <= totalPages &&
      pageNumber !== currentPage
    ) {
      setCurrentPage(pageNumber);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-4 font-sans sm:p-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/80 bg-white/90 shadow-xl shadow-slate-200/70">
        {/* Header */}
        <header className="flex flex-col gap-4 border-b border-slate-100 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-7 w-7"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 21h18M5 21V7l7-4v18M19 21V11l-7-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01M15 12v.01M15 15v.01M15 18v.01"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Company Directory
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Browse and search companies around the world
              </p>
            </div>
          </div>

          <div className="inline-flex items-center self-start rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 sm:self-center">
            <span className="mr-2 h-2 w-2 rounded-full bg-blue-500" />
            {total.toLocaleString()} companies
          </div>
        </header>

        <div className="p-6 sm:p-8">
          {/* Search and page summary */}
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path
                  strokeLinecap="round"
                  d="m16 16 4 4"
                />
              </svg>

              <input
                id="table-search"
                type="text"
                placeholder="Search company or contact..."
                value={searchText}
                onChange={handleSearchChange}
                aria-label="Search company or contact"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <p className="text-sm text-slate-500">
              Page{" "}
              {totalPages === 0 ? 0 : currentPage} of{" "}
              {totalPages}
              <span className="mx-2 text-slate-300">·</span>
              Showing {data.length} of{" "}
              {total.toLocaleString()} companies
            </p>
          </div>

          {/* Loading message */}
          {loading && data.length === 0 && (
            <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-10 text-center">
              <p className="text-sm font-medium text-slate-600">
                Loading companies...
              </p>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div
              role="alert"
              className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              Error: {error}
            </div>
          )}

          {/* Company table */}
          {data.length > 0 && (
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <Table
                headers={headers}
                data={data}
                sortConfig={sortConfig}
                onSortChange={handleSortChange}
              />
            </div>
          )}

          {/* Empty results */}
          {!loading && data.length === 0 && !error && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-12 text-center">
              <p className="font-semibold text-slate-700">
                No companies found
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Try searching with another company or contact name.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 0 && (
            <footer className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-4 sm:flex-row">
              <p className="text-xs text-slate-500">
                Displaying up to{" "}
                <span className="font-semibold text-slate-700">
                  {limit} rows
                </span>{" "}
                per page
              </p>

              <nav
                aria-label="Company table pagination"
                className="flex items-center gap-2"
              >
                {/* Previous page */}
                <button
                  type="button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                  aria-label="Previous page"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>

                {/* Three page numbers */}
                {[-1, 0, 1].map((offset) => {
                  const pageNumber = currentPage + offset;
                  const isValidPage =
                    pageNumber >= 1 &&
                    pageNumber <= totalPages;

                  if (!isValidPage) {
                    return (
                      <div
                        key={pageNumber}
                        className="h-10 w-10"
                        aria-hidden="true"
                      />
                    );
                  }

                  const isActive =
                    pageNumber === currentPage;

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => goToPage(pageNumber)}
                      disabled={loading}
                      aria-label={`Page ${pageNumber}`}
                      aria-current={
                        isActive ? "page" : undefined
                      }
                      className={`h-10 w-10 rounded-xl border text-sm font-semibold transition disabled:cursor-wait ${
                        isActive
                          ? "border-blue-600 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-200"
                          : "border-slate-200 bg-white text-slate-600 shadow-sm hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                {/* Next page */}
                <button
                  type="button"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={
                    currentPage >= totalPages || loading
                  }
                  aria-label="Next page"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </nav>
            </footer>
          )}

          {/* Loading indicator when changing pages */}
          {loading && data.length > 0 && (
            <p
              role="status"
              className="mt-3 text-center text-xs text-slate-500"
            >
              Loading page...
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
