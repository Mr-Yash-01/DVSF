import React from "react";
import { useNavigate } from "react-router-dom";

// Component to display ended elections
const EndedElections = ({ data }) => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Function to convert Unix time to a readable format
  const convertUnixTime = (unixTime) => {
    // Assuming unixTime is already in milliseconds
    const date = new Date(unixTime);
    return date.toLocaleString();
  };

  // Function to handle click event on an election item
  const handleClick = (election) => {
    navigate(`/resultPage`, { state: { election } }); // Navigate to result page with election data
  };

  // If there are no ended elections, display a message
  if (!data.length) {
    return (
      <div className="flex justify-center h-full font-medium opacity-70 text-xl">
        No ended Elections yet
      </div>
    );
  }

  // Render the list of ended elections
  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
      {data.map((item, index) => (
        <div
          className="flex px-2 min-w-[300px] gap-6"
          key={item.electionName || index} // Use election name or index as key
          onClick={() => handleClick(item)} // Handle click event
          style={{ cursor: 'pointer' }}  // Optional: add cursor pointer to indicate clickable items
        >
          <div className="flex flex-col flex-grow rounded-lg overflow-hidden border border-slate-400">
            <div className="flex flex-col flex-grow p-3">
              <h1 className="text-3xl font-semibold">{item.electionName}</h1> {/* Election name */}
              <h1 className="font-bold opacity-50">Starting time:</h1>
              <h1 className="text-xl font-medium">{convertUnixTime(item.startTime)}</h1> {/* Start time */}
              <h1 className="font-bold opacity-50">Ending time:</h1>
              <h1 className="text-xl font-medium">{convertUnixTime(item.endTime)}</h1> {/* End time */}
              <h1 className="font-bold opacity-50">Total Candidates:</h1>
              <h1 className="text-xl font-medium">{item.candidates.length}</h1> {/* Total candidates */}
            </div>
            <div className="h-12 bg-slate-800 flex-grow-0"></div> {/* Placeholder for additional content */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EndedElections; // Export the component
