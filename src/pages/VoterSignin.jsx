import React, { useState, useRef } from 'react';
import Inputbox from '../components/Inputbox';
import Heading from '../components/Heading';
import Button from '../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';

const VoterSignin = () => {
  const [isAdmin, setIsAdmin] = useState(true); // Toggle between Admin and Voter
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [voterId, setVoterId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const voterIdInputRef = useRef(null);

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmission = async () => {
    setIsLoading(true);
    try {
      if (isAdmin) {
        // Admin Login Logic
        const response = await axios.post('http://localhost:3000/adminSignin', {
          email,
          password,
        });
        localStorage.setItem('adminId', email);
        setIsLoading(false);
        navigate('/adminDashboard', { replace: true });
      } else {
        // Voter Login Logic
        const response = await axios.post('http://localhost:3000/voterSignin', {
          voterId,
        });
        localStorage.setItem('voterId', voterId);
        setIsLoading(false);
        navigate('/voterDashboard', { replace: true });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-slate-400 h-screen items-center justify-center">
      <motion.div
        className="bg-white w-72 h-fit p-4 rounded-lg items-center shadow-2xl sm:w-96 md:w-[432px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Heading payload={isAdmin ? 'Admin Sign In' : 'Voter Sign In'} />
        <p className="text-center text-lg font-medium opacity-50 mt-2">
          {isAdmin
            ? 'Enter admin credentials to access your account'
            : 'Enter your Voter ID to cast your vote'}
        </p>

        {isAdmin ? (
          // Admin Sign In Form
          <>
            <Inputbox
              ref={emailInputRef}
              onchange={(e) => setEmail(e.target.value)}
              type="email"
              title="Email"
              hint="admin@example.com"
              inputId="adminEmail"
            />
            <Inputbox
              ref={passwordInputRef}
              onchange={(e) => setPassword(e.target.value)}
              type="password"
              title="Password"
              hint="******"
              inputId="adminPassword"
            />
          </>
        ) : (
          // Voter Sign In Form
          <Inputbox
            ref={voterIdInputRef}
            onchange={(e) => setVoterId(e.target.value)}
            type="text"
            title="Voter ID"
            hint="ABC1234567"
            inputId="voterId"
          />
        )}

        {isLoading ? (
          <div className="flex justify-center mt-2">
            <Loader />
          </div>
        ) : (
          <Button payload="Sign In" onclick={handleSubmission} />
        )}

        <div className="flex justify-center mt-4">
          <button
            className={`mr-2 px-4 py-2 rounded ${
              isAdmin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}
            onClick={() => setIsAdmin(true)}
          >
            Admin
          </button>
          <button
            className={`px-4 py-2 rounded ${
              !isAdmin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}
            onClick={() => setIsAdmin(false)}
          >
            Voter
          </button>
        </div>

        <p className="text-center mt-2">
          Don't have an account?{' '}
          <a href="/signup" className="underline underline-offset-2">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default VoterSignin;
