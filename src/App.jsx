import Table from "./components/Table";

function App() {
  return (
    <main className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-5 text-2xl font-bold text-gray-900">
          Company Directory
        </h1>

        <Table />

      </div>
    </main>
  );
}

export default App;