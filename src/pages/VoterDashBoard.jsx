import React, { useState, useEffect } from 'react'; // Import React and hooks
import Heading from '../components/Heading'; // Import Heading component
import Button from '../components/Button'; // Import Button component
import Results from './EndedElections'; // Import Results component
import Running from './Running'; // Import Running component
import Schedualed from './Schedualed'; // Import Schedualed component
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom
import axios from 'axios'; // Import axios for making HTTP requests
import VoterRunning from './VoterRunning'; // Import VoterRunning component
import EndedElections from './EndedElections'; // Import EndedElections component
import FocusedButton from '../components/FocusedButton'; // Import FocusedButton component
import Loader from '../components/Loader'; // Import Loader component

const VoterDashboard = () => {
  const [focus, setFocus] = useState(1); // State to manage the focused tab
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [finishedElections, setFinishedElections] = useState([]); // State to store finished elections
  const [runningElections, setRunningElections] = useState([]); // State to store running elections
  const [scheduledElections, setScheduledElections] = useState([]); // State to store scheduled elections
  const [isFetching, setIsFetching] = useState(true); // State to manage loading state

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get('https://dvsb.onrender.com/dashboard/admin/getElections'); // Fetch elections data
        const elections = response.data.elections; // Extract elections from response
        console.log(elections);
        
        // Validate the data structure
        if (!Array.isArray(elections)) {
          console.error('Expected an array of elections but received:', elections);
          return;
        }

        const currentTime = new Date().getTime(); // Get current time in milliseconds

        // Convert times to milliseconds if they are in seconds
        const formattedElections = elections.map(election => ({
          ...election,
          startTime: parseInt(election.startTime, 10) * 1000, // Convert to milliseconds
          endTime: parseInt(election.endTime, 10) * 1000    // Convert to milliseconds
        }));

        // Filter elections based on their status
        setFinishedElections(formattedElections.filter(election => currentTime > election.endTime));
        setRunningElections(formattedElections.filter(election => currentTime >= election.startTime && currentTime <= election.endTime));
        setScheduledElections(formattedElections.filter(election => currentTime < election.startTime));
        setIsFetching(false); // Set fetching state to false

      } catch (error) {
        console.log(error); // Log any errors
      }
    }, 1000); // Fetch data every second

    return () => {
      clearInterval(interval); // Clear interval on component unmount
    };
  }, []); // Empty dependency array to run effect only once

  return (
    <div className='flex flex-col py-6 px-5'>
      <div className='flex flex-row gap-4 px-4 justify-center'>
        <div className='flex flex-grow justify-center'><Heading payload='Voter Dashboard' /></div> {/* Render heading */}
        <button onClick={() =>
            {localStorage.removeItem('voterId'); // Remove voterId from localStorage
            navigate('/',{replace:true})}}> {/* Navigate to home on logout */}
            <img src='/icons8-logout-96.png' className='w-8 h-8' alt='logout Logo' /> {/* Logout button */}
          </button>
      </div>
      <hr />
      <div className='flex flex-row justify-around gap-2'>
        {/* Render buttons for different tabs */}
        {(focus === 0) ? <FocusedButton payload="Results" onclick={() => setFocus(0)} /> :
          <Button payload="Results" onclick={() => setFocus(0)} />}

        {(focus === 1) ? <FocusedButton payload="Running" onclick={() => setFocus(1)} /> :
          <Button payload="Running" onclick={() => setFocus(1)} />}

        {(focus === 2) ? <FocusedButton payload="Scheduled" onclick={() => setFocus(2)} /> :
          <Button payload="Scheduled" onclick={() => setFocus(2)} />}

      </div>
      {(isFetching) ? <div className='w-screen h-screen flex items-center justify-center '><Loader /></div> : 
      <div className='py-4'>
      {/* Render components based on the focused tab */}
      {focus === 0 && <EndedElections data={finishedElections} />}
      {focus === 1 && <VoterRunning data={runningElections} />}
      {focus === 2 && <Schedualed data={scheduledElections} />}
    </div>}
    </div>
  );
};

export default VoterDashboard; // Export VoterDashboard component
