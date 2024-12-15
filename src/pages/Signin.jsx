import React, { useState, useRef, useEffect } from 'react'; // Importing necessary hooks from React
import styled from 'styled-components'; // Importing styled-components for styling
import axios from 'axios'; // Importing axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
import Inputbox from '../components/Inputbox'; // Importing Inputbox component
import Heading from '../components/Heading'; // Importing Heading component
import Button from '../components/Button'; // Importing Button component
import Loader from '../components/Loader'; // Importing Loader component

const SigninCard = () => {
  // State variables for form inputs and loading states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [voterId, setVoterId] = useState('');
  const [OTP, setOTP] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sendVoteLoading, setSendVoteLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Refs for input validation
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  // Hook for navigation
  const navigate = useNavigate();

  // Function to validate the email and password
  function validateEmailandPassword() {
    const emailValid = emailInputRef.current && emailInputRef.current.checkValidity();
    const passwordValid = passwordInputRef.current && passwordInputRef.current.checkValidity();
    return emailValid && passwordValid;
  }

  // Check if email and password are not empty
  function isEmpty() {
    return email !== '' && password !== '';
  }

  // Function to handle form submission for admin sign-in
  const handleAdminSignin = async () => {
    setIsLoading(true);
    if (!email || !password) {
      setIsLoading(false);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setIsLoading(false);
      return;
    }
    if (isEmpty()) {
      if (validateEmailandPassword()) {
        try {
          const response = await axios.post('https://dvsb.onrender.com/signin/admin', { email, password });
          if (response.status === 200 ) {
            navigate('/adminDashboard', { replace: true });
          }
        } catch (error) {
          console.error('Error during admin sign-in:', error);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  // Handle Enter key press for form submission
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdminSignin();
    }
  };

  // Function to validate the voter ID
  function validateVoterId() {
    const voterIdPattern = /^[A-Z]{3}[0-9]{7}$/;
    return voterIdPattern.test(voterId);
  }

  // Check if voter ID and OTP are not empty
  function isVoterIdAndOtpNotEmpty() {
    return voterId !== '' && OTP !== '';
  }
  
  // Function to handle sending OTP
  const handleSendOTP = async () => {
    setSendVoteLoading(true);
    if (!voterId || !validateVoterId()) {
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await axios.post('https://dvsb.onrender.com/signin/otp', { voterId });
      if (response.status === 200) {
        alert('OTP sent successfully.');
      } else {
        alert('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('An error occurred while sending OTP. Please try again.');
    } finally {
      setSendVoteLoading(false);
    }
  };

  // Function to handle voter sign-in
  const handleVoterSignin = async () => {
    console.log('clicked');
    
    setIsLoading(true);
    if (!isVoterIdAndOtpNotEmpty() || !validateVoterId() || OTP.trim().length !== 6) {
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post('https://dvsb.onrender.com/signin/voter', { voterId, OTP });
      if (response.status === 200) {
        localStorage.setItem('voterId', voterId); 
        navigate('/voterDashboard', { replace: true });
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error during voter sign-in:', error);
      alert('An error occurred during sign-in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Listen for Enter key press
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [email, password]);

  return (
    <StyledWrapper className="flex flex-col bg-slate-400 h-screen items-center justify-center">
      <div className="flip-card">
        <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
          <div className="flip-card-front">
            <div className="bg-white w-72 h-fit p-4 rounded-lg items-center shadow-2xl sm:w-96 md:w-[432px]">
              <Heading payload="Voter Sign In" />
              <p className="text-center text-lg font-medium opacity-50 tra mt-2">
                Enter your credentials to access your account
              </p>
              <div className="flex items-center">
                <div className='w-3/4'>
                  <Inputbox
                    ref={emailInputRef}
                    onchange={(e) => setVoterId(e.target.value)}
                    type="text"
                    title="Voter ID"
                    hint="Ex. ABC1234567"
                    inputId="voterid"
                  />
                </div>
                <div className='w-1/4 mx-4'>
                  {
                    sendVoteLoading ? <Loader /> : <Button payload="Send OTP" onclick={handleSendOTP} />
                  }
                </div>
              </div>
              <Inputbox
                ref={passwordInputRef}
                onchange={(e) => setOTP(e.target.value)}
                type="password"
                title="OTP"
                hint="Enter your OTP"
                inputId="otp"
              />
              {isLoading ? (
                <div className="flex justify-center mt-2">
                  <Loader />
                </div>
              ) : (
                <Button payload="Get in!" onclick={handleVoterSignin} />
              )}
              <p className="text-center mt-2">
                Are you an admin? <span className="underline underline-offset-2 cursor-pointer" onClick={() => setIsFlipped(true)}>Admin Sign Up</span>
              </p>
            </div>
          </div>
          <div className="flip-card-back">
            <div className="bg-white w-72 h-fit p-4 rounded-lg items-center shadow-2xl sm:w-96 md:w-[432px]">
              <Heading payload="Admin Sign In" />
              <p className="text-center text-lg font-medium opacity-50 tra mt-2">
                Enter your credentials to access your account
              </p>
              <Inputbox
                ref={emailInputRef}
                onchange={(e) => setEmail(e.target.value)}
                type="email"
                title="Email"
                hint="example@gmail.com"
                inputId="email"
              />
              <Inputbox
                ref={passwordInputRef}
                onchange={(e) => setPassword(e.target.value)}
                type="password"
                title="Password"
                hint="Enter your Password"
                inputId="password"
              />
              {isLoading ? (
                <div className="flex justify-center mt-2">
                  <Loader />
                </div>
              ) : (
                <Button payload="Sign In" onclick={handleAdminSignin} />
              )}
              <p className="text-center mt-2">
                Are you a voter? <span className="underline underline-offset-2 cursor-pointer" onClick={() => setIsFlipped(false)}>Voter Sign Up</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

// Styled component for the wrapper
const StyledWrapper = styled.div`
  .flip-card {
    background-color: transparent;
    width: 320px;
    height: 450px;
    perspective: 1000px;
    font-family: sans-serif;
  }

  .title {
    font-size: 1.5em;
    font-weight: 900;
    text-align: center;
    margin: 0;
    color: rgb(148, 163, 184); /* Text color applied */
  }

  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card-inner.flipped {
    transform: rotateY(180deg);
  }

  .flip-card-front,
  .flip-card-back {
    box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border: 1px solid #333;
    border-radius: 1rem;
    color: rgb(148, 163, 184); /* Default text color for flip-card sides */
  }

  .flip-card-front {
    background: linear-gradient(
      120deg,
      #2c3e50 60%,
      #2c3e50 88%,
      #2c3e50 40%,
      rgba(44, 62, 80, 0.8) 48%
    );
    color: rgb(148, 163, 184); /* Front card text color */
  }

  .flip-card-back {
    background: linear-gradient(
      120deg,
      #2c3e50 30%,
      #2c3e50 88%,
      #2c3e50 40%,
      #2c3e50 78%
    );
    color: rgb(148, 163, 184); /* Back card text color */
    transform: rotateY(180deg);
  }

  p {
    color: rgb(148, 163, 184); /* Paragraph text color */
  }

  a {
    color: rgb(148, 163, 184); /* Link text color */
    text-decoration: underline;
    underline-offset: 2px;
  }
`;

export default SigninCard; // Exporting the SigninCard component
