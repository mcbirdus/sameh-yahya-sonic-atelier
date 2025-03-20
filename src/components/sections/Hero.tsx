
import { useState, useEffect } from "react";
import { Play, ChevronDown, Music2 } from "lucide-react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen pt-20 overflow-hidden hero-gradient">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="music-note text-3xl" style={{ top: '15%', left: '10%', animationDelay: '0s' }}>♪</div>
        <div className="music-note text-4xl" style={{ top: '25%', left: '25%', animationDelay: '1.5s' }}>♫</div>
        <div className="music-note text-2xl" style={{ top: '60%', left: '15%', animationDelay: '2.3s' }}>♪</div>
        <div className="music-note text-5xl" style={{ top: '30%', right: '20%', animationDelay: '0.7s' }}>♫</div>
        <div className="music-note text-2xl" style={{ top: '70%', right: '25%', animationDelay: '1.8s' }}>♪</div>
        <div className="music-note text-3xl" style={{ top: '40%', right: '10%', animationDelay: '3s' }}>♫</div>
      </div>

      <div className="container mx-auto px-4 pt-16 md:pt-28 flex flex-col items-center">
        {/* Tag Line */}
        <div className={`mb-4 glass-panel px-4 py-1 text-sm md:text-base transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <span className="text-primary">Arranger Keyboard Virtuoso</span>
        </div>
        
        {/* Main Heading */}
        <h1 className={`text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 max-w-4xl transition-all duration-700 delay-150 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <span className="block leading-tight">Crafting Melodies Across</span>
          <span className="block leading-tight">
            <span className="text-gradient">Arabic</span> and <span className="text-gradient">Turkish</span> Traditions
          </span>
        </h1>
        
        {/* Subheading */}
        <p className={`text-center text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          Experience the rich fusion of Eastern and Western musical influences through the masterful arrangements of Sameh Yahya, bringing cultural harmony to every performance.
        </p>
        
        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 mb-16 transition-all duration-700 delay-450 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <a href="#services" className="cta-button gold-gradient hover:opacity-90">
            Explore Services
          </a>
          <a href="#portfolio" className="cta-button flex items-center justify-center gap-2 bg-background dark:bg-accent border border-primary hover:bg-primary/10">
            <Play className="h-4 w-4 text-primary" /> Watch Performance
          </a>
        </div>
        
        {/* Musical Wave Animation */}
        <div className={`flex items-end h-16 gap-1 mb-16 transition-all duration-700 delay-600 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="music-bar h-4 animate-music-wave-1"></div>
          <div className="music-bar h-8 animate-music-wave-2"></div>
          <div className="music-bar h-16 animate-music-wave-3"></div>
          <div className="music-bar h-12 animate-music-wave-4"></div>
          <div className="music-bar h-6 animate-music-wave-1"></div>
          <div className="music-bar h-10 animate-music-wave-2"></div>
          <div className="music-bar h-14 animate-music-wave-3"></div>
          <div className="music-bar h-7 animate-music-wave-4"></div>
          <div className="music-bar h-10 animate-music-wave-1"></div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-float">
          <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
          <ChevronDown className="h-6 w-6 text-primary" />
        </div>
      </div>
      
      {/* Featured Music Styles */}
      <div className="absolute -bottom-3 left-0 right-0 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="relative glass-panel py-3 px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Music2 className="h-5 w-5 text-primary" />
              <span className="font-medium">Featured Styles:</span>
            </div>
            <div className="flex items-center gap-6 text-sm md:text-base overflow-x-auto pb-2 hide-scrollbar">
              <span className="whitespace-nowrap">Arabic Classical</span>
              <span className="h-4 w-px bg-border"></span>
              <span className="whitespace-nowrap">Turkish Maqam</span>
              <span className="h-4 w-px bg-border"></span>
              <span className="whitespace-nowrap">Oriental Fusion</span>
              <span className="h-4 w-px bg-border"></span>
              <span className="whitespace-nowrap">Contemporary Western</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
