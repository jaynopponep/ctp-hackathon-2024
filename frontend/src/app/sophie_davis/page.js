'use client';
import React, { useState } from 'react';
import SophieDavis from '../components/sophieDavisView'
import NotificationBox from '../components/notification_box';
import SophieDavisQuestUI from '../components/sophieDavisQuestUI'; // Import using the capitalized name
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
      <SophieDavis />
      {!showQuestUI ? (
        <NotificationBox onSwitch={handleSwitch} />
      ) : (
        <SophieDavisQuestUI onClose={handleCloseQuestUI} /> // Use the capitalized component name
      )}
    </div>
  );
}


//import SophieDavis from '../components/sophieDavisView'
