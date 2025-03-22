
import { useState } from "react";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ContactFormProps {
  services: string[];
}

const ContactForm = ({ services }: ContactFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const triggerEmailNotification = async () => {
    try {
      await supabase.functions.invoke('send-notification-email');
    } catch (error) {
      console.error('Error triggering email notification:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit to Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          { 
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
          }
        ]);
      
      if (error) throw error;
      
      // Trigger email notification
      await triggerEmailNotification();
      
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      
      // Clear form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="john@example.com"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="subject" className="block text-sm font-medium mb-2">Service Interest</label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="" disabled>Select a service</option>
          {services.map((service) => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          placeholder="Tell us about your project or inquiry..."
        ></textarea>
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="cta-button gold-gradient hover:opacity-90 w-full flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          "Sending Message..."
        ) : (
          <>
            Send Message <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
