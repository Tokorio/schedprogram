"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import employeesData from '../data/employees.json';

//this page was a headache and probably needs a lot more digestion and organization
//i will explain each part so you can take it apart next semester

//employee data is saved in json files as seen below in the newEmployee useState hook
//ill explain the other state variables and their uses:
const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]); //holds all employee data from employees.json
  const [filteredEmployees, setFilteredEmployees] = useState([]); //holds filtered employees based on role selected
  const [roleFilter, setRoleFilter] = useState('');//tracks selected filter
  const [dayFilter, setDayFilter] = useState('');//deprecated day filter, but you can try and make it work
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    shifts: [],
    hours: {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
    },
  });//stores data of new employee

  const shifts = Array.isArray(newEmployee.shifts) ? newEmployee.shifts : [];
  newEmployee.shifts = shifts; //this was added to make sure newEmployee.shifts was always taken as an array.

  const [editEmployee, setEditEmployee] = useState(null);

  //this useEffect hook sets the employees and filteredEmployees states to the data imported from the employees.json file.
  useEffect(() => {
    setEmployees(employeesData);
    setFilteredEmployees(employeesData);
  }, []);

  //EVENT HANDLERS
  //updates roleFilter and triggers filterEmployees. deprecated dayFilter is seen here
  const handleRoleFilterChange = (e) => {
    const selectedRole = e.target.value;
    setRoleFilter(selectedRole);
    filterEmployees(selectedRole, dayFilter);
  };

  //doesnt work
  const handleDayFilterChange = (e) => {
    const selectedDay = e.target.value;
    setDayFilter(selectedDay);
    filterEmployees(roleFilter, selectedDay);
  };


  //filters employees based on selected role (deprecated day)
  const filterEmployees = (role, day) => {
    let filtered = employees;

    if (role) {
      filtered = filtered.filter((employee) => employee.role === role);
    }

    if (day) {
      filtered = filtered.filter((employee) =>
        employee.shifts.some(shift => shift === day)//checks if the employee works on the selected day. doesnt work as i removed it
      );
    }

    setFilteredEmployees(filtered);
  };

  //updates newEmployee state when manager types in any input field when 'edit' button is pressed
  const handleAddEmployeeChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //changes hours upon edit
  const handleHoursChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      hours: {
        ...prev.hours,
        [name]: value,
      },
    }));
  };

  //changes shift upon edit
  const handleShiftsChange = (e) => {
    const { value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      shifts: value.split(',').map((shift) => shift.trim()),
    }));
  };

  //adds new employee to both employees and filteredEmployees state
  const handleAddEmployee = () => {
    const newId = employees.length + 1;
    const addedEmployee = { ...newEmployee, id: newId };
    const updatedEmployees = [...employees, addedEmployee];
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
    setNewEmployee({
      name: '',
      role: '',
      shifts: [],
      hours: {
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
      },
    });
  };

  //populates new employee with employee data
  const handleEditEmployee = (employee) => {
    setEditEmployee(employee);
    setNewEmployee({
      ...employee,
      shifts: employee.shifts.join(', '),
    });
  };

  //saves changes upon edit
  const handleSaveEdit = () => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === editEmployee.id ? { ...editEmployee, ...newEmployee } : employee
    );
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
    setEditEmployee(null);
    setNewEmployee({
      name: '',
      role: '',
      shifts: [],
      hours: {
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
      },
    });
  };

  //deletes employee from employees and filteredEmployees list
  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
  };

  return (
    <div className="employees-page">
      <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded-md mb-4">
        Back
      </Link>

      <h1 className="text-3xl font-bold text-center my-8">Employee List</h1>

      {/*role filter, day filter was removed from code*/}
      <div className="filters flex justify-center space-x-6 mb-8">
        <div>
          <label htmlFor="roleFilter" className="font-semibold">Filter by Role:</label>
          <select
            id="roleFilter"
            value={roleFilter}
            onChange={handleRoleFilterChange}
            className="ml-2 p-2 border rounded text-gray-900"
          >
            <option value="">All Roles</option>
            <option value="Regional Manager">Regional Manager</option>
            <option value="Sales">Sales</option>
            <option value="Reception">Reception</option>
            <option value="Accounting">Accounting</option>
            <option value="Warehouse">Warehouse</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Quality Assurance">Quality Assurance</option>
            <option value="Supplier Relations">Supplier Relations</option>
            <option value="Human Resources">Human Resources</option>
          </select>
        </div>
      </div>

      {/*employee form. used both for editing and adding employee*/}
      <div className="employee-form mb-8">
        <h2 className="text-2xl font-semibold mb-4">{editEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={newEmployee.name}
            onChange={handleAddEmployeeChange}
            className="p-2 border rounded text-gray-900"
          />
        </div>
        <div>
          <label>Role: </label>
          <input
            type="text"
            name="role"
            value={newEmployee.role}
            onChange={handleAddEmployeeChange}
            className="p-2 border rounded text-gray-900"
          />
        </div>
        <div>
          <label>Shifts (comma separated): </label>
          <input
            type="text"
            name="shifts"
            value={newEmployee.shifts.join(', ')}
            onChange={handleShiftsChange}
            className="p-2 border rounded text-gray-900"
          />
        </div>
        <div>
          <label>Hours (Monday to Friday): </label>
          <div className="grid grid-cols-5 gap-4">
            {Object.keys(newEmployee.hours).map((day) => (
              <div key={day}>
                <label>{day}: </label>
                <input
                  type="number"
                  name={day}
                  value={newEmployee.hours[day]}
                  onChange={handleHoursChange}
                  className="p-2 border rounded w-full text-gray-900"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <button
            onClick={editEmployee ? handleSaveEdit : handleAddEmployee}
            className="px-4 py-2 bg-green-500 text-white rounded-md mt-4"
          >
            {editEmployee ? 'Save Changes' : 'Add Employee'}
          </button>
        </div>
      </div>

      {/*employee list section, arranged in grid*/}
      <div className="employee-list">
        {filteredEmployees.length === 0 ? (
          <p>No employees match the selected filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="employee-card border rounded-lg p-4 shadow-md bg-white">
                <h3 className="text-xl text-gray-900 font-semibold">{employee.name}</h3>
                <p className="text-gray-900"><strong>Role:</strong> {employee.role}</p>
                <p className="text-gray-900"><strong>Shifts:</strong> {employee.shifts.join(", ")}</p>
                <p className="text-gray-900"><strong>Hours:</strong></p>
                <ul className="text-gray-900">
                  {Object.keys(employee.hours).map((day) => (
                    <li key={day}>
                      {day}: {employee.hours[day]} hours
                    </li>
                  ))}
                </ul>
                <div className="actions flex space-x-4 mt-4">
                  <button
                    onClick={() => handleEditEmployee(employee)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEmployee(employee.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeesPage;
