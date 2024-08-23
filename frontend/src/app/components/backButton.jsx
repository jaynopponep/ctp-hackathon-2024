'use client';

import React from 'react';
import Link from 'next/link';
import { MdArrowBackIos } from "react-icons/md";

const BackButton = () => {
  return (
    <Link href="/map" 
      style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        cursor: 'pointer',
        padding: '30px', // Increase padding for a larger button
        zIndex: 2, // Ensure it appears on top
        backgroundColor: 'rgba(34, 139, 34, 0.8)',
        color: 'white', 
        borderRadius: '8px', // Slightly larger border radius
        textDecoration: 'none', // Remove underline
        display: 'flex', // Align icon and text
        alignItems: 'center', // Center align icon and text
        fontSize: '1.5rem', // Increase font size for larger text
      }}
    >
      <MdArrowBackIos style={{ marginRight: '10px', color: 'white', fontSize: '2rem' }} /> 
      <span>Back to Map/span> 
    </Link>
  );
};

export default BackButton;
