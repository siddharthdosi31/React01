
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
  ES
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
    ESP:ES
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
    ESP: "Spain"
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
        const countryCode = String(row.country ?? "").toUpperCase();
        const Flag = countryFlags[countryCode];
        const countryName = countryNames[countryCode] ?? row.country;

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
  const total = useSelector((state) => state.companies.total);
  const loading = useSelector(
    (state) => state.companies.loading
  );
  const error = useSelector(
    (state) => state.companies.error
  );

  const [searchText, setSearchText] = useState("");
  const [sortConfig, setSortConfig] = useState(null);

  useEffect(() => {
    dispatch(fetchCompanies({ filter: searchText, sortConfig }));
  }, [dispatch, searchText, sortConfig]);

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
            onChange={(event) =>
              setSearchText(event.target.value)
            }
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-600">
            Error: {error}
          </p>
        ) : (
          <>
            <p className="mb-2 text-sm text-gray-600">
              Showing {data.length} of {total} companies
            </p>

            <Table
              headers={headers}
              data={data}
              sortConfig={sortConfig}
              onSortChange={setSortConfig}
            />
          </>
        )}
      </div>
    </main>
  );
}

export default App;
