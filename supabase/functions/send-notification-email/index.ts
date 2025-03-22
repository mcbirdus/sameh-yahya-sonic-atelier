
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Create a Supabase client with the Admin key
    const adminAuthClient = createClient(
      supabaseUrl,
      supabaseServiceKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Setup webhook listener for contact_submissions
    const subscription = supabase
      .channel('table-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'contact_submissions',
        },
        async (payload) => {
          // New contact submission
          const submission = payload.new;
          
          // Send email notification
          const emailContent = `
New Contact Form Submission:
---------------------------
Name: ${submission.name}
Email: ${submission.email}
Subject: ${submission.subject}
Message: ${submission.message}
Date: ${new Date(submission.created_at).toLocaleString()}
          `;
          
          // Use a service like SendGrid, Mailgun, or plain SMTP
          // For this example, I'll use Deno's built-in fetch to a mail service
          const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Deno.env.get("SENDGRID_API_KEY")}`,
            },
            body: JSON.stringify({
              personalizations: [
                {
                  to: [{ email: "laith.alawneh1@yahoo.com" }],
                },
              ],
              from: { email: "noreply@yourwebsite.com" },
              subject: `New Contact Form: ${submission.subject}`,
              content: [
                {
                  type: "text/plain",
                  value: emailContent,
                },
              ],
            }),
          });
          
          console.log("Email notification sent:", response.status);
        }
      )
      .subscribe();

    // Similar setup for newsletter_subscribers
    const newsletterSubscription = supabase
      .channel('newsletter-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'newsletter_subscribers',
        },
        async (payload) => {
          const subscriber = payload.new;
          
          const emailContent = `
New Newsletter Subscription:
---------------------------
Email: ${subscriber.email}
Date: ${new Date(subscriber.subscribed_at).toLocaleString()}
          `;
          
          const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Deno.env.get("SENDGRID_API_KEY")}`,
            },
            body: JSON.stringify({
              personalizations: [
                {
                  to: [{ email: "laith.alawneh1@yahoo.com" }],
                },
              ],
              from: { email: "noreply@yourwebsite.com" },
              subject: "New Newsletter Subscription",
              content: [
                {
                  type: "text/plain",
                  value: emailContent,
                },
              ],
            }),
          });
          
          console.log("Newsletter notification sent:", response.status);
        }
      )
      .subscribe();

    return new Response(JSON.stringify({ message: "Webhook listener started" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
