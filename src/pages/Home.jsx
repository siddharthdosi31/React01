
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

import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Table from "../components/Table";

import {
  fetchCompanies,
  selectCompanyData,
} from "../features/companies/companySlice";

function Home() {
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
          <div className="flex items-center gap-2">
            {Flag && (
              <Flag
                title={countryName}
                className="h-5 w-8"
              />
            )}
            <span>{countryName}</span>
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
  const [page, setPage] = useState(1);

  const limit = 100;
  const hasMore = data.length < total;

  // Fetch companies from the API
  useEffect(() => {
    dispatch(
      fetchCompanies({
        filter: searchText,
        sortConfig,
        page,
        limit,
        append: page > 1,
      })
    );
  }, [dispatch, searchText, sortConfig, page]);

  // Load the next page
  const handleLoadMore = () => {
    if (!loading && hasMore && !error) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  // Infinite scrolling hook
  const bottomRef = useInfiniteScroll({
    loading,
    hasMore,
    error,
    onLoadMore: handleLoadMore,
  });

  function handleSearchChange(event) {
    setPage(1);
    setSearchText(event.target.value);
  }

  function handleSortChange(nextSortConfig) {
    setPage(1);
    setSortConfig(nextSortConfig);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-5 text-2xl font-bold text-gray-900">
          Company Directory
        </h1>

        <div className="mb-4">
          <label
            htmlFor="table-search"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Filter
          </label>

          <input
            id="table-search"
            type="text"
            placeholder="Search company or contact..."
            value={searchText}
            onChange={handleSearchChange}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {error && data.length === 0 ? (
          <p className="text-red-600">
            Error: {error}
          </p>
        ) : (
          <>
            <p className="mb-2 text-sm text-gray-600">
              Showing {data.length} of {total} companies
            </p>

            {data.length > 0 && (
              <Table
                headers={headers}
                data={data}
                sortConfig={sortConfig}
                onSortChange={handleSortChange}
                bottomRef={bottomRef}
              />
            )}

            {loading && data.length === 0 && (
              <p className="py-4 text-center text-gray-600">
                Loading companies...
              </p>
            )}

            {error && (
              <p className="py-3 text-red-600">
                Error: {error}
              </p>
            )}

            {loading && data.length > 0 && (
              <p className="py-4 text-center text-gray-600">
                Loading more companies...
              </p>
            )}

            {!loading && !hasMore && data.length > 0 && (
              <p className="py-4 text-center text-gray-500">
                You've reached the end of the table.
              </p>
            )}

            {!loading && data.length === 0 && !error && (
              <p className="py-4 text-center text-gray-500">
                No companies found.
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default Home;
