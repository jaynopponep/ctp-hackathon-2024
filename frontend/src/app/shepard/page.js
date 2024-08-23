'use client'
import React from 'react';
import Shepard from '../components/shepardView.jsx'
import BackButton from './../components/backButton';

export default function Map() {
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Shepard /> 
      <div style={{ position: 'relative', zIndex: 1, color: 'white', textAlign: 'center', paddingTop: '20vh' }}>
        <h1>About Us</h1>
        <p>This is the About page of the project.</p>
        <BackButton />
      </div>
    </div>
  );
}
