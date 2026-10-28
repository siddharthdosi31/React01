
import PropTypes from "prop-types";

function Table({ headers, data, sortColumn, sortDirection, onSort }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left font-sans text-sm text-gray-800">
        <thead className="bg-white">
          <tr>
            {headers.map((header) => {
              const isActive = sortColumn === header.name;

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
                        onClick={() => onSort(header.name)}
                        aria-label={`Sort ${header.label}`}
                        title={
                          !isActive
                            ? "Sort descending"
                            : sortDirection === "desc"
                              ? "Sort ascending"
                              : "Sort descending"
                        }
                        className={`rounded p-1 hover:bg-gray-200 ${isActive
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                          }`}
                      >
                        {isActive && sortDirection === "asc" ? (
                          // Up arrow SVG
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
                          // Down arrow SVG
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
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="odd:bg-gray-200 even:bg-white"
            >
              {headers.map((header) => (
                <td key={header.name} className="px-3 py-2">
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

// Validate the props received by Table
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
  sortColumn: PropTypes.string.isRequired,
  sortDirection: PropTypes.oneOf(["asc", "desc"]).isRequired,
  onSort: PropTypes.func.isRequired,
};

export default Table;
