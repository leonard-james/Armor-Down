import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatIs from './components/WhatIs';
import Statistics from './components/Statistics';
import MythsReality from './components/MythsReality';
import Effects from './components/Effects';
import Voices from './components/Voices';
import LawsPolicies from './components/LawsPolicies';
import BreakSilence from './components/BreakSilence';
import References from './components/References';
import Footer from './components/Footer';
import AnimationLayer from './components/AnimationLayer';

export default function App() {
  return (
    <div style={{ background: '#0f0d0b', minHeight: '100vh', position: 'relative' }}>
      <AnimationLayer />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <WhatIs />
        <Statistics />
        <MythsReality />
        <Effects />
        <Voices />
        <LawsPolicies />
        <BreakSilence />
        <References />
      </main>
      <Footer />
    </div>
  );
}
