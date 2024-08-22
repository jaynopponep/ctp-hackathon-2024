'use client';
import React from 'react';

const sdView = () => {
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
        src="https://www.google.com/maps/embed?pb=!4v1724309902645!6m8!1m7!1s0KlOy3DJ9_RpYg7Kuk-9Bw!2m2!1d40.82112602840669!2d-73.95066636381883!3f115.13124329921908!4f2.263903444993815!5f0.7820865974627469" 
        style={{ border: '0', width: '100%', height: '100%', pointerEvents: 'none' }} // Disable interaction
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps Embed"
      ></iframe>
    </div>
  );
};

export default sdView;
