
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import BackgroundMusic from "@/components/ui/BackgroundMusic";

const musicPlaylist = ["/clarniet.mp3", "/turkish.mp3", "/bayat.mp3"];

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
      <BackgroundMusic playlistSrcs={musicPlaylist} autoplay={true} />
      <Footer />
    </div>
  );
};

export default Index;
