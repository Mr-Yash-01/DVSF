import React from "react"; // Import the React library

// Define a functional component named Heading that takes a prop called payload
export default function Heading({payload}) {
    // Return an h1 element with some tailwind CSS classes and the payload as its content
    return <h1 className="text-3xl font-semibold text-center text-slate-800">
        {payload} {/* Display the payload prop inside the h1 element */}
    </h1>
}