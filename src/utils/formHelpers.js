// formHelpers.js
export const formatPhone = (value) => {
  const cleaned = value.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
  }
  return cleaned.slice(0, 11);
};

export const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export const validateName = (name) => {
  return /^[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)+$/.test(name.trim()) &&
    name.trim().split(" ").length === 2
    ? ""
    : "Введите корректное Имя и Фамилию.";
};

export const validatePhone = (phone) => {
  return /^\+7 \(\d{3}\) \d{3}-\d{4}$/.test(phone)
    ? ""
    : "Введите корректный номер телефона.";
};
