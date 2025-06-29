import React from "react";
import { format } from "date-fns";

const typeColors = {
  edit: "bg-blue-500",
  approve: "bg-green-500",
  delete: "bg-red-500",
  default: "bg-gray-400",
};

const ActivityLog = ({ logs }) => {
  return (
    <>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Activity Log</h2>
      <div className="relative border-l-2 border-gray-200 pl-6">
        {logs.map((log, index) => (
          <div key={index} className="mb-8 relative">
            <span className="absolute -left-[29px] top-1 w-4 h-4 bg-blue-500 border-4 border-white rounded-full shadow"></span>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{log.time}</p>
                <p className="font-medium text-gray-800">{log.user}</p>
                <p className="text-gray-600 text-sm">{log.action}</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>{log.environment}</p>
                <p>{log.type}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ActivityLog;
