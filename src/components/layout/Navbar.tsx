
import { useState, useEffect } from "react";
import { Menu, X, Music } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  const menuItems = [
    { title: "Home", href: "#home" },
    { title: "Services", href: "#services" },
    { title: "Portfolio", href: "#portfolio" },
    { title: "About", href: "#about" },
    { title: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-2 backdrop-blur-lg bg-background/80 shadow-md"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-gold-400 flex items-center justify-center bg-background/50 backdrop-blur-sm">
            <Music className="h-5 w-5 text-gold-500 group-hover:animate-wave" />
            <div className="absolute inset-0 bg-gradient-to-tr from-gold-300/20 to-azure-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="font-serif text-xl font-bold">
            <span className="text-gradient">Sameh Yahya</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <nav className={`${isMobile ? 'hidden' : 'flex'} items-center space-x-8`}>
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="wave-hover text-foreground hover:text-primary transition-colors"
            >
              {item.title}
            </a>
          ))}
          <ThemeToggle />
          <a 
            href="#contact" 
            className="cta-button gold-gradient hover:opacity-90"
          >
            Book Now
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        {isMobile && (
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={toggleMenu}
              className="p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-background/95 backdrop-blur-lg z-40 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col justify-center`}
      >
        {/* X Button to Close Menu */}
        <button 
          onClick={closeMenu}
          className="absolute top-6 right-6 p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Close menu"
        >
          <X className="h-8 w-8" />
        </button>
        
        <nav className="flex flex-col items-center space-y-8 p-8">
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="text-2xl font-medium wave-hover text-foreground hover:text-primary transition-colors"
              onClick={closeMenu}
            >
              {item.title}
            </a>
          ))}
          <a 
            href="#contact" 
            className="cta-button gold-gradient hover:opacity-90 mt-6 w-full text-center"
            onClick={closeMenu}
          >
            Book Now
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
