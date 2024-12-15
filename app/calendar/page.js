"use client";

import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import Link from 'next/link';
import employees from '../data/employees.json';

//employee data is stored in a json file. much more data regarding the employee is missing, but that can be fixed next semester.
//calendar page is more straightforward than employee page, so not much explaining needs to be done
//to add: make it so the 'shift' variable in the employees.json corresponds to the time they come in for work and such
const CalendarPage = () => {
  const [currentTab, setCurrentTab] = useState('');
  const today = new Date();
  const startOfMonthDate = startOfMonth(today);
  const endOfMonthDate = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({ start: startOfMonthDate, end: endOfMonthDate });

  //calculate the empty spaces before the start of the month 
  //this is to make sure the calendar looks aligned to what it should be
  const startWeek = startOfWeek(startOfMonthDate);
  const endWeek = endOfWeek(endOfMonthDate);
  const daysInCalendar = eachDayOfInterval({ start: startWeek, end: endWeek });

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  //get the shifts for the current role
  //again, this could change because of persistence
  const getEmployeeShiftsForDay = (day) => {
    return employees
      .filter(employee => employee.role === currentTab)
      .map(employee => {
        const dayOfWeek = format(day, 'EEEE'); //get day of the week (Monday, Tuesday, etc.)
        if (employee.hours[dayOfWeek]) {
          return {
            name: employee.name,
            hours: employee.hours[dayOfWeek],
            shift: employee.shifts.find(shift => shift === format(day, 'd')) //match shift with day of the month
          };
        }
        return null;
      })
      .filter(Boolean); //null values are filtered out
  };

  return (
    <div className="calendar-container">
      <h1 className="calendar-header text-3xl font-bold text-center my-8">{`Shift Calendar: ${currentTab}`}</h1>

      <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:underline">&larr; Back to Main Page</Link>
      </div>

      {/*roles tabs*/}
      <div className="flex justify-center space-x-4 mb-8">
        {['Regional Manager','Sales','Reception','Accounting','Warehouse','Customer Service','Quality Assurance','Supplier Relations','Human Resources'].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 rounded border-2 ${
              currentTab === tab
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-blue-500 border-blue-500'
            }`}
            onClick={() => handleTabChange(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/*calendar grid*/}
      <div className="calendar grid grid-cols-7 gap-4 px-4">
        {daysInCalendar.map((day) => (
          <div
            key={day}
            className="calendar-day border rounded-lg p-6 flex flex-col justify-start items-center text-center shadow-sm hover:shadow-md"
          >
            <span className="text-lg font-bold">{format(day, 'd')}</span>

            {/*display the day shifts for each employee*/}
            <div className="mt-2 text-xs text-gray-600">
              {getEmployeeShiftsForDay(day).map((shiftInfo, index) => (
                <div key={index}>
                  <strong>{shiftInfo.name}</strong>: {shiftInfo.hours} hours
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;
