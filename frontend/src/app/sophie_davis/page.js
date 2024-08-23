'use client'
import React from 'react';
import SophieDavis from '../components/sophieDavisView'

import BackButton from '../components/backButton.jsx';

export default function Map() {
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <SophieDavis /> 
      <div style={{ position: 'relative', zIndex: 1, color: 'white', textAlign: 'center', paddingTop: '20vh' }}>
        <h1>About Us</h1>
        <p>This is the About page of the project.</p>
      </div>
      <BackButton />
    </div>
  );
}
