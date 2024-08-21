'use client'
import React from 'react';
import { GoogleMap, LoadScript, StreetViewPanorama } from '@react-google-maps/api';

const MapComponent = () => {
  const fenway = { lat: 40.8194,
    lng: -73.95, };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC__MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        center={fenway}
        zoom={21}
      >
        <StreetViewPanorama
          position={fenway}
          options={{
            pov: { heading: 34, pitch: 10 },
          }}
          visible={true}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
