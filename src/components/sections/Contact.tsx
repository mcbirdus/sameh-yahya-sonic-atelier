import { Mail, Phone, MapPin, Facebook, Youtube, MessageSquare } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import NewsletterForm from "@/components/forms/NewsletterForm";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "info@samehyahya.com",
      link: "mailto:info@samehyahya.com"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+20 120 718 9915",
      link: "tel:+201207189915"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Egypt - Cairo",
      link: "#"
    }
  ];

  const socialLinks = [
    { name: "youtube", icon: Youtube, href: "https://www.youtube.com/@Sameh_Yahya" },
    { name: "facebook", icon: Facebook, href: "https://www.facebook.com/MOHAtairov" },
    { name: "whatsapp", icon: MessageSquare, href: "https://wa.me/201207189915" }
  ];

  const services = [
    "Live Performance",
    "Music Production",
    "Composition",
    "Music Lessons",
    "Arrangement Services",
    "Cultural Consultation",
    "Other"
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-accent rounded-full text-sm font-medium mb-4">
            Get in Touch
          </span>
          <h2 className="section-title">
            Ready to <span className="text-gradient">Work Together?</span>
          </h2>
          <p className="section-subtitle">
            Reach out to discuss your musical needs and how Sameh Yahya's expertise
            can bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="glass-panel p-6 flex items-start gap-4 card-hover group"
              >
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.details}</p>
                </div>
              </a>
            ))}
            
            {/* Social media links */}
            <div className="glass-panel p-6">
              <h3 className="font-medium text-lg mb-4">Follow Sameh</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                    aria-label={`Follow on ${social.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="glass-panel p-6">
              <h3 className="font-medium text-lg mb-4">Join the Newsletter</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Subscribe to get updates on latest performances and music releases.
              </p>
              <NewsletterForm />
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="glass-panel p-8 lg:col-span-2">
            <h3 className="font-serif text-2xl font-bold mb-6">Send a Message</h3>
            <ContactForm services={services} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
