
import { useState } from "react";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const NewsletterForm = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        .from('newsletter_subscribers')
        .insert([{ email }]);
      
      if (error) throw error;
      
      // Trigger email notification
      await triggerEmailNotification();
      
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      // Clear form
      setEmail("");
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast({
        title: "Error",
        description: "There was an error subscribing. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Enter your email"
        className="px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 w-full"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="cta-button gold-gradient hover:opacity-90 flex items-center justify-center gap-2 py-3 px-6"
      >
        {isSubmitting ? (
          "Subscribing..."
        ) : (
          <>
            Subscribe <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
};

export default NewsletterForm;
