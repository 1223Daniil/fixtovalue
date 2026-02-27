import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Pains from './sections/Pains';
import Solution from './sections/Solution';
import Advantages from './sections/Advantages';
import Cases from './sections/Cases';
import Pricing from './sections/Pricing';
import FinalCTA from './sections/FinalCTA';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <Pains />
        <Solution />
        <Advantages />
        <Cases />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
