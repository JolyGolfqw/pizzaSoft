import React from "react";
import styles from "./EmployeeForm.module.scss";
import DatePicker from "react-datepicker";
import Button from "../Button/Button";
import { useForm } from "../../hooks/useForm";

const EmployeeForm = ({ employee, onSubmit, showNotification }) => {
  const {
    name,
    phone,
    birthday,
    role,
    isArchive,
    errors,
    setBirthday,
    setRole,
    setIsArchive,
    handleNameChange,
    handlePhoneChange,
    handleSubmit,
    validateField,
    handleFocus,
  } = useForm(employee, onSubmit, showNotification);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Имя Фамилия:
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Иван Иванов"
          onFocus={() => handleFocus("name")}
          onBlur={() => validateField("name")}
          required
        />
        {errors.name && <div className={styles.error}>{errors.name}</div>}
      </label>

      <label>
        Телефон:
        <input
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="+7 (XXX) XXX-XXXX"
          onFocus={() => handleFocus("phone")}
          onBlur={() => validateField("phone")} 
        />
        {errors.phone && <div className={styles.error}>{errors.phone}</div>}
      </label>

      <label>
        Должность:
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="cook">Повар</option>
          <option value="waiter">Официант</option>
          <option value="driver">Водитель</option>
        </select>
      </label>

      <div className={styles.datePicker}>
        <label>
          Дата рождения:
          <DatePicker
            selected={birthday || undefined}
            onChange={setBirthday}
            dateFormat="dd.MM.yyyy"
            placeholderText="Выберите дату"
            showYearDropdown
            maxDate={new Date()}
            required
            yearDropdownItemNumber={100}
            scrollableYearDropdown
          />
        </label>
      </div>

      <label className={styles.archive}>
        В архиве
        <input
          type="checkbox"
          checked={isArchive}
          onChange={(e) => setIsArchive(e.target.checked)}
        />
      </label>

      <Button type="submit">Сохранить</Button>
    </form>
  );
};

export default EmployeeForm;
