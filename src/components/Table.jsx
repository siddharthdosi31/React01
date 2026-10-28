
import PropTypes from "prop-types";
import { useState } from "react";

function Table({ headers, data }) {
  // null means no sorting is active initially.
  const [sortConfig, setSortConfig] = useState(null);

  function handleSort(columnName) {
    setSortConfig((current) => {
      // First click, or selecting another column:
      // sort in descending order.
      if (!current || current.column !== columnName) {
        return {
          column: columnName,
          direction: "desc",
        };
      }

      // Second click: switch to ascending.
      if (current.direction === "desc") {
        return {
          column: columnName,
          direction: "asc",
        };
      }

      // Third click: clear sorting.
      return null;
    });
  }

  // Sort a copy of the data so the original array is not mutated.
  const sortedData = sortConfig
    ? [...data].sort((a, b) => {
        const valueA = String(
          a[sortConfig.column] ?? ""
        );
        const valueB = String(
          b[sortConfig.column] ?? ""
        );

        const comparison = valueA.localeCompare(
          valueB,
          undefined,
          { sensitivity: "base" }
        );

        return sortConfig.direction === "asc"
          ? comparison
          : -comparison;
      })
    : data;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left font-sans text-sm text-gray-800">
        <thead className="bg-white">
          <tr>
            {headers.map((header) => {
              const isActive =
                sortConfig?.column === header.name;

              return (
                <th
                  key={header.name}
                  className="border border-white px-3 py-2 font-bold"
                >
                  <div className="group flex items-center gap-2">
                    <span>{header.label}</span>

                    {header.sortable && (
                      <button
                        type="button"
                        onClick={() => handleSort(header.name)}
                        aria-label={
                          !isActive
                            ? `Sort ${header.label} descending`
                            : sortConfig.direction === "desc"
                              ? `Sort ${header.label} ascending`
                              : `Remove sorting from ${header.label}`
                        }
                        title={
                          !isActive
                            ? "Sort descending"
                            : sortConfig.direction === "desc"
                              ? "Sort ascending"
                              : "Remove sorting"
                        }
                        className={`rounded p-1 hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-blue-500 ${
                          isActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                        }`}
                      >
                        {isActive &&
                        sortConfig.direction === "asc" ? (
                          // SVG up arrow for ascending.
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
                            <path d="m6 14 6-6 6 6" />
                          </svg>
                        ) : (
                          // SVG down arrow for hover or descending.
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
                            <path d="m6 10 6 6 6-6" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr
              key={row.id ?? rowIndex}
              className="odd:bg-gray-200 even:bg-white"
            >
              {headers.map((header) => (
                <td
                  key={header.name}
                  className="px-3 py-2"
                >
                  {header.render
                    ? header.render(row)
                    : row[header.name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Validate the props received by Table.
Table.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      render: PropTypes.func,
    }).isRequired
  ).isRequired,

  data: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ).isRequired,
};

export default Table;
