'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import notif from '../../../public/icon_notif.png';

const Notif_marshak = () => { //notification icon on /marshak
  return (
    <Link href="/marshak" 
      style={{
        position: 'absolute',
        bottom: '200px',
        right: '860px',
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

export default Notif_marshak;
