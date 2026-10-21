function Table() {
  const companies = [
    { company: "Alfreds Futterkiste", contact: "Maria Anders", country: "Germany" },
    { company: "Centro comercial Moctezuma", contact: "Francisco Chang", country: "Mexico" },
    { company: "Ernst Handel", contact: "Roland Mendel", country: "Austria" },
    { company: "Island Trading", contact: "Helen Bennett", country: "UK" },
    { company: "Laughing Bacchus Winecellars", contact: "Yoshi Tannamuri", country: "Canada" },
    { company: "Magazzini Alimentari Riuniti", contact: "Giovanni Rovelli", country: "Italy" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left font-sans text-sm text-gray-800">
        <thead className="bg-white">
          <tr>
            <th className="border border-white px-3 py-2 font-bold">Company</th>
            <th className="border border-white px-3 py-2 font-bold">Contact</th>
            <th className="border border-white px-3 py-2 font-bold">Country</th>
          </tr>
        </thead>

        <tbody>
          {companies.map((item) => (
            <tr
              key={item.company}
              className="odd:bg-gray-200 even:bg-white"
            >
              <td className="border border-white px-3 py-2">
                {item.company}
              </td>
              <td className="border border-white px-3 py-2">
                {item.contact}
              </td>
              <td className="border border-white px-3 py-2">
                {item.country}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;