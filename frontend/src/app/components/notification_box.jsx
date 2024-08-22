'use client';
import Image from 'next/image';
import React from 'react';
import notif from '../../../public/icon_notif.png';

const NotificationBox = ({ onSwitch }) => {
  return (
    <div style={styles.container}>
      <Image
        src={notif}
        alt="Notification Icon"
        width={24}
        height={24}
        style={styles.icon}
      />
      <p style={{ color: '#335' }}>
        Hello testing
      </p>
      <button onClick={onSwitch} style={styles.button}>
        Switch to QuestUI
      </button>
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
  },
  icon: {
    marginRight: '10px',
  },
  button: {
    marginLeft: '10px',
    padding: '5px 10px',
    backgroundColor: '#008CBA',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default NotificationBox;
