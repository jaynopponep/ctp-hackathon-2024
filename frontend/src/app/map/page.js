'use client';
import React, { useState } from 'react';
import Marshak from '../components/marshakView';
import Nac from '../components/nacView';
import SophieDavis from '../components/sophieDavisView';
import Shepard from '../components/shepardView.jsx';
import NotificationBox from '../components/notification_box';
import QuestUI from '../components/questUI'; // Import your QuestUI component

export default function Map() {
  const [showQuestUI, setShowQuestUI] = useState(false);

  const handleSwitch = () => {
    setShowQuestUI(true);
  };

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Marshak /> {/* Google Maps as background */}

    </div>
  );
}
