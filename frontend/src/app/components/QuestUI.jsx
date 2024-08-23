'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Leaderboard from './Leaderboard';
import LoadingSpinner from './LoadingSpinner';
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa'; // Import logout icon
import styles from './QuestUI.module.css'; // Import the CSS module
import Chat from './Chatbot'; // Import the Chat component

const QuestUI = () => {
  const [loading, setLoading] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(true); // State to toggle sidebar
  const router = useRouter();

  const handleLinkClick = (event, path) => {
    event.preventDefault(); // Prevent default link behavior
    setLoading(true); // Show loading spinner

    // Simulate a delay before routing
    setTimeout(() => {
      router.push(path); // Redirect to the question page
    }, 500); // Adjust delay as needed
  };

  // Define points for each question
  const questPoints = {
    '1': 200,
    '2': 300,
  };

  // Calculate number of quests
  const numberOfQuests = Object.keys(questPoints).length;

  const handleLogout = () => {
    // Implement your logout logic here, e.g., clearing authentication tokens
    // For example, if you're using local storage:
    localStorage.removeItem('authToken'); // Example
    localStorage.removeItem("username");
    router.push('/'); // Redirect to login page after logout
  };

  return (
    <div className={styles.container}>
      {/* Embed Google Maps as a background */}
      <div className={styles.mapContainer}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!4v1724212290027!6m8!1m7!1s-cNi2XrxhmsDxBQGJf1RVg!2m2!1d40.81990719275363!2d-73.94971700126423!3f121.21949117718205!4f6.513249207011086!5f0.7820865974627469"
          frameBorder="0"
          style={{ border: 0, width: '100%', height: '100%' }}
          allowFullScreen
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </div>

      {/* Loading Spinner */}
      {loading && <LoadingSpinner />}

      {/* Quest List with Routing */}
      <div className={styles.questList}>
        <div className={styles.questCard}>
          <h2 className={styles.questTitle}>Available Quests:</h2>
          <div>
            {Object.keys(questPoints).map((id) => (
              <a
                key={id}
                href={`/questID`}
                className={styles.questItem}
                onClick={(e) => handleLinkClick(e, `/questID`)}
              >
                <span>Quest {id}: Mental Health Question {id}</span>
                <span className={styles.questPoints}>
                  {questPoints[id]} Points
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard Sidebar */}
      <div className={`${styles.leaderboardSidebar} ${!isLeaderboardOpen ? styles.leaderboardSidebarClosed : ''}`}>
        <button
          onClick={() => setIsLeaderboardOpen(false)}
          className={styles.openLeaderboardButton}
        >
          <FaTimes />
        </button>

        <Leaderboard />

        <button
          onClick={handleLogout}
          className={styles.logoutButton}
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Open Leaderboard Button */}
      {!isLeaderboardOpen && (
        <button
          onClick={() => setIsLeaderboardOpen(true)}
          className={styles.openLeaderboardButton}
        >
          <FaBars />
        </button>
      )}

      <Chat />
    </div>
  );
};

export default QuestUI;
