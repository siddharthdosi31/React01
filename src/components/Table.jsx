
import PropTypes from "prop-types";

function Table({ headers, data, sortConfig, onSortChange }) {
  function handleSort(columnName) {
    if (!sortConfig || sortConfig.column !== columnName) {
      onSortChange({
        column: columnName,
        direction: "asc",
      });
    } else if (sortConfig.direction === "asc") {
      onSortChange({
        column: columnName,
        direction: "desc",
      });
    } else {
      onSortChange(null);
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm text-slate-700">
        <thead className="bg-blue-50/80 text-slate-700">
          <tr>
            {headers.map((header) => {
              const isActive =
                sortConfig?.column === header.name;

              return (
                <th
                  key={header.name}
                  scope="col"
                  className="border-b border-slate-200 px-5 py-4 font-semibold"
                >
                  <div className="group flex items-center gap-2">
                    <span>{header.label}</span>

                    {header.sortable && (
                      <button
                        type="button"
                        onClick={() => handleSort(header.name)}
                        aria-label={
                          !isActive
                            ? `Sort ${header.label} ascending`
                            : sortConfig.direction === "asc"
                              ? `Sort ${header.label} descending`
                              : `Remove sorting from ${header.label}`
                        }
                        title={
                          !isActive
                            ? "Sort ascending"
                            : sortConfig.direction === "asc"
                              ? "Sort descending"
                              : "Remove sorting"
                        }
                        className={`rounded-md p-1 transition hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-blue-500 ${
                          isActive
                            ? "text-blue-600"
                            : "text-slate-400 opacity-60 group-hover:opacity-100 group-focus-within:opacity-100"
                        }`}
                      >
                        {isActive &&
                        sortConfig.direction === "asc" ? (
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
              key={row.id ?? rowIndex}
              className="border-b border-slate-100 transition-colors odd:bg-white even:bg-slate-50/70 hover:bg-blue-50/70"
            >
              {headers.map((header) => (
                <td
                  key={header.name}
                  className="px-5 py-4"
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

  sortConfig: PropTypes.shape({
    column: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(["asc", "desc"]).isRequired,
  }),

  onSortChange: PropTypes.func.isRequired,
};

export default Table;
