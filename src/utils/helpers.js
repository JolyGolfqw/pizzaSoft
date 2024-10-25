export const sortByName = (employees, direction = 'asc') => {
    return employees.slice().sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return direction === 'asc' ? comparison : -comparison;
    });
  };
  
  export const sortByBirthday = (employees, direction = 'asc') => {
    return employees.slice().sort((a, b) => {
      const dateA = a.birthday.split('.').reverse().join('-');
      const dateB = b.birthday.split('.').reverse().join('-');
      const comparison = new Date(dateA) - new Date(dateB);
      return direction === 'asc' ? comparison : -comparison;
    });
  };
  
  export const filterByRoleAndStatus = (employees, role, isArchive) => {
    return employees.filter((emp) =>
      (role ? emp.role === role : true) &&
      (isArchive !== null ? emp.isArchive === isArchive : true)
    );
  };
  
  export const applySorting = (employees, sortOrder, sortDirection) => {
    if (sortOrder === 'default') {
      return employees; 
    }
  
    let sortedEmployees = employees;
    
    if (sortOrder === 'name') {
      sortedEmployees = sortByName(sortedEmployees, sortDirection);
    } else if (sortOrder === 'age') {
      sortedEmployees = sortByBirthday(sortedEmployees, sortDirection);
    }
    
    return sortedEmployees;
  };
  
  // Вычисления возраста
  export const calculateAge = (birthday) => {
    if (!birthday) return null;
    
    // Разбиваем строку даты на день, месяц и год
    const [day, month, year] = birthday.split('.');
    
    // Создаем объект Date, обратите внимание на порядок: год, месяц (0-11), день
    const birthDate = new Date(year, month - 1, day);
    
    if (isNaN(birthDate.getTime())) return null;
    
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

// Перевод ролей
export const roleTranslations = {
  cook: "Повар",
  driver: "Водитель",
  waiter: "Официант",
};
