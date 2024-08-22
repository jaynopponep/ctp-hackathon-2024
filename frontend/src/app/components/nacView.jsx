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
        src= "https://www.google.com/maps/embed?pb=!4v1724308952486!6m8!1m7!1sBRqCe1QqGW_UbXdI_JMcXw!2m2!1d40.82013922157348!2d-73.94954031258408!3f263.46631850190676!4f2.0228807564025857!5f0.7820865974627469" 
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
