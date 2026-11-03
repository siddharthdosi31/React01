
import { useState } from "react";

function useForm(formStructure) {
  // Build initial values using each field's id.
  const [values, setValues] = useState(() =>
    Object.fromEntries(
      formStructure.map((field) => [
        field.id,
        field.initialValue ?? "",
      ])
    )
  );

  const [errors, setErrors] = useState({});

  // Run all validation functions for one field.
  function validateField(id, value) {
    const field = formStructure.find((item) => item.id === id);

    if (!field) return "";

    for (const validation of field.validations || []) {
      const error = validation(value);

      if (error) {
        return error;
      }
    }

    return "";
  }

  // Update a field's value and its validation error.
  function valuesSetter(id, value) {
    setValues((previousValues) => ({
      ...previousValues,
      [id]: value,
    }));

    const error = validateField(id, value);

    setErrors((previousErrors) => ({
      ...previousErrors,
      [id]: error,
    }));
  }

  // Validate every field when the form is submitted.
  function validateForm() {
    const newErrors = {};

    formStructure.forEach((field) => {
      newErrors[field.id] = validateField(
        field.id,
        values[field.id]
      );
    });

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  }

  // Used to disable the submit button until every field is valid.
  const isValid = formStructure.every(
    (field) => !validateField(field.id, values[field.id])
  );

  return {
    values,
    valuesSetter,
    errors,
    validateForm,
    isValid,
  };
}

export default useForm;
