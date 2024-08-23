'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Leaderboard from './Leaderboard';
import LoadingSpinner from './LoadingSpinner';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './QuestUI.module.css';

const QuestUI = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(true);
  const router = useRouter();

  const handleLinkClick = (event, path) => {
    event.preventDefault();
    setLoading(true);

    setTimeout(() => {
      router.push(path);
    }, 500);
  };

  const questPoints = {
    '1': 200,
    '2': 300,
  };

  return (
    <div className={styles.questContainer}>
      {loading && <LoadingSpinner />}
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
      <div className={styles.leaderboardSidebar}>
        <button
          onClick={() => setIsLeaderboardOpen(false)}
          className={styles.openLeaderboardButton}
        >
          <FaTimes />
        </button>
        <Leaderboard />
      </div>
      <button
        onClick={onClose}
        className={styles.closeQuestUIButton}
      >
        Close
      </button>
    </div>
  );
};

export default QuestUI;
