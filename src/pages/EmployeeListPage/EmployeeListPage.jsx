import React from "react";
import EmployeeList from "../../components/EmployeeList/EmployeeList";
import Filters from "../../components/Filters/Filters";
import styles from "./EmployeeListPage.module.scss";

import { useEmployeeData } from "../../hooks/useEmployees";

const EmployeeListPage = () => {
  const {
    employees,
    loading,
    error,
    roleFilter,
    setRoleFilter,
    isArchiveFilter,
    setIsArchiveFilter,
    sortOrder,
    setSortOrder,
    sortDirection,
    setSortDirection,
  } = useEmployeeData();

  return (
    <div>
      <h1 className={styles.title}>Список сотрудников</h1>
      <Filters
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        isArchiveFilter={isArchiveFilter}
        setIsArchiveFilter={setIsArchiveFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />

      <EmployeeList employees={employees} loading={loading} error={error} />
    </div>
  );
};

export default EmployeeListPage;
