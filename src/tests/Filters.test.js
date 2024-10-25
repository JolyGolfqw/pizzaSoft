import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Filters from '../components/Filters/Filters';

describe('Filters', () => {
  const mockSetRoleFilter = jest.fn();
  const mockSetIsArchiveFilter = jest.fn();
  const mockSetSortOrder = jest.fn();
  const mockSetSortDirection = jest.fn();

  const defaultProps = {
    roleFilter: '',
    setRoleFilter: mockSetRoleFilter,
    isArchiveFilter: false,
    setIsArchiveFilter: mockSetIsArchiveFilter,
    sortOrder: 'name',
    setSortOrder: mockSetSortOrder,
    sortDirection: 'asc',
    setSortDirection: mockSetSortDirection,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Отображение всех фильтров', () => {
    render(<Filters {...defaultProps} />);

    expect(screen.getByLabelText(/В архиве/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Должность')).toBeInTheDocument();
    expect(screen.getByLabelText('Порядок сортировки')).toBeInTheDocument();
    expect(screen.getByLabelText('Направление сортировки')).toBeInTheDocument();
  });

  test('Изменение фильтра архива', () => {
    render(<Filters {...defaultProps} />);

    const archiveCheckbox = screen.getByLabelText(/В архиве/i);
    fireEvent.click(archiveCheckbox);

    expect(mockSetIsArchiveFilter).toHaveBeenCalledWith(true);
  });

  test('Изменение фильтра должности', () => {
    render(<Filters {...defaultProps} />);

    const roleSelect = screen.getByLabelText('Должность');
    fireEvent.change(roleSelect, { target: { value: 'cook' } });

    expect(mockSetRoleFilter).toHaveBeenCalledWith('cook');
  });

  test('Изменение порядка сортировки', () => {
    render(<Filters {...defaultProps} />);

    const sortOrderSelect = screen.getByLabelText('Порядок сортировки');
    fireEvent.change(sortOrderSelect, { target: { value: 'age' } });

    expect(mockSetSortOrder).toHaveBeenCalledWith('age');
  });

  test('Изменение направления сортировки', () => {
    render(<Filters {...defaultProps} />);

    const sortDirectionSelect = screen.getByLabelText('Направление сортировки');
    fireEvent.change(sortDirectionSelect, { target: { value: 'desc' } });

    expect(mockSetSortDirection).toHaveBeenCalledWith('desc');
  });
});
