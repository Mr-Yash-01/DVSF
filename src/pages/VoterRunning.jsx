import React from "react"; // Importing React library
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom for navigation

const VoterRunning = ({ data }) => { // Defining a functional component VoterRunning that takes data as a prop

  const navigate = useNavigate(); // Initializing navigate function for navigation

  const convertUnixTime = (unixTime) => { // Function to convert Unix time to a readable date string
    const date = new Date(unixTime); // Creating a new Date object from Unix time
    return date.toLocaleString(); // Returning the date as a locale string
  };

  const handleClick = (election) => { // Function to handle click events on election items
    navigate(`/electionPage`, { state: { election } }); // Navigating to electionPage with election data in state
  };

  if (!data.length) { // Checking if data array is empty
    return (<div className="flex justify-center h-full font-medium opacity-70 text-xl">No running Elections yet</div>); // Returning a message if no elections are running
  }

  return ( // Returning the JSX to render the component
    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3"> {/* Container for the election items */}
      {data.map((item, index) => ( // Mapping over the data array to render each election item
        <div
          className="flex px-2 min-w-[300px] gap-6" // Styling for each election item container
          key={item.electionName || index} // Using electionName or index as the key
          onClick={() => handleClick(item)} // Adding click event handler
          style={{ cursor: 'pointer' }}  // Optional: add cursor pointer to indicate clickable items
        >
          <div className="flex flex-col flex-grow rounded-lg overflow-hidden border border-slate-400"> {/* Styling for the election item */}
            <div className="flex flex-col flex-grow p-3"> {/* Container for the election details */}
              <h1 className="text-3xl font-semibold">{item.electionName}</h1> {/* Displaying election name */}
              <h1 className="font-bold opacity-50">Starting time:</h1> {/* Label for starting time */}
              <h1 className="text-xl font-medium">{convertUnixTime(item.startTime)}</h1> {/* Displaying converted starting time */}
              <h1 className="font-bold opacity-50">Ending time:</h1> {/* Label for ending time */}
              <h1 className="text-xl font-medium">{convertUnixTime(item.endTime)}</h1> {/* Displaying converted ending time */}
              <h1 className="font-bold opacity-50">Total Candidates:</h1> {/* Label for total candidates */}
              <h1 className="text-xl font-medium">{item.candidates.length}</h1> {/* Displaying total number of candidates */}
            </div>
            <div className="h-12 bg-slate-800"></div> {/* Styling for the bottom part of the election item */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoterRunning; // Exporting the VoterRunning component as default
