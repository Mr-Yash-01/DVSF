import React from "react"; // Importing React library

// Functional component Running which takes data as a prop
const Running = ({ data }) => {

  // Check if data array is empty
  if (!data.length) {
    // Return a message if there are no running elections
    return (<div className="flex justify-center h-full font-medium opacity-70 text-xl">No running Elections yet</div>);
  }

  // Function to convert Unix time to a readable date string
  const convertUnixTime = (unixTime) => {
    // Assuming unixTime is already in milliseconds
    const date = new Date(unixTime); // Create a new Date object
    return date.toLocaleString(); // Return the date as a localized string
  };

  // Return the JSX to render the list of running elections
  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
      {data.map((item, index) => (
        <div
          className="flex px-2 min-w-[300px] gap-6"
          key={item.electionName || index} // Use electionName or index as key
          style={{ cursor: 'pointer' }}  // Optional: add cursor pointer to indicate clickable items
        >
          <div className="flex flex-col flex-grow rounded-lg overflow-hidden border border-slate-400">
            <div className="flex flex-col flex-grow p-3">
              <h1 className="text-3xl font-semibold">{item.electionName}</h1> {/* Election name */}
              <h1 className="font-bold opacity-50">Starting time:</h1> {/* Label for starting time */}
              <h1 className="text-xl font-medium">{convertUnixTime(item.startTime)}</h1> {/* Converted starting time */}
              <h1 className="font-bold opacity-50">Ending time:</h1> {/* Label for ending time */}
              <h1 className="text-xl font-medium">{convertUnixTime(item.endTime)}</h1> {/* Converted ending time */}
              <h1 className="font-bold opacity-50">Total Candidates:</h1> {/* Label for total candidates */}
              <h1 className="text-xl font-medium">{item.candidates.length}</h1> {/* Number of candidates */}
            </div>
            <div className="h-12 bg-slate-800"></div> {/* Placeholder for additional content */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Running; // Export the Running component as default