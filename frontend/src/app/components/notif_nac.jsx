'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import notif from '../../../public/icon_notif.png';

const Notif_nac = () => {
  return (
    <Link href="/nac" 
      style={{
        position: 'absolute',
        bottom: '410px',
        left: '700px',
        cursor: 'pointer',
        padding: '10px',
        zIndex: 1,
        display: 'inline-block',
      }}
    >
      <Image 
        src={notif} 
        alt="Notification Icon" 
        width={50} 
        height={50} 
        style={{ display: 'block' }}
      />
    </Link>
  );
};

export default Notif_nac;
