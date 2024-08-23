'use client';
import React, { useState } from 'react';
import styles from './Leaderboard.module.css'; // Import the CSS module

const Leaderboard = () => {
  const [players, setPlayers] = useState([
    { name: 'Jay', points: 5000, solvedProblems: [1, 2] },
    { name: 'Yared', points: 3000, solvedProblems: [1] },
    { name: 'Jawad', points: 2000, solvedProblems: [1] },
    { name: 'Ava', points: 1800, solvedProblems: [] },
    { name: 'Mia', points: 1600, solvedProblems: [2] },
    { name: 'Liam', points: 1500, solvedProblems: [1] },
    { name: 'Noah', points: 1400, solvedProblems: [] },
    { name: 'Olivia', points: 1300, solvedProblems: [1, 2] },
    { name: 'Ethan', points: 1200, solvedProblems: [] },
    { name: 'Sophia', points: 1100, solvedProblems: [1] },
  ]);

  // Limit the number of players to display
  const visiblePlayers = players.slice(0, 5);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Leaderboard</h2>
        <ul className={styles.listContainer}>
          {visiblePlayers.map((player, index) => (
            <li key={index} className={styles.listItem}>
              {player.name}: {player.points} pts
            </li>
          ))}
        </ul>
      </div>     
    </div>
  );
};

export default Leaderboard;
