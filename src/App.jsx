
import {
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router";

import Home from "./pages/Home";
import AddCompany from "./pages/addCompany";

// Shared navigation layout
function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            to="/"
            className="text-xl font-bold text-gray-900"
          >
            Company Directory
          </Link>

          <div className="flex items-center gap-5">
            <Link
              to="/"
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/add-company"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              + Add Company
            </Link>
          </div>
        </div>
      </nav>

      {/* The selected page renders here */}
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/add-company"
          element={<AddCompany />}
        />
      </Route>
    </Routes>
  );
}

export default App;
