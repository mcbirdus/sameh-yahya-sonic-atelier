
import { useState } from "react";
import { Mic, Headphones, Music, BookOpen, PenTool, Sparkles } from "lucide-react";

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      title: "Live Performances",
      description: "Elevate your events with captivating live music that blends traditional Arabic and Turkish styles with contemporary arrangements.",
      icon: Mic,
      color: "from-gold-300 to-gold-500",
      link: "#contact"
    },
    {
      title: "Music Production",
      description: "Professional studio production services, bringing authentic Eastern musical elements into modern compositions and arrangements.",
      icon: Headphones,
      color: "from-azure-400 to-azure-600",
      link: "#contact"
    },
    {
      title: "Original Compositions",
      description: "Custom musical pieces composed for specific needs, whether for film, advertising, or personal projects.",
      icon: Music,
      color: "from-gold-400 to-gold-600",
      link: "#contact"
    },
    {
      title: "Music Lessons",
      description: "Personalized instruction in arranger keyboard techniques, with special focus on Arabic and Turkish music theory and performance.",
      icon: BookOpen,
      color: "from-azure-500 to-azure-700",
      link: "#contact"
    },
    {
      title: "Arrangement Services",
      description: "Transform existing melodies into rich, culturally authentic arrangements that honor traditional styles while embracing innovation.",
      icon: PenTool,
      color: "from-gold-500 to-gold-700",
      link: "#contact"
    },
    {
      title: "Cultural Consultation",
      description: "Expert advice on incorporating authentic Middle Eastern musical elements into various projects and performances.",
      icon: Sparkles,
      color: "from-azure-300 to-azure-500",
      link: "#contact"
    }
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16 relative">
          <span className="inline-block px-3 py-1 bg-accent rounded-full text-sm font-medium mb-4">
            Professional Services
          </span>
          <h2 className="section-title">
            Musical Expertise <span className="text-gradient">At Your Service</span>
          </h2>
          <p className="section-subtitle">
            Discover how Sameh Yahya's musical talents can elevate your projects
            and bring authentic Eastern musical traditions to your audience.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-hover glass-panel p-6 relative overflow-hidden group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Animated border gradient */}
              <div 
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
                  backgroundSize: '200% 100%',
                  animation: hoveredIndex === index ? 'shimmer 2s infinite' : 'none'
                }}
              />
              
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${service.color}`}>
                <service.icon className="h-6 w-6 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold mb-3 font-serif">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              
              {/* CTA Link */}
              <a 
                href={service.link} 
                className="inline-flex items-center text-primary font-medium wave-hover"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <div className="mt-16 text-center">
          <a 
            href="#contact" 
            className="cta-button gold-gradient hover:opacity-90 inline-block"
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
