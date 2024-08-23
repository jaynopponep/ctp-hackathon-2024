'use client';
import Image from 'next/image';
import React from 'react';
import notif from '../../../public/icon_notif.png';

const NotificationBox = ({ onSwitch }) => { // notification box to be rendered by pages
  return (                                  // this will open the leaderboard with a use state on the page
    <div style={styles.container} onClick={onSwitch}>
      <Image
        src={notif}
        alt="Notification Icon"
        width={24}
        height={24}
        style={styles.icon}
      />
      <p style={{ color: '#335' }}>
        You have x Quests Available
      </p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: 'rgb(255, 255, 100)', 
    borderRadius: '4px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '300px',
    position: 'absolute',
    top: '200px',
    left: '550px',
    cursor: 'pointer', // This makes the entire box look like a clickable button
  },
  icon: {
    marginRight: '10px',
  },
};

export default NotificationBox;
