'use client';
import React, { useState } from 'react';
import Shepard from '../components/shepardView.jsx'
import NotificationBox from '../components/notification_box';
import ShepardQuestUI from '../components/shepardQuestUI'; // Import using the capitalized name
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
      <Shepard />
      {!showQuestUI ? (
        <NotificationBox onSwitch={handleSwitch} />
      ) : (
        <ShepardQuestUI onClose={handleCloseQuestUI} /> // Use the capitalized component name
      )}
    </div>
  );
}



//import Shepard from '../components/shepardView.jsx'
