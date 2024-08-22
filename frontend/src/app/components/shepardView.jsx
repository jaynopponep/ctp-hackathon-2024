'use client';
import React from 'react';

const NacView = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      <iframe
        src= "https://www.google.com/maps/embed?pb=!4v1724310172089!6m8!1m7!1sZR2dtTdAqrtvAmyG2kiYUg!2m2!1d40.82084779339858!2d-73.94902979798775!3f103.07471984872976!4f16.03877364608273!5f0.7820865974627469"
        style={{ border: '0', width: '100%', height: '100%', pointerEvents: 'none' }} // Disable interaction
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps Embed"
      ></iframe>
    </div>
  );
};

export default NacView;
