
import {useEffect,useState} from "react";
import Table from "./components/Table";

function App() {
  const headers = [
    { name: "company", label: "Company" },
    { name: "contact", label: "Contact" },
    { name: "country", label: "Country" },
  ];


  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/data.json");

        if (!response.ok) {
          throw new Error("Failed to fetch company data");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-5 text-2xl font-bold text-gray-900">
          Company Directory
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table headers={headers} data={data} />
        )}
      </div>
    </main>
  );
}

export default App;
