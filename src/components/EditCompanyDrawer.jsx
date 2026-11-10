
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCompany } from "../features/companies/companySlice";

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

function EditCompanyDrawer({ company, onClose }) {
  const dispatch = useDispatch();

  const editLoading = useSelector((state) => state.companies.editLoading);
  const editError = useSelector((state) => state.companies.editError);

  // Initialize the form using the selected company.
  const [values, setValues] = useState(() => ({
    company: company.company ?? "",
    contact: company.contact ?? "",
    country: company.country ?? "",
    email: company.email ?? "",
    logo: company.logo ?? null,
  }));

  // A newly selected file is stored separately.
  const [newLogo, setNewLogo] = useState(null);

  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [newLogoPreview, setNewLogoPreview] = useState(null);

  // Trigger the slide-in animation after mounting.
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      setIsOpen(true);
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Create and clean up the preview URL when the selected logo changes.
  useEffect(() => {
    if (!newLogo) {
      setNewLogoPreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(newLogo);
    setNewLogoPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [newLogo]);

  // Close the panel when Escape is pressed.
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape" && !editLoading) {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, editLoading]);

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  }

  function handleLogoChange(event) {
    const file = event.target.files[0] || null;

    if (file && !["image/jpeg", "image/png"].includes(file.type)) {
      setNewLogo(null);
      event.target.value = "";

      setErrors((previousErrors) => ({
        ...previousErrors,
        logo: "Only JPG and PNG files are allowed",
      }));
      return;
    }

    setNewLogo(file);

    setErrors((previousErrors) => ({
      ...previousErrors,
      logo: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!values.company.trim()) {
      newErrors.company = "Company name is required";
    }

    if (!values.contact.trim()) {
      newErrors.contact = "Contact name is required";
    }

    if (!values.country) {
      newErrors.country = "Please select a country";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (
      newLogo &&
      !["image/jpeg", "image/png"].includes(newLogo.type)
    ) {
      newErrors.logo = "Only JPG and PNG files are allowed";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();

    formData.append("company", values.company.trim());
    formData.append("contact", values.contact.trim());
    formData.append("country", values.country);
    formData.append("email", values.email.trim());

    // Only send an image if the user selected a replacement.
    if (newLogo) {
      formData.append("image", newLogo);
    }

    try {
      const updatedCompany = await dispatch(
        editCompany({
          id: company.id,
          formData,
        })
      ).unwrap();

      console.log("Company updated successfully:", updatedCompany);

      onClose();
    } catch (error) {
      console.error("Failed to update company:", error);

      if (typeof error === "object" && error !== null) {
        setErrors(error);
      } else {
        setErrors({ submit: String(error) });
      }
    }
  };

  const currentLogoUrl =
    typeof values.logo === "string" ? values.logo : null;

  const logoPreview = newLogoPreview || currentLogoUrl;

  const submitError =
    errors.submit ||
    (typeof editError === "string"
      ? editError
      : editError
        ? Object.values(editError).join(", ")
        : "");

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark background overlay */}
      <button
        type="button"
        aria-label="Close edit panel"
        onClick={onClose}
        disabled={editLoading}
        className={`absolute inset-0 h-full w-full bg-black/40 transition-opacity duration-300 disabled:cursor-not-allowed ${isOpen ? "opacity-100" : "opacity-0"
          }`}
      />

      {/* Sliding panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-company-title"
        className={`absolute right-0 top-0 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Company Directory
            </p>

            <h2
              id="edit-company-title"
              className="mt-1 text-xl font-bold text-gray-900"
            >
              Edit Company
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update the details for {company.company}.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={editLoading}
            aria-label="Close edit panel"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable form area */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col overflow-y-auto"
        >
          <div className="flex-1 space-y-5 px-6 py-6">
            {/* Company */}
            <div>
              <label
                htmlFor="edit-company"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Company Name *
              </label>

              <input
                id="edit-company"
                name="company"
                type="text"
                value={values.company}
                onChange={handleChange}
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
              <label
                htmlFor="edit-contact"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Contact Person *
              </label>

              <input
                id="edit-contact"
                name="contact"
                type="text"
                value={values.contact}
                onChange={handleChange}
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
              <label
                htmlFor="edit-country"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Country *
              </label>

              <select
                id="edit-country"
                name="country"
                value={values.country}
                onChange={handleChange}
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
              <label
                htmlFor="edit-email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address *
              </label>

              <input
                id="edit-email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="example@company.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Logo */}
            <div>
              <label
                htmlFor="edit-logo"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Company Logo
              </label>

              {logoPreview && (
                <div className="mb-3 flex items-center gap-3">
                  <img
                    src={logoPreview}
                    alt={`${company.company} logo preview`}
                    className="h-16 w-16 rounded-lg border border-gray-200 object-contain p-1"
                  />

                  <p className="text-sm text-gray-500">
                    {newLogo
                      ? newLogo.name
                      : "Current company logo"}
                  </p>
                </div>
              )}

              <input
                id="edit-logo"
                type="file"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                onChange={handleLogoChange}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-600"
              />

              <p className="mt-1 text-xs text-gray-400">
                Choose a new JPG or PNG file to replace the current logo.
              </p>

              {errors.logo && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.logo}
                </p>
              )}
            </div>

            {submitError && (
              <p className="text-sm text-red-500">
                {submitError}
              </p>
            )}
          </div>

          {/* Submit footer */}
          <div className="border-t border-gray-200 bg-white px-6 py-5">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={editLoading}
                className="flex-1 rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={editLoading}
                className="flex-1 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {editLoading ? "Saving..." : "Submit"}
              </button>
            </div>

            <p className="mt-3 text-center text-xs text-gray-400">
              * Required fields
            </p>
          </div>
        </form>
      </aside>
    </div>
  );
}

export default EditCompanyDrawer;
