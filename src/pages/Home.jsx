import { useEffect } from 'react';
import Hero from '../components/Hero';
import WhatIs from '../components/WhatIs';
import Statistics from '../components/Statistics';
import MythsReality from '../components/MythsReality';
import Effects from '../components/Effects';
import Voices from '../components/Voices';
import LawsPolicies from '../components/LawsPolicies';
import BreakSilence from '../components/BreakSilence';
import References from '../components/References';

export default function Home() {
  useEffect(() => {
    // If the intro has already been seen this session (no overlay),
    // immediately snap to the top and clear any leftover hash so
    // the browser doesn't auto-scroll to a section anchor.
    const introAlreadySeen = sessionStorage.getItem('hasSeenIntro');
    if (introAlreadySeen) {
      window.history.replaceState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    // When the intro IS playing, App.jsx calls the same reset
    // inside handleIntroComplete() after the overlay clears.
  }, []);

  return (
    <>
      <Hero />
      <WhatIs />
      <Statistics />
      <MythsReality />
      <Effects />
      <Voices />
      <LawsPolicies />
      <BreakSilence />
      <References />
    </>
  );
}
