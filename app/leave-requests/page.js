"use client";

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import leaveRequestsData from '../data/leave-requests.json';

//this page is pretty straightforward.
const LeaveRequestsPage = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLeaveRequests(leaveRequestsData);
  }, []);

  const handleRequestResponse = (id, action) => {
    setLeaveRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id
          ? { ...request, status: action === 'approve' ? 'approved' : 'denied' }
          : request
      )
    );
    setMessage(`Leave ${action === 'approve' ? 'approved' : 'denied'}.`);
  };

  return (
    <div className="leave-requests-container">
      <h1 className="text-3xl font-bold text-center my-8">Leave Requests</h1>
      <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:underline">&larr; Back to Main Page</Link>
      </div>

      {leaveRequests.length === 0 ? (
        <p>No current leave requests.</p>
      ) : (
        <div className="leave-requests-list">
          {leaveRequests.map((request) => (
            <div
              key={request.id}
              className="leave-request-card border rounded-lg p-6 mb-4 shadow-md"
            >
              <h3 className="text-xl font-semibold">{request.employee}</h3>
              <p><strong>Leave Request Length:</strong> {request.leaveLength}</p>
              <p><strong>Requested Dates:</strong> {format(new Date(request.startDate), 'MMMM d, yyyy')} to {format(new Date(request.endDate), 'MMMM d, yyyy')}</p>
              <p><strong>Status:</strong> {request.status}</p>

              {/*approve and deny buttons*/}
              {request.status === "pending" && (
                <div className="mt-4">
                  <button
                    onClick={() => handleRequestResponse(request.id, 'approve')}
                    className="px-4 py-2 bg-green-500 text-white rounded-md mr-4"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRequestResponse(request.id, 'deny')}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Deny
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {message && <p className="mt-4 text-center font-medium">{message}</p>}
    </div>
  );
};

export default LeaveRequestsPage;
