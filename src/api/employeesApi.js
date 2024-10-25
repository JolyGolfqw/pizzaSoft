import employeesData from '../employees.json';

export const getEmployees = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(employeesData), 1000); // Имитация API запроса
  });
};
