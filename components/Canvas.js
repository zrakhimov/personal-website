import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import initOciliator from '../scripts/osciliator';

export default function Canvas() {
  const { theme, setTheme } = useTheme();
  // Initiate Ociliator animation
  useEffect(() => {
    document.getElementById('canvas').addEventListener('focus', () => initOciliator(false, theme));
    initOciliator(false, theme);
  }, [theme]);

  return <canvas className="!absolute !left-0 !-z-10" id="canvas"></canvas>;
}
