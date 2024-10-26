import React from "react";
import Modal from "./components/Modal/Modal";
import EmployeeForm from "./components/EmployeeForm/EmployeeForm";
import { useDispatch } from "react-redux";
import { addEmployee } from "./features/employees/employeesSlice";
import styles from "./App.module.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Notification from "./components/Notification/Notification";
import EmployeeListPage from "./pages/EmployeeListPage/EmployeeListPage";
import EmployeeDetails from "./pages/EmployeeDetails/EmployeeDetails";
import { useNotification } from "./hooks/useNotification";
import { useModal } from "./hooks/useModal";

const App = () => {
  const { notification, showNotification, clearNotification } =
    useNotification();
  const { isOpen: isModalOpen, toggle: toggleModal } = useModal();
  const dispatch = useDispatch();

  const handleAddEmployee = (employee) => {
    dispatch(addEmployee(employee));
    toggleModal();
  };

  return (
    <div className={styles.container}>
      <Header onAddEmployee={toggleModal} />
      <main>
        <Routes>
          <Route path="/" element={<EmployeeListPage />} />
          <Route
            path="/employee/:id"
            element={<EmployeeDetails showNotification={showNotification} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <h2>Добавить сотрудника</h2>
        <EmployeeForm
          onSubmit={handleAddEmployee}
          showNotification={showNotification}
        />
      </Modal>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={clearNotification}
        />
      )}
    </div>
  );
};

export default App;
