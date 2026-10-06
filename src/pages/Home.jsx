import { useEffect } from 'react';
import Hero from '../components/Hero';
import WhatIs from '../components/WhatIs';
import Statistics from '../components/Statistics';
import MythsReality from '../components/MythsReality';
import Effects from '../components/Effects';
import Voices from '../components/Voices';
import LawsPolicies from '../components/LawsPolicies';
import BreakSilence from '../components/BreakSilence';
import AboutSection from '../components/AboutSection';
import References from '../components/References';

export default function Home() {
  useEffect(() => {
    const introAlreadySeen = sessionStorage.getItem('hasSeenIntro');
    if (introAlreadySeen) {
      window.history.replaceState(null, '', '/');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
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
      <AboutSection />
      <References />
    </>
  );
}
