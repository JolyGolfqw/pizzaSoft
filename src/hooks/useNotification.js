import { useState, useCallback } from "react";

export const useNotification = () => {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000); 
  }, []);

  return {
    notification,
    showNotification,
    clearNotification: () => setNotification(null),
  };
};
