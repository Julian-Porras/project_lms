import React from "react";
import { format } from "date-fns";

const typeColors = {
  users: "bg-green-500",
  dev: "bg-blue-500",
  default: "bg-gray-400",
};

const ActivityLog = ({ logs }) => {
  return (
    <>
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Activity Logs</h2>
      <div className="relative border-l-2 border-gray-200 pl-6">
        {logs.map((log, index) => {
          const formattedTime = format(new Date(log.timestamp), "MMM dd, yyyy");
          const dotColor = typeColors[log.type] || typeColors.default;
          return (
            <div key={index} className="mb-8 relative">
              <span
                className={`absolute -left-[29px] top-1 w-4 h-4 ${dotColor} border-4 border-white rounded-full shadow`}
              ></span>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">{formattedTime}</p>
                  <p className="font-medium text-gray-700">{log.user}</p>
                  <p className="text-gray-600 text-sm capitalize">{log.action}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ActivityLog;
