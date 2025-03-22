
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import BackgroundMusic from "@/components/ui/BackgroundMusic";

// Import using URL to prevent build errors with audio files
const backgroundMusicUrl = "/clarniet.mp3";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <BackgroundMusic audioSrc={backgroundMusicUrl} autoplay={true} />
      <Footer />
    </div>
  );
};

export default Index;
