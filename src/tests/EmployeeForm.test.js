import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeForm from '../components/EmployeeForm/EmployeeForm';
import { useForm } from '../hooks/useForm';

jest.mock('../hooks/useForm');

describe('EmployeeForm', () => {
  const mockOnSubmit = jest.fn();
  const mockShowNotification = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Отображение формы для добавления нового сотрудника', () => {
    const useFormMock = {
      name: '',
      phone: '',
      birthday: null,
      role: 'cook',
      isArchive: false,
      errors: {},
      handleSubmit: jest.fn(),
    };
    require('../hooks/useForm').useForm.mockReturnValue(useFormMock);

    render(<EmployeeForm onSubmit={mockOnSubmit} showNotification={mockShowNotification} />);

    expect(screen.getByLabelText(/Имя Фамилия:/i)).toHaveValue('');
    expect(screen.getByLabelText(/Телефон:/i)).toHaveValue('');
    expect(screen.getByLabelText(/Должность:/i)).toHaveValue('cook');
    expect(screen.getByLabelText(/В архиве/i)).not.toBeChecked();
  });

  test('Отображение формы для изменения существующего сотрудника', () => {
    const existingEmployee = {
      name: 'Иван Иванов',
      phone: '+7 (123) 456-7890',
      birthday: new Date('1990-01-01'),
      role: 'waiter',
      isArchive: true,
    };

    const useFormMock = {
      ...existingEmployee,
      errors: {},
      handleSubmit: jest.fn(),
    };
    require('../hooks/useForm').useForm.mockReturnValue(useFormMock);

    render(<EmployeeForm employee={existingEmployee} onSubmit={mockOnSubmit} showNotification={mockShowNotification} />);

    expect(screen.getByLabelText(/Имя Фамилия:/i)).toHaveValue('Иван Иванов');
    expect(screen.getByLabelText(/Телефон:/i)).toHaveValue('+7 (123) 456-7890');
    expect(screen.getByLabelText(/Должность:/i)).toHaveValue('waiter');
    expect(screen.getByLabelText(/В архиве/i)).toBeChecked();
  });

    test('Отправка формы с правильными данными при добавлении сотрудника', () => {
    const newEmployee = {
      name: 'Петр Петров',
      phone: '+7 (987) 654-3210',
      birthday: new Date('1995-05-15'),
      role: 'driver',
      isArchive: false,
    };

    const mockHandleSubmit = jest.fn((e) => {
      e.preventDefault();
      mockOnSubmit(newEmployee);
    });

    useForm.mockReturnValue({
      ...newEmployee,
      errors: {},
      handleSubmit: mockHandleSubmit,
      setName: jest.fn(),
      setPhone: jest.fn(),
      setBirthday: jest.fn(),
      setRole: jest.fn(),
      setIsArchive: jest.fn(),
    });

    render(<EmployeeForm onSubmit={mockOnSubmit} showNotification={mockShowNotification} />);

    fireEvent.submit(screen.getByRole('button', { name: /Сохранить/i }));

    expect(mockHandleSubmit).toHaveBeenCalled();
    expect(mockOnSubmit).toHaveBeenCalledWith(newEmployee);
  });
});