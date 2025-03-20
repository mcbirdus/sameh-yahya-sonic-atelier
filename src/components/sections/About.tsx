
import { Award, Music, Globe, FileText } from "lucide-react";

const About = () => {
  const achievements = [
    { value: "15+", label: "Years Experience" },
    { value: "300+", label: "Live Performances" },
    { value: "50+", label: "Original Compositions" },
    { value: "25+", label: "Countries Performed" }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image and Stats */}
          <div className="relative">
            {/* Main Image with decorative elements */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1551696785-927d4ac2d35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Sameh Yahya performing" 
                className="w-full h-auto"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            
            {/* Decorative background elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
            
            {/* Stats overlay */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] glass-panel grid grid-cols-2 gap-4 p-6 shadow-lg">
              {achievements.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-primary font-serif">{item.value}</div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Text Content */}
          <div>
            <span className="inline-block px-3 py-1 bg-accent rounded-full text-sm font-medium mb-4">
              About the Artist
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Meet <span className="text-gradient">Sameh Yahya</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground">
              <p>
                With over 15 years of experience, Sameh Yahya has established himself as a masterful arranger keyboard artist specializing in Arabic and Turkish musical traditions while seamlessly integrating Western influences.
              </p>
              <p>
                His performances are characterized by technical virtuosity and deep emotional expression, bringing authentic Eastern musical modes and rhythms to global audiences through his innovative approach to the arranger keyboard.
              </p>
              <p>
                Sameh's multicultural background and extensive musical training allow him to create unique bridges between diverse musical traditions, resulting in performances and compositions that honor traditional forms while embracing contemporary innovation.
              </p>
            </div>
            
            {/* Expertise Areas */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-primary/10 text-primary">
                  <Music className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Arabic & Turkish Styles</h3>
                  <p className="text-sm text-muted-foreground">Mastery of traditional maqam systems and complex rhythmic patterns</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-primary/10 text-primary">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Fusion Performance</h3>
                  <p className="text-sm text-muted-foreground">Innovative blending of Eastern and Western musical traditions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-primary/10 text-primary">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">International Experience</h3>
                  <p className="text-sm text-muted-foreground">Performances across Europe, Middle East, and North America</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Composition</h3>
                  <p className="text-sm text-muted-foreground">Creator of original works merging cultural musical elements</p>
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="cta-button gold-gradient hover:opacity-90"
              >
                Work with Sameh
              </a>
              <a 
                href="#portfolio" 
                className="cta-button bg-background dark:bg-accent border border-primary hover:bg-primary/10"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
