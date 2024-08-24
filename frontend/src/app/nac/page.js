'use client';
import React, { useState } from 'react';
import Nac from '../components/nacView';
import NotificationBox from '../components/notification_box';
import NacQuestUI from '../components/NacQuestUI'; // Import using the capitalized name
import BackButton from '../components/BackButton';

export default function Map() {
  const [showQuestUI, setShowQuestUI] = useState(false);

  const handleSwitch = () => {
    setShowQuestUI(true);
  };

  const handleCloseQuestUI = () => {
    setShowQuestUI(false);
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <BackButton />
      <Nac />
      {!showQuestUI ? (
        <NotificationBox onSwitch={handleSwitch} />
      ) : (
        <NacQuestUI onClose={handleCloseQuestUI} /> // Use the capitalized component name
      )}
    </div>
  );
}
