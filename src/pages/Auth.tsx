import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Mail, Lock, Chrome, Eye, EyeOff, User, Phone, Calendar, AtSign } from "lucide-react";

const signupSchema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password too long")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number"),
  username: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9_]{3,30}$/, "Username: 3-30 chars, letters/numbers/underscore"),
  fullName: z.string().trim().min(2, "Full name required").max(60),
  mobile: z
    .string()
    .trim()
    .regex(/^\+[1-9][0-9]{7,14}$/, "Mobile must be E.164, e.g. +911234567890"),
  dateOfBirth: z.string().refine((v) => {
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return false;
    const age = (Date.now() - d.getTime()) / (365.25 * 24 * 3600 * 1000);
    return age >= 13 && age <= 120;
  }, "You must be at least 13 years old"),
});

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(1, "Password required").max(72),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;

    const route = (session: any) => {
      if (cancelled || !session) return;
      navigate("/profiles");
    };

    supabase.auth.getSession().then(({ data: { session } }) => route(session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => route(session));

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const parsed = loginSchema.safeParse({ email, password });
        if (!parsed.success) {
          toast.error(parsed.error.issues[0].message);
          return;
        }
        const { error } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (error) throw error;
        toast.success("Signed in!");
        navigate("/profiles");
      } else {
        const parsed = signupSchema.safeParse({
          email,
          password,
          username,
          fullName,
          mobile,
          dateOfBirth,
        });
        if (!parsed.success) {
          toast.error(parsed.error.issues[0].message);
          return;
        }
        const { data, error } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/profiles`,
            data: {
              username: parsed.data.username,
              full_name: parsed.data.fullName,
              mobile: parsed.data.mobile,
              date_of_birth: parsed.data.dateOfBirth,
            },
          },
        });
        if (error) throw error;
        if (data.session) {
          toast.success("Account created!");
          navigate("/profiles");
        } else {
          toast.success("Check your email to confirm your account.");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: `${window.location.origin}/profiles`,
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Google authentication failed");
    }
  };

  const handleForgotPassword = async () => {
    const parsed = z.string().trim().email().safeParse(email);
    if (!parsed.success) {
      toast.error("Enter your email above, then click Forgot password");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      toast.success("Password reset email sent. Check your inbox.");
    } catch (err: any) {
      toast.error(err.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center p-4 sm:p-6">
      <Helmet>
        <title>Sign In | Vishnu Jillala</title>
        <meta name="description" content="Sign in to access Vishnu Jillala's portfolio with secure authentication." />
        <link rel="canonical" href={`https://vishnujillala.lovable.app${location.pathname}`} />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-8 shadow-2xl">
          <h1 className="text-2xl sm:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-center text-white/60 mb-6 text-sm sm:text-base">
            {isLogin ? "Sign in to continue" : "Sign up to get started"}
          </p>

          <form onSubmit={handleEmailAuth} className="space-y-3">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-purple-400"
              />
            </div>

            {!isLogin && (
              <>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-purple-400"
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    autoComplete="name"
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-purple-400"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                  <Input
                    type="tel"
                    placeholder="Mobile (+911234567890)"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    autoComplete="tel"
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-purple-400"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5 pointer-events-none" />
                  <Input
                    type="date"
                    placeholder="Date of birth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                    max={new Date().toISOString().split("T")[0]}
                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-purple-400 [color-scheme:dark]"
                  />
            </div>

            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="text-sm text-purple-400 hover:text-purple-300 disabled:opacity-50"
                >
                  Forgot password?
                </button>
              </div>
            )}
              </>
            )}

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={isLogin ? 1 : 8}
                autoComplete={isLogin ? "current-password" : "new-password"}
                className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-purple-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base min-h-[44px]"
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black/60 text-white/60">Or continue with</span>
            </div>
          </div>

          <Button
            onClick={handleGoogleAuth}
            variant="outline"
            className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 py-2.5 sm:py-3 text-sm sm:text-base min-h-[44px]"
          >
            <Chrome className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Google
          </Button>

          <p className="text-center text-white/60 mt-6 text-sm sm:text-base">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-400 hover:text-purple-300 font-semibold px-1"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
