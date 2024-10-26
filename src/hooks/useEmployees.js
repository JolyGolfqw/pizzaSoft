import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../features/employees/employeesSlice";
import { filterByRoleAndStatus, applySorting } from "../utils/helpers";

export const useEmployeeData = () => {
  const dispatch = useDispatch();
  const { employees, loading, error } = useSelector((state) => state.employees);
  const [roleFilter, setRoleFilter] = useState("");
  const [isArchiveFilter, setIsArchiveFilter] = useState(null);
  const [sortOrder, setSortOrder] = useState("default");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    if (!employees.length) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employees.length]);

  const filteredEmployees = useMemo(() => {
    return filterByRoleAndStatus(employees, roleFilter, isArchiveFilter);
  }, [employees, roleFilter, isArchiveFilter]);

  const sortedEmployees = useMemo(() => {
    return applySorting(filteredEmployees, sortOrder, sortDirection);
  }, [filteredEmployees, sortOrder, sortDirection]);

  return {
    employees: sortedEmployees,
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
  };
};

export const useEmployee = (id) => {
  const dispatch = useDispatch();

  const employee = useSelector((state) =>
    state.employees.employees.find((emp) => emp.id === parseInt(id))
  );

  useEffect(() => {
    if (!employee) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, employee]);

  return employee;
};
