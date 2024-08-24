'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Leaderboard from './Leaderboard';
import LoadingSpinner from './LoadingSpinner';
import { FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import styles from './nacQuestUI.module.css';
import Chat from './Chatbot';

const NacQuestUI = () => {
  const [loading, setLoading] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(true);
  const router = useRouter();
  const handleLinkClick = (event, path, questId) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push(path);
      localStorage.setItem("questID", questId);
    }, 500);
  };
  const questPoints = {
    '1': 200,
    '2': 300,
  };
  const numberOfQuests = Object.keys(questPoints).length;
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem("username");
    router.push('/'); // redirect to login page after logout
  };
  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!4v1724308952486!6m8!1m7!1sBRqCe1QqGW_UbXdI_JMcXw!2m2!1d40.82013922157348!2d-73.94954031258408!3f263.46631850190676!4f2.0228807564025857!5f0.7820865974627469"
          style={{ border: 0, width: '100%', height: '100%' }}
          allowFullScreen
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </div>
      {loading && <LoadingSpinner />}
      <div className={styles.questList}>
        <div className={styles.questCard}>
          <h2 className={styles.questTitle}>Available Quests:</h2>
          <div>
            {Object.keys(questPoints).map((id) => (
              <a
                key={id}
                href={`/questionID/1`}
                className={styles.questItem}
                onClick={(e) => handleLinkClick(e, `/questionID/1`, id)}
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

export default NacQuestUI;