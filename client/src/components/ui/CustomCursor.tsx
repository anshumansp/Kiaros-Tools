"use client"

import { useEffect, useState } from 'react';

export default function CustomCursor() {
    return (
        <div className="custom-cursor" style={{
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 9999,
            width: '24px',
            height: '24px',
            backgroundColor: 'black',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%'
        }} />
    );
} 