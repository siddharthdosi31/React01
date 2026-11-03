
import useForm from "../hooks/useForm";

// Define the form fields and their validation rules.
const formStructure = [
  {
    id: "company",
    initialValue: "",
    validations: [
      (value) =>
        !value.trim() ? "Company name is required" : "",
    ],
  },
  {
    id: "contact",
    initialValue: "",
    validations: [
      (value) =>
        !value.trim() ? "Contact name is required" : "",
    ],
  },
  {
    id: "country",
    initialValue: "",
    validations: [
      (value) =>
        !value ? "Please select a country" : "",
    ],
  },
  {
    id: "email",
    initialValue: "",
    validations: [
      (value) =>
        !value.trim() ? "Email is required" : "",
      (value) =>
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Enter a valid email address"
          : "",
    ],
  },
  {
    id: "logo",
    initialValue: null,
    validations: [
      (value) =>
        !value ? "Company logo is required" : "",
      (value) =>
        value &&
        !["image/jpeg", "image/png"].includes(value.type)
          ? "Only JPG and PNG files are allowed"
          : "",
    ],
  },
];

const countries = [
  { code: "USA", name: "United States" },
  { code: "GBR", name: "United Kingdom" },
  { code: "CAN", name: "Canada" },
  { code: "IRL", name: "Ireland" },
  { code: "JPN", name: "Japan" },
  { code: "SGP", name: "Singapore" },
  { code: "CHN", name: "China" },
  { code: "SWE", name: "Sweden" },
  { code: "NLD", name: "Netherlands" },
  { code: "IND", name: "India" },
  { code: "AUS", name: "Australia" },
  { code: "FRA", name: "France" },
  { code: "BRA", name: "Brazil" },
  { code: "ITA", name: "Italy" },
  { code: "DEU", name: "Germany" },
  { code: "KOR", name: "South Korea" },
  { code: "ARE", name: "United Arab Emirates" },
  { code: "ESP", name: "Spain" },
];

function AddCompany() {
  const {
    values,
    valuesSetter,
    errors,
    validateForm,
    isValid,
  } = useForm(formStructure);

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("New Company Details:", {
      company: values.company,
      contact: values.contact,
      country: values.country,
      email: values.email,
      logo: values.logo,
    });

    alert("Company details submitted successfully!");
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Company Directory
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Add a New Company
          </h1>

          <p className="mt-2 text-gray-500">
            Enter the company details below.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {/* Company name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Company Name *
            </label>

            <input
              type="text"
              value={values.company}
              onChange={(event) =>
                valuesSetter("company", event.target.value)
              }
              placeholder="Enter company name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            {errors.company && (
              <p className="mt-1 text-sm text-red-500">
                {errors.company}
              </p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Contact Person *
            </label>

            <input
              type="text"
              value={values.contact}
              onChange={(event) =>
                valuesSetter("contact", event.target.value)
              }
              placeholder="Enter contact person"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            {errors.contact && (
              <p className="mt-1 text-sm text-red-500">
                {errors.contact}
              </p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Country *
            </label>

            <select
              value={values.country}
              onChange={(event) =>
                valuesSetter("country", event.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">Select a country</option>

              {countries.map((country) => (
                <option
                  key={country.code}
                  value={country.code}
                >
                  {country.name}
                </option>
              ))}
            </select>

            {errors.country && (
              <p className="mt-1 text-sm text-red-500">
                {errors.country}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address *
            </label>

            <input
              type="email"
              value={values.email}
              onChange={(event) =>
                valuesSetter("email", event.target.value)
              }
              placeholder="example@company.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          {/* Logo upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Company Logo *
            </label>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              onChange={(event) =>
                valuesSetter(
                  "logo",
                  event.target.files[0] || null
                )
              }
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-600"
            />

            {values.logo && (
              <p className="mt-2 text-sm text-gray-500">
                Selected: {values.logo.name}
              </p>
            )}

            {errors.logo && (
              <p className="mt-1 text-sm text-red-500">
                {errors.logo}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="border-t border-gray-100 pt-5">
            <button
              type="submit"
              disabled={!isValid}
              className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Add Company
            </button>

            <p className="mt-3 text-center text-xs text-gray-400">
              * All fields are required
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCompany;
