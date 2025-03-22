
import { Music, Facebook, Youtube, MessageSquare } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const navigation = {
    main: [
      { name: "Home", href: "#home" },
      { name: "Services", href: "#services" },
      { name: "Portfolio", href: "#portfolio" },
      { name: "About", href: "#about" },
      { name: "Contact", href: "#contact" },
    ],
    services: [
      { name: "Live Performances", href: "#services" },
      { name: "Music Production", href: "#services" },
      { name: "Original Compositions", href: "#services" },
      { name: "Music Lessons", href: "#services" },
      { name: "Arrangement Services", href: "#services" },
    ],
    social: [
      { name: "youtube", icon: Youtube, href: "https://www.youtube.com/@Sameh_Yahya" },
      { name: "facebook", icon: Facebook, href: "https://www.facebook.com/MOHAtairov" },
      { name: "whatsapp", icon: MessageSquare, href: "https://wa.me/201207189915" }
    ]
  };

  return (
    <footer className="bg-accent/50 dark:bg-accent/10 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2 group mb-4">
              <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-gold-400 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                <Music className="h-5 w-5 text-gold-500 group-hover:animate-wave" />
                <div className="absolute inset-0 bg-gradient-to-tr from-gold-300/20 to-azure-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="font-serif text-xl font-bold">
                <span className="text-gradient">Sameh Yahya</span>
              </div>
            </a>
            <p className="text-muted-foreground mb-6">
              Bridging musical traditions through masterful performances and compositions that transcend cultural boundaries.
            </p>
            <div className="flex gap-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                  aria-label={`Follow on ${item.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <item.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="font-bold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to receive updates on new performances, releases, and events.
            </p>
            <form className="mb-4 flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-background border border-border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary/50 flex-grow"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <div className="text-sm text-muted-foreground">
              We respect your privacy. Unsubscribe at any time.
            </div>
          </div>
        </div>
        
        {/* Bottom section - removed legal links */}
        <div className="border-t border-border pt-6 flex justify-center">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Sameh Yahya. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
