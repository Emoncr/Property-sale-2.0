import { useState, useEffect } from "react";
import { useSignIn, useUser, useClerk } from "@clerk/clerk-react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  LogOut,
} from "lucide-react";

export default function ResetPasswordForm() {
  const { signIn, setActive } = useSignIn();
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState("request"); // 'request', 'verify', 'success', 'already-signed-in'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check if user is already signed in
  useEffect(() => {
    if (isSignedIn && user) {
      setStep("already-signed-in");
    }
  }, [isSignedIn, user]);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      setStep("request");
      setEmail("");
      setCode("");
      setPassword("");
      setError("");
    } catch (err) {
      setError("Failed to sign out");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // If user is signed in, sign them out first
      if (isSignedIn) {
        await signOut();
      }

      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setStep("verify");
    } catch (err) {
      // Handle the specific "Session already exists" error
      if (err.errors?.[0]?.code === "session_exists") {
        setError(
          "You are already signed in. Please sign out first to reset your password."
        );
      } else {
        setError(err.errors?.[0]?.message || "Failed to send reset email");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: code,
        password: password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setStep("success");
      }
    } catch (err) {
      setError(err.errors?.[0]?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    setStep("request");
    setEmail("");
    setCode("");
    setPassword("");
    setError("");
  };

  if (step === "already-signed-in") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Already Signed In
          </h2>
          <p className="text-gray-600 mb-2">
            You are currently signed in as{" "}
            <strong>{user?.emailAddresses?.[0]?.emailAddress}</strong>
          </p>
          <p className="text-gray-600 mb-6">
            To reset your password, you need to sign out first.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogOut className="w-5 h-5 mr-2" />
                  Sign Out & Reset Password
                </>
              )}
            </button>
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Password Reset Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your password has been successfully reset. You are now signed in.
          </p>
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {step === "request" ? "Reset Your Password" : "Enter Reset Code"}
          </h2>
          <p className="text-gray-600 mt-2">
            {step === "request"
              ? "Enter your email address and we'll send you a reset code"
              : "Enter the code sent to your email and your new password"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        {step === "request" ? (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your email"
                  onKeyDown={(e) => e.key === "Enter" && handleRequestReset(e)}
                />
              </div>
            </div>

            <button
              onClick={handleRequestReset}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Send Reset Code"
              )}
            </button>

            <div className="text-center">
              <a
                href="/sign-in"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Back to Sign In
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Reset Code
              </label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter the 6-digit code"
                onKeyDown={(e) => e.key === "Enter" && handleResetPassword(e)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter new password"
                  onKeyDown={(e) => e.key === "Enter" && handleResetPassword(e)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least 8 characters long
              </p>
            </div>

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Reset Password"
              )}
            </button>

            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={handleStartOver}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Use a different email
              </button>
              <br />
              <a
                href="/sign-in"
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Back to Sign In
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
