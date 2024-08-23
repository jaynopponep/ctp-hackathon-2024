'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Leaderboard from './Leaderboard';
import LoadingSpinner from './LoadingSpinner';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons
import styles from './QuestUI.module.css'; // Import the CSS module

//INTERACTIBILITY
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

  return (
    <div className={styles.container}>
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
                href={`/questionID/${id}`}
                className={styles.questItem}
                onClick={(e) => handleLinkClick(e, `/questionID/${id}`)}
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
    </div>
  );
};

export default QuestUI;