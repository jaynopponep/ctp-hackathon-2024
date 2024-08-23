'use client'
import React from 'react';
import Nac from '../components/nacView'
import BackButton from './../components/backButton';

export default function Map() {
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Nac /> {/* Google Maps as background */}
      <div style={{ position: 'relative', zIndex: 1, color: 'white', textAlign: 'center', paddingTop: '20vh' }}>
        <h1>About Us</h1>
        <p>This is the About page of the project.</p>
        <BackButton />
      </div>
    </div>
  );
}
