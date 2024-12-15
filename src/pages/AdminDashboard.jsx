import React, { useState, useEffect } from 'react'; // Import React and hooks
import Heading from '../components/Heading'; // Import Heading component
import Button from '../components/Button'; // Import Button component
import FocusedButton from '../components/FocusedButton'; // Import FocusedButton component
import Loader from '../components/Loader'; // Import Loader component
import Schedualed from './Schedualed'; // Import Schedualed component
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom
import axios from 'axios'; // Import axios for making HTTP requests
import EndedElections from './EndedElections'; // Import EndedElections component
import Running from './Running'; // Import Running component

const AdminDashboard = () => {
  const [focus, setFocus] = useState(1); // State to manage the focused tab
  const navigate = useNavigate(); // Hook to navigate between routes
  const [finishedElections, setFinishedElections] = useState([]); // State to store finished elections
  const [runningElections, setRunningElections] = useState([]); // State to store running elections
  const [scheduledElections, setScheduledElections] = useState([]); // State to store scheduled elections
  const [isFetching, setIsFetching] = useState(true); // State to manage loading state

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get('https://dvsb.onrender.com/dashboard/admin/getElections'); // Fetch elections data from API
        const elections = response.data.elections; // Extract elections data from response

        // Validate the data structure
        if (!Array.isArray(elections)) {
          console.error('Expected an array of elections but received:', elections); // Log error if data is not an array
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
        setFinishedElections(formattedElections.filter(election => currentTime > election.endTime)); // Set finished elections
        setRunningElections(formattedElections.filter(election => currentTime >= election.startTime && currentTime <= election.endTime)); // Set running elections
        setScheduledElections(formattedElections.filter(election => currentTime < election.startTime)); // Set scheduled elections

        setIsFetching(false); // Set fetching state to false

      } catch (error) {
        console.log(error); // Log error if request fails
      }
    }, 1000); // Fetch data every second

    return () => {
      clearInterval(interval); // Clear interval on component unmount
    };
  }, []); // Empty dependency array to run effect only once

  return (
    <div className='flex flex-col py-6 px-5'>
      <div className='flex flex-row gap-4 px-4 justify-center'>
        <div className='flex flex-grow justify-center'><Heading payload='Admin Dashboard' /></div> {/* Render Heading component */}
        <div className='flex gap-4'>
          <button onClick={() => navigate('/addElection')}> {/* Navigate to addElection page */}
            <img src='/icons8-schedule-100.png' className='w-8 h-8' alt='Schedule Logo' /> {/* Schedule button */}
          </button>
          <button onClick={() => {localStorage.removeItem('userId'); navigate('/',{replace:true})}}> {/* Logout button */}
            <img src='/icons8-logout-96.png' className='w-8 h-8' alt='logout Logo' /> {/* Logout button */}
          </button>
        </div>
      </div>
      <hr />
      <div className='flex flex-row justify-around gap-2'>
        {(focus === 0) ? <FocusedButton payload="Results" onclick={() => setFocus(0)} /> : // Render FocusedButton if focus is 0
          <Button payload="Results" onclick={() => setFocus(0)} />} // Render Button if focus is not 0

        {(focus === 1) ? <FocusedButton payload="Running" onclick={() => setFocus(1)} /> : // Render FocusedButton if focus is 1
          <Button payload="Running" onclick={() => setFocus(1)} />} // Render Button if focus is not 1

        {(focus === 2) ? <FocusedButton payload="Scheduled" onclick={() => setFocus(2)} /> : // Render FocusedButton if focus is 2
          <Button payload="Scheduled" onclick={() => setFocus(2)} />} // Render Button if focus is not 2

      </div>
      {(isFetching) ? <div className='w-screen h-screen flex items-center justify-center '><Loader /></div> : // Render Loader if data is fetching
        <div className='py-4'>
          {focus === 0 && <EndedElections data={finishedElections} />} // Render EndedElections if focus is 0
          {focus === 1 && <Running data={runningElections} />} // Render Running if focus is 1
          {focus === 2 && <Schedualed data={scheduledElections} />} // Render Schedualed if focus is 2
        </div>}
    </div>
  );
};

export default AdminDashboard; // Export AdminDashboard component
