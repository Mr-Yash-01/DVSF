import React, { useEffect, useState } from 'react'; // Importing necessary hooks from React
import { useLocation } from 'react-router-dom'; // Importing useLocation hook from react-router-dom
import axios from 'axios'; // Importing axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook from react-router-dom
import Loader from '../components/Loader'; // Importing Loader component

const ElectionPage = () => {
    const location = useLocation(); // Getting the current location
    const { election } = location.state || {}; // Destructuring election from location state
    const [ableToVote, setAbleToVote] = useState(null); // State to check if the user is able to vote
    const [voted, setVoted] = useState([]); // State to store the list of users who have voted
    const [isVoting, setIsVoting] = useState(false); // State to check if the user is currently voting
    const navigator = useNavigate(); // Hook to navigate programmatically

    // If no election data is found, return a message
    if (!election) {
        return <div>No election data found</div>;
    }

    // Function to convert Unix time to a readable format
    const convertUnixTime = (unixTime) => {
        const date = new Date(unixTime);
        return date.toLocaleString();
    };

    // useEffect to check if the user is able to vote
    useEffect(() => {
        if (voted.length > 0) {
            setAbleToVote(!voted.includes(localStorage.getItem('userId'))); // Check if the user has already voted
            console.log(ableToVote);
        } else {
            setAbleToVote(true); // If no one has voted, user is able to vote
        }
    }, [voted]);

    // useEffect to fetch election data from the server
    useEffect(() => {
        const fetchElectionData = async () => {
            try {
                const response = await axios.get(`https://dvsb.onrender.com/dashboard/user/getElectionDetails`, {
                    params: { electionName: election.electionName, }
                });

                setVoted(response.data.electionDetails[4]); // Set the list of users who have voted
                console.log('flag 1');
            } catch (error) {
                console.error(error);
            }
        };

        fetchElectionData(); // Call the function to fetch election data
    }, []);

    // Function to handle voting
    const handleVote = async (candidateFullName) => {
        setIsVoting(true); // Set isVoting to true
        console.log(localStorage.getItem('voterId'));
        console.log("clicked");

        // Make a POST request to vote
        await axios.post('https://dvsb.onrender.com/dashboard/user/vote', {
            electionName: election.electionName,
            candidateName: candidateFullName,
            userId: localStorage.getItem('voterId')
        }).then((response) => {
            setIsVoting(false); // Set isVoting to false
            setAbleToVote(false); // Set ableToVote to false
            alert('Voted Successfully'); // Show success message
            navigator('/voterDashboard', { replace: true }); // Navigate to voter dashboard
        }).catch((error) => {
            console.log(error);
            setIsVoting(false); // Set isVoting to false
        });
    };

    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-col gap-2 text-center p-2'>
                <div>
                    <span className='font-bold opacity-60'>elections :  </span>
                    <span className='text-5xl font-semibold'>{election.electionName}</span>
                </div>
                <div>
                    <span className='font-bold opacity-60'>Starting time :  </span>
                    <span className='text-2xl font-semibold'>{convertUnixTime(election.startTime)}</span>
                </div>
                <div>
                    <span className='font-bold opacity-60'>Ending time : </span>
                    <span className='text-2xl font-semibold'>{convertUnixTime(election.endTime)}</span>
                </div>
            </div>
            <div className='bg-slate-200 w-full h-screen'>
                {
                    (ableToVote === null) ? <div className='w-screen h-screen flex items-center justify-center '><Loader /></div> :
                        <div className='flex flex-col p-3 gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 '>
                            {election.candidates.map(candidate => {
                                const candidateFullName = `${candidate.firstName} ${candidate.middleName} ${candidate.lastName}`;
                                return (
                                    <div key={candidateFullName} className='flex flex-col bg-white w-full overflow-hidden rounded-lg border border-slate-400'>
                                        <h1 className='text-2xl px-4 pt-2 font-semibold'>{candidate.firstName} {candidate.middleName} {candidate.lastName}</h1>
                                        <h2 className='text-lg px-4'>{candidate.partyName}</h2>
                                        <div className='flex justify-end px-4 pb-2 items-end'>
                                            {!ableToVote ? <h1>Already Voted</h1> :
                                                !isVoting ? (
                                                    <button onClick={() => handleVote(candidateFullName)}>
                                                        <img src='/icons8-voting-64.png' alt='vote logo' className='h-10 w-10'></img>
                                                    </button>
                                                ) : (
                                                    <Loader />
                                                )}
                                        </div>
                                        <div className='bg-slate-800 h-12'></div>
                                    </div>
                                );
                            })}
                        </div>
                }
            </div>
        </div>
    );
};

export default ElectionPage; // Exporting the ElectionPage component
