'use client';
import React, {useEffect, useState} from 'react';
import styles from './Leaderboard.module.css';
import Chat from './Chatbot';

const Leaderboard = () => {
    const [players, setPlayers] = useState([]);
  useEffect(() => {
      const getLeaderboard = async () => {
          try {
              let response = await fetch(`http://127.0.0.1:5000/get-leaderboard`);
              let data = await response.json();
              if (data.leaderboard) {
                    setPlayers(data.leaderboard);
                }
      } catch (error) {
              console.error(error.message);
          }
      };
      getLeaderboard()
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}>Leaderboard</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index} className={styles.listItem}>
              {player.username}: {player.score} pts
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
