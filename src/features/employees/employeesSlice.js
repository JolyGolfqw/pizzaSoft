import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEmployees } from "../../api/employeesApi";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const data = await getEmployees();
    return data;
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    filteredEmployees: [],
    loading: false,
    error: null,
  },
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    addEmployee: (state, action) => {
      const newEmployee = { ...action.payload, id: state.employees.length + 1 };
      state.employees.unshift(newEmployee);
    },
    editEmployee: (state, action) => {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index !== -1) {
        const updatedEmployee = {
          ...state.employees[index],
          ...action.payload,
          birthday:
            typeof action.payload.birthday === "string"
              ? action.payload.birthday
              : action.payload.birthday.toLocaleDateString("ru-RU"), // Преобразование в строку
        };
        state.employees[index] = updatedEmployee;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
        state.filteredEmployees = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  filterByRole,
  sortByName,
  sortByBirthday,
  addEmployee,
  editEmployee,
} = employeesSlice.actions;
export default employeesSlice.reducer;
