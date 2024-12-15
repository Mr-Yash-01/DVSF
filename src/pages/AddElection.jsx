import React, { useEffect, useState } from 'react' // Importing necessary hooks from React
import Heading from '../components/Heading' // Importing Heading component
import Inputbox from '../components/Inputbox' // Importing Inputbox component
import CandidateCard from '../components/CandidateCard'; // Importing CandidateCard component
import axios from 'axios'; // Importing axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation
import Loader from '../components/Loader'; // Importing Loader component

const AddElection = () => {
  // Defining state variables
  const [electionName, setElectionName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [partyName, setPartyName] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const Navigate = useNavigate();

  // Function to handle adding a candidate
  const handleAddCandidate = () => {
    // Check if any candidate field is empty
    if (firstName === '' || middleName === '' || lastName === '' || partyName === '') {
      alert('Please fill all the fields'); // Display an error message
      return;
    }

    // Create a candidate object and add it to the candidates array
    const candidate = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      partyName: partyName
    }
    setCandidates([...candidates, candidate]);
  }

  // Function to handle uploading election data
  const handleUpload = async () => {
    setIsUploading(true); // Set uploading state to true

    // Check if any election data field is empty
    if (
      electionName === '' ||
      startTime === '' ||
      endTime === '' ||
      candidates.length === 0
    ) {
      alert('Please fill all the fields'); // Display an error message
      setIsUploading(false); // Set uploading state to false
      return;
    }

    // Check if start time is smaller than end time
    if (new Date(startTime) >= new Date(endTime)) {
      alert('Start time should be smaller than end time'); // Display an error message
      setIsUploading(false); // Set uploading state to false
      return;
    }

    // Check if start and end time are bigger than current time
    const currentTime = new Date();
    if (new Date(startTime) <= currentTime || new Date(endTime) <= currentTime) {
      alert('Start and end time should be bigger than current time'); // Display an error message
      setIsUploading(false); // Set uploading state to false
      return;
    }

    // Create an object with all the election data
    const electionData = {
      electionName: electionName,
      startTime: startTime,
      endTime: endTime,
      candidates: candidates
    };

    // Send a POST request to the server to add the election
    const response = await axios.post('https://dvsb.onrender.com/dashboard/admin/addElection', electionData);
    
    setIsUploading(false); // Set uploading state to false

    // Check the response status
    if (response.status === 200) {
      alert('Election added successfully'); // Display a success message
      Navigate('/adminDashboard',{replace:true}); // Navigate to the admin dashboard
    } else {
      console.log('Error in adding election'); // Log an error message
    }
  }

  return (
    <div className='flex flex-col '>
      <div className='py-3'>
        <Heading payload='Add Election' /> {/* Heading component */}
      </div>
      <div className='flex flex-col gap-8 justify-evenly h-screen  w-screen bg-slate-200 p-8  '>
        {/* inputs */}
        <div className='flex flex-col gap-8 md:flex-row'>
          {/* Election Details */}
          <div className='flex flex-col gap-2 bg-white rounded-lg p-4 shadow-2xl md:flex-grow'>
            <p className="flex flex-col text-center text-lg font-medium mt-2">
              <span className='opacity-50'>
                Enter the details about
              </span>
              <span className='text-3xl'>
                The Election 
              </span>
            </p>
            <Inputbox title='Election Name' hint='World - 2024' onchange={e => setElectionName(e.target.value)} /> {/* Inputbox for election name */}
            <Inputbox title='Start Time' type='datetime-local' onchange={e => setStartTime(e.target.value)} /> {/* Inputbox for start time */}
            <Inputbox title='End Time' type='datetime-local' onchange={e => setEndTime(e.target.value)} /> {/* Inputbox for end time */}
          </div>

          {/* Candidates Details */}
          <div className='flex flex-col gap-2 bg-white rounded-lg p-4 shadow-2xl md:flex-grow'>
            <p className="flex flex-col text-center text-lg font-medium mt-2">
              <span className='opacity-50'>
                Enter the details about
              </span>
              <span className='text-3xl'>
                Candidates
              </span>
            </p>
            <div>
              <Inputbox title='First Name' hint='Joe' onchange={e => { setFirstName(e.target.value) }} /> {/* Inputbox for first name */}
              <Inputbox title='Middle Name' hint='Albert' onchange={e => setMiddleName(e.target.value)} /> {/* Inputbox for middle name */}
              <Inputbox title='Last Name' hint='Stark' onchange={e => setLastName(e.target.value)} /> {/* Inputbox for last name */}
              <Inputbox title='Party Name' hint='Universe' onchange={e => setPartyName(e.target.value)} /> {/* Inputbox for party name */}
            </div>
            <div className='flex justify-between px-6'>
              {isUploading ? <Loader /> : // Show loader if uploading
              <button onClick={handleUpload}>
              <img src='/icons8-upload-52.png' className='h-10 w-10' alt='upload logo'></img> {/* Upload button */}
            </button>
              }
              <button onClick={handleAddCandidate}>
                <img src='/icons8-add-64.png' alt='add logo'></img> {/* Add candidate button */}
              </button>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg p-4 shadow-2xl h-fit'>
          <p className="flex flex-col text-center text-lg font-medium mt-2">
            <span className='opacity-50'>
              List of
            </span>
            <span className='text-3xl'>
              Candidates
            </span>
          </p>
          <div className='mt-4 flex flex-wrap gap-6 md:grid md:grid-cols-2 lg:grid-cols-3'>
            {/* List of candidates will be displayed here */}
            {candidates.map((candidate, index) => (
              <CandidateCard
                key={index}
                firstName={candidate.firstName}
                middleName={candidate.middleName}
                lastName={candidate.lastName}
                partyName={candidate.partyName}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddElection // Exporting AddElection component
