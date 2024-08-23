'use client';

import React from 'react';
import Notif_marshak from './notif_marshak';
import Notif_sd from './notif_sophieDavis';
import Notif_shepard from './notif_shepard';
import Notif_nac from './notif_nac';

const MapComponent = () => {
  // Slightly adjusted coordinates to move the center southeast
  const ccny = { lat: 40.8199, lng: -73.9495 };
  const zoomLevel = 17; // Slightly zoomed out for broader context
  const mapSize = '1920x1080'; // Full HD resolution
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${ccny.lat},${ccny.lng}&zoom=${zoomLevel}&size=${mapSize}&scale=2&maptype=satellite&key=${process.env.NEXT_PUBLIC_MAP_API_KEY}`;

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh', 
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center', 
      alignItems: 'center',
    }}>
      <img
        src={mapUrl}
        alt="City College of New York Map"
        style={{ 
          width: '90%', 
          height: '90%', 
          objectFit: 'cover',
          maxHeight: '100%',
          border: '5px solid black', // Adds a black border 
          boxShadow: '0px 0px 20px 5px rgba(255, 255, 255, 0.8)', // Adds a white drop shadow
        }}
      />
      <Notif_marshak />
      <Notif_sd />
      <Notif_shepard />
      <Notif_nac />
    </div>
  );
};

export default MapComponent;
