'use client'
import React from 'react';
import Marshak from '../components/marshakView'; //rendered all google maps components via embedded html scenes. if we used the actual link we could make it interactable, however that detracts from other features of our product.
import Nac from '../components/nacView'
import SophieDavis from '../components/sophieDavisView'
import Shepard from '../components/shepardView.jsx'

export default function Map() {
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Nac /> {/* Google Maps as background */}
      <div style={{ position: 'relative', zIndex: 1, color: 'white', textAlign: 'center', paddingTop: '20vh' }}>
        <h1>About Us</h1>
        <p>This is the About page of the project.</p>
      </div>
    </div>
  );
}
