'use client'
import React, { useEffect, useRef } from 'react';

const AerialViewVideo = () => {
  const videoRef = useRef(null);

  const PARAMETER_VALUE = '160 Convent Ave, New York, NY 10031'; // this is an example on my school
  const API_KEY = process.env.NEXT_PUBLIC__MAP_API_KEY; // load .env

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
        // Fetch video data from the Aerial View API, note this is only on ccny nac
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
    <video ref={videoRef} autoPlay loop muted style={{ width: '100%' }}>
      Your browser does not support the video tag.
    </video>
  );
};

export default AerialViewVideo;
