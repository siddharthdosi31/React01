import Table from "./components/Table";

function App() {
  
  const headers = [
    {name:"company",label:"Company"},
    {name:"contact",label:"Contact"},
    {name:"country",label:"Country"},
  ];

  const data = [
    {
      company:"Alfreds Futterkiste",
      contact:"Maria Anders",
      country:"Germany",
    },
    {
      company:"Centro comercial Moctezuma",
      contact:"Francisco Chang",
      country:"Mexico",
    },
    {
      company:"Ernst Handel",
      contact:"Roland Mendel",
      country:"Austria",
    },
    {
      company:"Island Trading",
      contact:"Helen Bennett",
      country:"UK",
    },
    {
      company:"Laughing Bacchus Winecellars",
      contact:"Yoshi Tannamuri",
      country:"Canada",
    },
    {
      company: "Magazzini Alimentari Riuniti",
      contact: "Giovanni Rovelli",
      country: "Italy",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-5 text-2xl font-bold text-gray-900">
          Company Directory
        </h1>

        <Table headers={headers} data={data} />
      </div>
    </main>
  );
}

export default App;