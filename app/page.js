"use client";

import React from 'react';
import Link from 'next/link';

//for Matthew and Merlin to read in case I am unable to attend next semester, or we are split up.
//i only have these pages created for now, i would to be able to add a few things to the pages such as nested pages for employee data and managing it
//as well as being able to directly edit shift schedules and such in the calendar page itself.
//
//something i would also like to be able to do is get the scheduling algorithm working. because i have not managed to put all the data into persistence
//but instead i have saved it all as json, it is not really possible to use an algorithm to balance all the shifts again. not really sure what the algorithm might look like
//but it may be along the lines of:
//calculate total hours in month (will have a total for each role)
//calculate total hours of employee contracted hours per role
//find the percentage of contracted hours and total available hours
//if there is not enough, send out requests to employees to take up more shifts
//if there is more than enough, use the calculated percentage to distribute employees per shift using loops
//distribution will be random using employee ids
//
//this is the best way i can randomly and evenly distribute work hours in my head
//this algorithm would run every time a leave is approved, employee data is changed, or is just manually ran by the manager
const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1 className="text-3xl font-bold text-center my-8">Manager menu for scheduling app</h1>
      <div className="flex flex-col items-center">
        <ul className="space-y-12"> 
          <li>
            <Link href="/calendar" legacyBehavior>
              <a className="bg-blue-500 text-white px-6 py-3 rounded shadow hover:bg-blue-600">
                View/Edit Schedules
              </a>
            </Link>
          </li>
          <li>
            <Link href="/leave-requests" legacyBehavior>
              <a className="bg-green-500 text-white px-6 py-3 rounded shadow hover:bg-green-600">
                Manage Leave Requests
              </a>
            </Link>
          </li>
          <li>
            <Link href="/algorithm" legacyBehavior>
              <a className="bg-purple-500 text-white px-6 py-3 rounded shadow hover:bg-purple-600">
                Run Scheduling Algorithm
              </a>
            </Link>
          </li>
          <li>
            <Link href="/employees" legacyBehavior>
              <a className="bg-red-500 text-white px-6 py-3 rounded shadow hover:bg-red-600">
                View Employees
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
