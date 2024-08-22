'use client'
import React, { useState, useEffect, useRef } from 'react';
import SignIn from './signIn';
import SignUp from './signUp';  // Import the SignUp component

const AerialView = () => {
  const [isSignUp, setIsSignUp] = useState(false);  // State to toggle between SignIn and SignUp
  const videoRef = useRef(null);

  const PARAMETER_VALUE = '160 Convent Ave, New York, NY 10031'; // Example: your school's address
  const API_KEY = process.env.NEXT_PUBLIC_MAP_API_KEY; // Load .env

  useEffect(() => {
    const initAerialView = async () => {
      const displayEl = videoRef.current;
      if (!displayEl) return;
      displayEl.addEventListener('click', function () {
        if (displayEl.paused) {
          displayEl.play();
        } else {
          displayEl.pause();
        }
      });

      const parameterKey = videoIdOrAddress(PARAMETER_VALUE);
      const urlParameter = new URLSearchParams();
      urlParameter.set(parameterKey, PARAMETER_VALUE);
      urlParameter.set('key', API_KEY);

      try {
        // Fetch video data from the Aerial View API, note this is only on CCNY NAC
        const response = await fetch(`https://aerialview.googleapis.com/v1/videos:lookupVideo?${urlParameter.toString()}`);
        const videoResult = await response.json();

        if (videoResult.state === 'PROCESSING') {
          alert('Video is still processing. Please try again later.');
        } else if (videoResult.error && videoResult.error.code === 404) {
          alert('Video not found. Make sure the address is correct or the video has been generated.');
        } else {
          displayEl.src = videoResult.uris.MP4_MEDIUM.landscapeUri;
        }
      } catch (error) {
        console.error('Error fetching the aerial view video:', error);
        alert('An error occurred while fetching the aerial view video. Please check the console.');
      }
    };

    initAerialView();
  }, [PARAMETER_VALUE, API_KEY]);

  const videoIdOrAddress = (value) => {
    const videoIdRegex = /^[0-9a-zA-Z-_]{22}$/;
    return value.match(videoIdRegex) ? 'videoId' : 'address';
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
      <video ref={videoRef} autoPlay loop muted style={{ width: '100%' }}>
        Your browser does not support the video tag.
      </video>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        maxWidth: '400px'
      }}>
        {isSignUp ? (
          <SignUp />
        ) : (
          <SignIn />
        )}
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          {isSignUp ? (
            <p style={{ textShadow: '10px 15px 15px rgba(0, 0, 0, 0.9)' }}> {/* Apply shadow to the full phrase */}
              Already have an account?{' '}
              <span
                onClick={() => setIsSignUp(false)}
                style={{
                  color: 'blue',
                  cursor: 'pointer',
                }}
              >
                Sign In
              </span>
            </p>
          ) : (
            <p style={{ textShadow: '10px 15px 15px rgba(0, 0, 0, 0.9)' }}> {/* Apply shadow to the full phrase */}
              Don't have an account?{' '}
              <span
                onClick={() => setIsSignUp(true)}
                style={{
                  color: 'blue',
                  cursor: 'pointer',
                }}
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AerialView;
