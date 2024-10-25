import React from "react";
import styles from "./EmployeeList.module.scss";
import EmployeeCard from "../Employee/EmployeeCard";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import Button from "../Button/Button";
import { usePagination } from "../../hooks/usePagination";

const EmployeeList = ({ employees, loading, error }) => {

  const {
    currentItems: currentEmployees,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    handleNextPage,
    handlePreviousPage,
  } = usePagination(employees);


  if (loading) return <Loader />;
  if (error) return <Error text={"Произошла ошибка при загрузке сотрудников"} />;

  return (
    <div className={styles.employeeListContainer}>
      <ul className={styles.employeeList}>
        {currentEmployees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </ul>
      
      <div className={styles.pagination}>
        <Button onClick={handlePreviousPage} disabled={!hasPreviousPage}>
          Назад
        </Button>
        <span>
          Страница {currentPage} из {totalPages}
        </span>
        <Button onClick={handleNextPage} disabled={!hasNextPage}>
          Вперед
        </Button>
      </div>
    </div>
  );
};

export default EmployeeList;
