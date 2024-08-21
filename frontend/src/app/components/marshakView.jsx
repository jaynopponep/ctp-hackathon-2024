'use client'
import React from 'react';

const GoogleMapsEmbed = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', border: '0' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!4v1724212290027!6m8!1m7!1s-cNi2XrxhmsDxBQGJf1RVg!2m2!1d40.81990719275363!2d-73.94971700126423!3f121.21949117718205!4f6.513249207011086!5f0.7820865974627469"
        style={{ border: '0', width: '100%', height: '100%' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps Embed"
      ></iframe>
    </div>
  );
};

export default GoogleMapsEmbed;
