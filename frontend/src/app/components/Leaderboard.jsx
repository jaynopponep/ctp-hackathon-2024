'use client';
import React from 'react';
import styles from './Leaderboard.module.css'; // Import the CSS module
import Chat from './Chatbot'; // Import the Chat component

const Leaderboard = () => {
  const players = [
    { name: 'Jay', points: 5000 },
    { name: 'Yared', points: 3000 },
    { name: 'Jawad', points: 2000 },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Leaderboard</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index} className={styles.listItem}>
              {player.name}: {player.points} pts
            </li>
          ))}
        </ul>
      </div>
      {/* Add the Chat component below the leaderboard and center it */}
      <div className={styles.chatWrapper}>
        <Chat />
      </div>
    </div>
  );
};

export default Leaderboard;
