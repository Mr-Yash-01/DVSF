import React, { useState, useRef, useEffect } from 'react'; // Import necessary React hooks
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import Heading from '../components/Heading'; // Import Heading component
import Inputbox from '../components/Inputbox'; // Import Inputbox component
import Button from '../components/Button'; // Import Button component
import axios from 'axios'; // Import axios for making HTTP requests

const Signup = () => {
  // State variables to store form input values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true); // State to check if passwords match
  const navigate = useNavigate(); // Hook for navigation

  // Refs to access input elements directly
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const rePasswordInputRef = useRef(null);

  // Function to validate form inputs
  const validateForm = () => {
    const emailValid = emailInputRef.current && emailInputRef.current.checkValidity(); // Check email validity
    const passwordValid = passwordInputRef.current && passwordInputRef.current.checkValidity(); // Check password validity
    const rePasswordValid = rePasswordInputRef.current && rePasswordInputRef.current.checkValidity(); // Check re-entered password validity
    const passwordsMatch = password === rePassword; // Check if passwords match

    setPasswordsMatch(passwordsMatch); // Update passwordsMatch state

    return emailValid && passwordValid && rePasswordValid && passwordsMatch; // Return overall form validity
  };

  // Function to check if all fields are filled
  const isEmpty = () => {
    return firstName !== '' && lastName !== '' && email !== '' && password !== '' && rePassword !== '';
  };

  // Function to handle form submission
  const handleSubmission = async () => {
    if (isEmpty()) { // Check if all fields are filled
      if (validateForm()) { // Validate form inputs
        await axios.post('https://dvsb.onrender.com/signup', {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        }).then((response) => {
          navigate('/signin',{replace:true}); // Navigate to sign-in page on success
        }).catch((error) => {
          console.log(error); // Log error on failure
        });
      } else {
        alert('Incorrect values'); // Alert if form inputs are invalid
      }
    } else {
      alert('Please fill all the fields'); // Alert if any field is empty
    }
  };

  // Function to handle Enter key press for form submission
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmission();
    }
  };

  // Effect to add and clean up keydown event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [firstName, lastName, email, password, rePassword]);

  // Effect to validate form whenever password or rePassword changes
  useEffect(() => {
    validateForm();
  }, [password, rePassword]);

  return (
    <div className='flex flex-col bg-slate-400 h-screen items-center justify-center'>
      <div className="bg-white w-72 h-fit p-4 rounded-lg items-center shadow-2xl sm:w-96 md:w-[432px]">
        <Heading payload="Sign Up" /> {/* Heading component */}
        <p className="text-center text-lg font-medium opacity-50 tra mt-2">Enter your information to create an account</p>
        <Inputbox
          onchange={e => setFirstName(e.target.value)} // Update firstName state on change
          title='First Name'
          hint='John'
        />
        <Inputbox
          onchange={e => setLastName(e.target.value)} // Update lastName state on change
          title='Last Name'
          hint='Doe'
        />
        <Inputbox
          ref={emailInputRef} // Reference to email input
          onchange={e => setEmail(e.target.value)} // Update email state on change
          type="email"
          title='Email'
          hint='abc@example.com'
          inputId="email"
        />
        <Inputbox
          ref={passwordInputRef} // Reference to password input
          onchange={e => setPassword(e.target.value)} // Update password state on change
          type='password'
          title='Password'
          hint='******'
          inputId="password"
        />
        <Inputbox
          ref={rePasswordInputRef} // Reference to re-enter password input
          onchange={e => setRePassword(e.target.value)} // Update rePassword state on change
          type='password'
          title='Re-enter Password'
          hint='******'
          inputId="rePassword"
        />
        {!passwordsMatch && (
          <p className='text-red-500 text-center mt-2'>Passwords do not match!</p> // Show error if passwords do not match
        )}
        <Button
          id='signup'
          onclick={handleSubmission} // Handle form submission on click
          payload='Sign Up'
        />
        <p className='text-center mt-2'>
          Already have an account? <a href="/" className="underline underline-offset-2">Sign In</a> {/* Link to sign-in page */}
        </p>
      </div>
    </div>
  );
};

export default Signup; // Export Signup component
