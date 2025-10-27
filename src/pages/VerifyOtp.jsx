import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Mail } from "lucide-react";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(600);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length; i++) {
      if (!isNaN(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      toast.error("Please enter complete OTP");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/verify-email",
        { email, otp: otpCode },
        { withCredentials: true }
      );

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success(response.data.message || "Email verified successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error(error.response?.data?.error || "Invalid or expired OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/resend-otp",
        { email },
        { withCredentials: true }
      );

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("OTP resent successfully!");
        setTimer(600);
        setOtp(["", "", "", "", "", ""]);
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error(error.response?.data?.error || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Mail className="text-primary" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Verify Email</h2>
            <p className="text-gray-600 mt-2">Enter the 6-digit code sent to</p>
            <p className="text-primary font-semibold mt-1">{email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              ))}
            </div>

            <div className="text-center">
              {timer > 0 ? (
                <p className="text-sm text-gray-600">
                  Code expires in{" "}
                  <span className="font-semibold text-primary">
                    {formatTime(timer)}
                  </span>
                </p>
              ) : (
                <p className="text-sm text-red-500 font-semibold">
                  OTP has expired
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || timer === 0}
              className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Verify Email"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResend}
              disabled={resendLoading || timer > 540}
              className="text-primary font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendLoading ? "Sending..." : "Resend OTP"}
            </button>
            {timer > 540 && (
              <p className="text-xs text-gray-500 mt-1">
                Available after 1 minute
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
