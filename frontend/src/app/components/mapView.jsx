'use client';

import React, { useState } from 'react';
import Notif_marshak from './notif_marshak';
import Notif_sd from './notif_sophieDavis';
import Notif_shepard from './notif_shepard';
import Notif_nac from './notif_nac';
import Leaderboard from './Leaderboard';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './QuestUI.module.css';
import leaderboardStyles from './Leaderboard.module.css';
import spinnerStyles from './LoadingSpinner.module.css';

const MapComponent = () => {
  const [loading, setLoading] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  const ccny = { lat: 40.8199, lng: -73.9495 };
  const zoomLevel = 17;
  const mapSize = '1920x1080';
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${ccny.lat},${ccny.lng}&zoom=${zoomLevel}&size=${mapSize}&scale=2&maptype=satellite&key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`;

  const handleLeaderboardToggle = () => {
    setLoading(true); // Show loading spinner when toggling the leaderboard
    setIsLeaderboardOpen(!isLeaderboardOpen);
    setTimeout(() => {
      setLoading(false); // Hide the spinner after the toggle is complete
    }, 500); 
  };

  return (
    <div className={styles.container} style={{ backgroundColor: 'black' }}>
      {loading && (
        <div className={spinnerStyles.overlay}>
          <div className={spinnerStyles.spinner}></div>
        </div>
      )}
      <div
        style={{
          position: 'relative',
          width: '90vw', // Adjusted size to avoid scrollbars
          height: '90vh', // Adjusted size to avoid scrollbars
          margin: 'auto',
          border: '5px solid black', // Black border
          boxShadow: '0px 0px 20px 5px rgba(255, 255, 255, 0.8)', // White drop shadow
          backgroundColor: 'black', // Black background
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src={mapUrl}
          alt="City College of New York Map"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            overflow: 'hidden',
          }}
        />
        <Notif_marshak />
        <Notif_sd />
        <Notif_shepard />
        <Notif_nac />

        <div
          style={{
            position: 'absolute',
            bottom: '1rem', //Places the text right above the border
            width: '100%',
            textAlign: 'center',
            color: 'white',
            fontSize: '4rem',
            textShadow: '2px 2px 4px black', // Black drop shadow
            fontFamily: 'Arial, sans-serif',
          }}
        >
          Select a Building
        </div>
      </div>

      <div
        className={`${styles.leaderboardSidebar} ${
          !isLeaderboardOpen ? styles.leaderboardSidebarClosed : ''
        }`}
      >
        {isLeaderboardOpen && (
          <div className={leaderboardStyles.container}>
            <Leaderboard />
          </div>
        )}
      </div>

      <button
        onClick={handleLeaderboardToggle}
        className={styles.openLeaderboardButton}
        style={{
          position: 'fixed',
          top: '1rem',
          right: isLeaderboardOpen ? '26%' : '1rem', 
          transform: isLeaderboardOpen ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 0.3s ease, right 0.3s ease',
        }}
      >
        {isLeaderboardOpen ? <FaTimes /> : <FaBars />}
      </button>
    </div>
  );
};

export default MapComponent;
