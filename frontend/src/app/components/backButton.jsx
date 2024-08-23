'use client';

import React from 'react';
import Link from 'next/link';
import { MdArrowBackIos } from "react-icons/md";

const BackButton = () => {
  return (
    <Link href="/map" 
      style={{
        position: 'absolute',
        top: '8px',
        left: '-5px',
        padding: '15px',
        cursor: 'pointer',
        zIndex: 2, // Ensure it appears on top
        backgroundColor: 'rgb(109, 40, 134)',
        color: 'white', 
        borderRadius: '18px', // Slightly larger border radius
        textDecoration: 'none', // Remove underline
        display: 'flex', // Align icon and text
        alignItems: 'center', // Center align icon and text
        fontSize: '1.5rem', // Increase font size for larger text
      }}
    >
      <MdArrowBackIos style={{ marginRight: '10px', color: 'white', fontSize: '2rem' }} /> 
      <span>Back to Map</span> 
    </Link>
  );
};

export default BackButton;
