
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

    // Directly fetch recent submissions instead of using subscription
    const { data: contactSubmissions, error: contactError } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (contactError) {
      console.error("Error fetching contact submissions:", contactError);
      return new Response(JSON.stringify({ error: contactError.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }
    
    // Send email notification for contact submissions
    for (const submission of contactSubmissions) {
      const emailContent = `
New Contact Form Submission:
---------------------------
Name: ${submission.name}
Email: ${submission.email}
Subject: ${submission.subject}
Message: ${submission.message}
Date: ${new Date(submission.created_at).toLocaleString()}
      `;
      
      // Use SendGrid for email delivery
      const sgResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
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
      
      console.log(`Email notification sent for submission ${submission.id}, status:`, sgResponse.status);
      
      if (!sgResponse.ok) {
        const errorText = await sgResponse.text();
        console.error("SendGrid API error:", errorText);
      }
    }
    
    // Similarly handle newsletter subscribers
    const { data: newsletterSubscribers, error: newsletterError } = await supabase
      .from('newsletter_subscribers')
      .select('*')
      .order('subscribed_at', { ascending: false })
      .limit(5);
    
    if (newsletterError) {
      console.error("Error fetching newsletter subscribers:", newsletterError);
    } else {
      // Send email notification for new subscribers
      for (const subscriber of newsletterSubscribers) {
        const emailContent = `
New Newsletter Subscription:
---------------------------
Email: ${subscriber.email}
Date: ${new Date(subscriber.subscribed_at).toLocaleString()}
        `;
        
        const sgResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
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
        
        console.log(`Email notification sent for subscriber ${subscriber.id}, status:`, sgResponse.status);
      }
    }

    return new Response(JSON.stringify({ message: "Email notifications processed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in send-notification-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
