import { useState, useCallback } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, openModal: () => setIsOpen(true), closeModal: () => setIsOpen(false), toggle };
};