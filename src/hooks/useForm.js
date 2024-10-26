import { useState, useCallback } from "react";
import {
  formatPhone,
  formatDate,
  validateName,
  validatePhone,
} from "../utils/formHelpers";

export const useForm = (employee = {}, onSubmit, showNotification) => {
  const [name, setName] = useState(employee?.name || "");
  const [phone, setPhone] = useState(employee?.phone || "");
  const [birthday, setBirthday] = useState(() => {
    if (employee && employee.birthday) {
      const dateParts = employee.birthday.split(".");
      if (dateParts.length === 3) {
        const parsedDate = new Date(
          `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`
        );
        return isNaN(parsedDate) ? null : parsedDate;
      }
    }
    return null;
  });

  const [role, setRole] = useState(employee?.role || "cook");
  const [isArchive, setIsArchive] = useState(employee?.isArchive || false);
  const [errors, setErrors] = useState({ name: "", phone: "" });

  const handleNameChange = useCallback((e) => {
    const inputValue = e.target.value;
    const formattedName = inputValue
      .toLowerCase()
      .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
    setName(formattedName);
  }, []);

  const handlePhoneChange = useCallback((e) => {
    setPhone(formatPhone(e.target.value));
  }, []);

  const validateField = useCallback(
    (field) => {
      if (field === "name") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: validateName(name),
        }));
      } else if (field === "phone") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phone: validatePhone(phone),
        }));
      }
    },
    [name, phone]
  );

  const handleFocus = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      validateField("name");
      validateField("phone");
      if (errors.name || errors.phone) return;
      onSubmit({
        name,
        phone,
        birthday: birthday ? formatDate(birthday) : "",
        role,
        isArchive,
      });
      showNotification(
        Object.keys(employee).length > 0
          ? "Сотрудник обновлен!"
          : "Сотрудник добавлен!",
        "success"
      );
    },
    [
      name,
      phone,
      birthday,
      role,
      isArchive,
      errors,
      onSubmit,
      showNotification,
      validateField,
      employee,
    ]
  );

  return {
    name,
    phone,
    birthday,
    role,
    isArchive,
    errors,
    setName,
    setPhone,
    setBirthday,
    setRole,
    setIsArchive,
    handleNameChange,
    handlePhoneChange,
    validateField,
    handleFocus,
    handleSubmit,
  };
};
