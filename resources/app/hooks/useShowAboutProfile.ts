import React, { useEffect } from 'react';

export const useShowAboutProfile = (show: boolean, deps: any[]) => {
  useEffect(() => {
    const aboutProfile = document.getElementById('about-profile');

    if (!aboutProfile) return;

    if (show) {
      console.log('mở modal');

      aboutProfile.style.setProperty('z-index', '1');
    } else {
      console.log('đóng modal');
      aboutProfile.style.setProperty('z-index', '9999');
    }
  }, deps);
  return null;
};
