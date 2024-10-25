import React, { useEffect } from 'react';
import styles from './Notification.module.scss';

const Notification = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    // Таймер для автоматического закрытия через 5 секунд
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer); // Очистка таймера при размонтировании компонента
  }, [onClose]);

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      {message}
    </div>
  );
};

export default Notification;
