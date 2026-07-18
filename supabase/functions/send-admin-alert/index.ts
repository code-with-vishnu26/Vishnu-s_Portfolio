import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAIL = "vishnujillala02@gmail.com";

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require authenticated caller so unauthenticated attackers can't flood the admin inbox
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const token = authHeader.replace("Bearer ", "");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser(token);
    if (userErr || !userData.user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const profileName = typeof body?.profileName === "string" ? body.profileName : "";
    const attemptCountRaw = body?.attemptCount;
    const attemptCount = typeof attemptCountRaw === "number"
      ? attemptCountRaw
      : parseInt(String(attemptCountRaw ?? ""), 10);
    const ipAddress = typeof body?.ipAddress === "string" ? body.ipAddress : "";
    const userAgent = typeof body?.userAgent === "string" ? body.userAgent : "";
    const timestamp = typeof body?.timestamp === "string" ? body.timestamp : new Date().toISOString();

    // Use authenticated user's email — never trust client-supplied email
    const email = userData.user.email ?? "";

    if (!profileName || !Number.isFinite(attemptCount) || attemptCount <= 0) {
      return new Response(
        JSON.stringify({ error: "Missing or invalid fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Allow-list profile names
    const allowed = new Set(["recruiter", "adventure", "friends", "family"]);
    if (!allowed.has(profileName.toLowerCase())) {
      return new Response(
        JSON.stringify({ error: "Invalid profile" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const safeEmail = escapeHtml(email);
    const safeProfile = escapeHtml(profileName);
    const safeAttempts = escapeHtml(attemptCount);
    const safeIp = escapeHtml(ipAddress || "N/A");
    const safeUa = escapeHtml(userAgent || "N/A");
    let safeTs = "N/A";
    try {
      safeTs = escapeHtml(new Date(timestamp).toLocaleString());
    } catch {
      safeTs = escapeHtml(timestamp);
    }

    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    const { error: emailError } = await resend.emails.send({
      from: "Security Alerts <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      subject: `🚨 Security Alert: Multiple Failed PIN Attempts`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff3cd; border: 2px solid #ffc107; border-radius: 8px;">
          <h2 style="color: #856404; margin-top: 0;">🚨 Security Alert</h2>
          <p style="color: #856404; font-size: 16px; font-weight: bold;">Multiple failed PIN attempts detected</p>
          <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">User Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold; color: #666;">Email:</td><td style="padding: 8px; color: #333;">${safeEmail}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #666;">Profile:</td><td style="padding: 8px; color: #333;">${safeProfile}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #666;">Failed Attempts:</td><td style="padding: 8px; color: #dc3545; font-weight: bold;">${safeAttempts}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #666;">IP Address:</td><td style="padding: 8px; color: #333;">${safeIp}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #666;">User Agent:</td><td style="padding: 8px; color: #333; font-size: 12px;">${safeUa}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; color: #666;">Timestamp:</td><td style="padding: 8px; color: #333;">${safeTs}</td></tr>
            </table>
          </div>
          <div style="background: #f8d7da; padding: 15px; border-radius: 6px; border-left: 4px solid #dc3545;">
            <p style="margin: 0; color: #721c24; font-size: 14px;"><strong>Action Required:</strong> This could indicate a potential security breach or brute-force attack. Please review the user's account and consider taking appropriate action.</p>
          </div>
          <p style="font-size: 12px; color: #666; margin-top: 20px; margin-bottom: 0;">This is an automated security alert from your authentication system.</p>
        </div>
      `,
    });

    if (emailError) {
      console.error("Email error:", emailError);
      return new Response(
        JSON.stringify({ error: "Failed to send alert email" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Alert sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in send-admin-alert function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
