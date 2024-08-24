'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Leaderboard from './Leaderboard';
import LoadingSpinner from './LoadingSpinner';
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa'; 
import styles from './QuestUI.module.css'; 
import Chat from './Chatbot'; 

const QuestUI = () => {
  const [loading, setLoading] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(true);
  const router = useRouter();
  const questPoints = {
    '1': 200,
    '2': 300,
  };

  const numberOfQuests = Object.keys(questPoints).length;

  // actual functions:
  const handleLinkClick = (event, path, questID) => {
    event.preventDefault();
    setLoading(true);

    setTimeout(() => {
      router.push(path);
      localStorage.setItem("questID", questID);
    }, 500);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <iframe //note this is coded for just marshak. we will have to implement this for the other pages
          src="https://www.google.com/maps/embed?pb=!4v1724212290027!6m8!1m7!1s-cNi2XrxhmsDxBQGJf1RVg!2m2!1d40.81990719275363!2d-73.94971700126423!3f121.21949117718205!4f6.513249207011086!5f0.7820865974627469"
          style={{ border: 0, width: '100%', height: '100%' }}
          allowFullScreen
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </div>

      {loading && <LoadingSpinner />}

      {/* Quest List with Routing */}
      <div className={styles.questList}>
        <div className={styles.questCard}>
          <h2 className={styles.questTitle}>Available Quests:</h2>
          <div>
            {Object.keys(questPoints).map((id) => (
              <a
                key={id}
                href={`/questionID`}
                className={styles.questItem}
                onClick={(e) => handleLinkClick(e, `/questionID`, id)}
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

default export QuestUI;
