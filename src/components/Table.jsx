function Table({ headers, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left font-sans text-sm text-gray-800">
        <thead className="bg-white">
          <tr>
            {headers.map((header) => (
              <th
                key={header.name}
                className="border border-white px-3 py-2 font-bold"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="odd:bg-gray-200 even:bg-white"
            >
              {headers.map((header) => (
                <td
                  key={header.name}
                  className="border border-white px-3 py-2"
                >
                  {row[header.name]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;