import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

const Header = ({ onAddEmployee }) => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        ПиццаСофт
      </Link>
      <Button onClick={onAddEmployee}>Добавить сотрудника</Button>
    </header>
  );
};

export default Header;
