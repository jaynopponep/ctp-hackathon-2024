'use client';
import React, { useState } from 'react';
import Marshak from '../components/marshakView';
import Nac from '../components/nacView';
import SophieDavis from '../components/sophieDavisView';
import Shepard from '../components/shepardView.jsx';
import NotificationBox from '../components/notification_box';
import QuestUI from '../components/questUI';
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
      <Marshak />
      {!showQuestUI ? (
        <NotificationBox onSwitch={handleSwitch} />
      ) : (
        <QuestUI onClose={handleCloseQuestUI} />
      )}
    </div>
  );
}
