"use client"

import React, { useEffect, useState } from 'react';

const NonCriticalStyles: React.FC = () => {
  const [stylesLoaded, setStylesLoaded] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = '/styles/non-critical.css';
    link.rel = 'stylesheet';
    link.onload = () => setStylesLoaded(true);
    link.onerror = (err) => console.error('Error loading non-critical styles:', err);
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return null;
};

export default NonCriticalStyles;