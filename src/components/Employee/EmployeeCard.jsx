import { calculateAge, roleTranslations } from "../../utils/helpers";
import styles from "./EmployeeCard.module.scss";
import { Link } from "react-router-dom";

const EmployeeCard = ({ employee }) => {
  const translatedRole = roleTranslations[employee.role] || employee.role;
  const age = calculateAge(employee.birthday);

  return (
    <div className={styles.card}>
      <Link to={`/employee/${employee.id}`}>
        <h2>{employee.name}</h2>
        <p>Должность: {translatedRole}</p>
        <p>Возраст: {age}</p>
        <p>Телефон: {employee.phone}</p>
      </Link>
    </div>
  );
};

export default EmployeeCard;
