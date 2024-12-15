import React from 'react'; // Import the React library

// Define a functional component named CandidateCard that takes in props: firstName, middleName, lastName, and partyName
const CandidateCard = ({ firstName, middleName, lastName, partyName }) => {
    return (
        // Main container div with flexbox, rounded corners, border, and overflow hidden
        <div className='flex flex-col rounded-lg border border-slate-400 overflow-hidden '>
            {/* Inner container div with padding and flex-grow */}
            <div className='flex flex-col px-2 flex-grow'>
                {/* Paragraph for displaying the candidate's full name */}
                <p className='text-2xl'>
                    {/* Span for the label "Name :" with styling */}
                    <span className='text-lg opacity-50 font-medium'> Name :
                    </span> 
                    {/* Display the candidate's first, middle, and last name */}
                    {firstName} {middleName} {lastName}
                </p>
                {/* Paragraph for displaying the candidate's party name */}
                <p className='text-2xl'>
                    {/* Span for the label "Party :" with styling */}
                    <span className='text-lg opacity-50 font-medium'> Party :
                    </span> 
                    {/* Display the candidate's party name */}
                    {partyName}
                </p>
            </div>
            {/* Div for a bottom bar with background color and fixed height */}
            <div className='bg-slate-800 h-6 mt-4 flex-grow-0'></div>
        </div>
    );
};

// Export the CandidateCard component as the default export
export default CandidateCard;
