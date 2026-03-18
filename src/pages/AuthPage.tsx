import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { BookOpen, LogIn, UserPlus, KeyRound } from "lucide-react";

type Mode = "login" | "signup" | "forgot";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (mode === "forgot") {
      const { error } = await resetPassword(email);
      setSubmitting(false);
      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Check your email", description: "Password reset link sent." });
        setMode("login");
      }
      return;
    }

    if (mode === "login") {
      const { error } = await signIn(email, password);
      setSubmitting(false);
      if (error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      } else {
        navigate("/");
      }
    } else {
      const { error } = await signUp(email, password);
      setSubmitting(false);
      if (error) {
        toast({ title: "Signup failed", description: error.message, variant: "destructive" });
      } else {
        toast({
          title: "Check your email",
          description: "We sent a confirmation link. Please verify your email before signing in.",
        });
        setMode("login");
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-xl">
            {mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Reset Password"}
          </CardTitle>
          <CardDescription>
            {mode === "login"
              ? "Sign in to save and manage your custom course content"
              : mode === "signup"
              ? "Create an instructor account for RE 103"
              : "Enter your email to receive a password reset link"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="instructor@tmcc.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {mode !== "forgot" && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            )}
            <Button type="submit" className="w-full gap-2" disabled={submitting}>
              {mode === "login" ? (
                <><LogIn className="h-4 w-4" /> Sign In</>
              ) : mode === "signup" ? (
                <><UserPlus className="h-4 w-4" /> Create Account</>
              ) : (
                <><KeyRound className="h-4 w-4" /> Send Reset Link</>
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground space-y-1">
            {mode === "login" ? (
              <>
                <button onClick={() => setMode("forgot")} className="underline hover:text-foreground block mx-auto">
                  Forgot password?
                </button>
                <p>
                  No account?{" "}
                  <button onClick={() => setMode("signup")} className="underline hover:text-foreground">
                    Sign up
                  </button>
                </p>
              </>
            ) : (
              <p>
                Already have an account?{" "}
                <button onClick={() => setMode("login")} className="underline hover:text-foreground">
                  Sign in
                </button>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
