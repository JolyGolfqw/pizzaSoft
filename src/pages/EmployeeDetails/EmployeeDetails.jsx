import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editEmployee } from "../../features/employees/employeesSlice";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import styles from "./EmployeeDetails.module.scss";
import Loader from "../../components/Loader/Loader";
import { useEmployee } from "../../hooks/useEmployees";

const EmployeeDetails = ({ showNotification }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const employee = useEmployee(id);

  const handleFormSubmit = (updatedEmployee) => {
    dispatch(editEmployee({ id: parseInt(id), ...updatedEmployee }));
    showNotification("Сотрудник обновлен!", "success");
  };

  if (!employee) return <Loader />;

  return (
    <div className={styles.details}>
      <h1 className={styles.title}>Редактирование сотрудника</h1>
      <Link to="/">Назад</Link>
      <EmployeeForm
        employee={employee}
        onSubmit={handleFormSubmit}
        showNotification={showNotification}
      />
    </div>
  );
};

export default EmployeeDetails;
