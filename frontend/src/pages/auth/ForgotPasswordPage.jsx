import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import Footer from "../../components/Footer.jsx";
import Header from "../../components/Header.jsx";
import { useAuthStore } from "../../store/useAuthStore.js";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, ArrowRight, Loader2 } from "lucide-react";

const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const { isRequestingReset, requestPasswordReset } = useAuthStore();

  const isFormDataEmpty = !formData.email;

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required.");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format.");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      requestPasswordReset(formData);
      setFormData({
        email: "",
      });
    }
  };

  return (
    <>
      <Header />
      <main className="bg-gradient-to-br from-purple-50 to-indigo-100">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen flex items-center justify-center px-4"
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-200 bg-white"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
          >
            <motion.h2
              className="text-3xl font-medium mb-6 text-center font-sans bg-gradient-to-br from-purple-600 to-indigo-400 bg-clip-text text-transparent flex items-center justify-center gap-2"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Mail className="text-indigo-500" size={28} />
              Forgot Password
            </motion.h2>

            <AnimatePresence mode="wait">
              <motion.form
                key="forgotPasswordForm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full space-y-4 transition-all duration-500"
              >
                {/* email field */}
                <div className="relative">
                  <Mail
                    className={`absolute top-1/2 transform -translate-y-1/2 text-gray-600 ${
                      formData.email ? "text-indigo-500" : "text-gray-600"
                    }`}
                    size={18}
                  />
                  <input
                    type="email"
                    placeholder="e.g example@gmail.com"
                    className={`w-full border-b border-gray-300 bg-transparent caret-indigo-500 text-gray-800 pl-10 py-2 text-sm focus:outline-none focus:border-b-indigo-500 ${
                      formData.email
                        ? "text-indigo-500 border-b-indigo-500"
                        : "text-gray-300 border-b-gray-300"
                    }`}
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                {/* submit button */}
                <button
                  className={`w-full mt-6 flex justify-center items-center gap-2 font-semibold text-white py-2 px-4 rounded-lg transition-all ${
                    isFormDataEmpty
                      ? "cursor-not-allowed bg-indigo-400"
                      : "bg-indigo-600 cursor-pointer"
                  }`}
                  onClick={handleSubmit}
                  disabled={isFormDataEmpty}
                >
                  {isRequestingReset ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Requesting...
                    </>
                  ) : (
                    <>
                      Request Password Reset{" "}
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </motion.form>
            </AnimatePresence>

            <p className="text-center text-sm text-gray-600 mt-6">
              Remembered your password?{" "}
              <Link to="/login" className="text-indigo-600 underline">
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default ForgotPasswordPage;