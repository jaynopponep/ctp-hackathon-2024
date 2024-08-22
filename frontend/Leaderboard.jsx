'use client'
import React from 'react';
import styles from './Leaderboard.module.css'; // Import the CSS module

const Leaderboard = () => {
  const players = [
    { name: 'Jay', points: 5000 },
    { name: 'Yared', points: 3000 },
    { name: 'Jawad', points: 2000 },
  ];

  return (
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
  );
};

export default Leaderboard;

/* for tmm:
  Leader board must be dynamic.
  I need players to gain points after correctly solving a problem.
  I need an indicator which will show that the player can't solve that same problem to get more points.
*/