import { useState } from "react";
import {
  Eye,
  Mail,
  Lock,
  User,
  EyeOff,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import Footer from "../../components/Footer.jsx";
import { useAuthStore } from "../../store/useAuthStore.js";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../../components/Header.jsx";
import CheckBox from "../../components/CheckBox.jsx";
import Button from "../../components/Button.jsx";
import InputField from "../../components/InputField.jsx";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loginInUser, isLoggining } = useAuthStore();

  const isFormDataEmpty = !formData.email || !formData.password;

  const inputFieldsConfig = [
    {
      name: "email",
      placeholder: "e.g example@gmail.com",
      type: "email",
      icon: Mail,
    },
    {
      name: "password",
      placeholder: "e.g Password@123",
      type: "password",
      icon: Lock,
      isPassword: true,
    },
  ];

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
  });

  const togglePasswordVisibility = (fieldName) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required.");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format.");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password is atleast 6 character long.");

    return true;
  };

  const handleSubmit = (e) => {
    console.log("work");
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      loginInUser(formData);
      setFormData({
        email: "",
        password: "",
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
              <User className="text-indigo-500" size={28} />
              Sign In
            </motion.h2>

            <AnimatePresence mode="wait">
              <motion.form
                key="loginForm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="w-full space-y-4 transition-all duration-500"
              >
                {/* input fields */}
                {inputFieldsConfig.map((field) => (
                  <div key={field.name} className="relative">
                    <InputField
                      Icon={field.icon}
                      IconSize={18}
                      InputType={
                        field.isPassword && passwordVisibility[field.name]
                          ? "text"
                          : field.type
                      }
                      placeholder={field.placeholder}
                      data={formData[field.name]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.name]: e.target.value,
                        })
                      }
                      activeTextColor={"gray-800"}
                      unActiveTextColor={"gray-400"}
                      activeBorderColor={"gray-800"}
                      unActiveBorderColor={"gray-400"}
                      inputCaretColor={"gray-800"}
                      inputBackGroundColor={"transparent"}
                    />

                    {field.isPassword && (
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(field.name)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {passwordVisibility[field.name] ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    )}
                  </div>
                ))}

                <div className="mt-4 flex justify-between items-center">
                  <CheckBox text={<>Remember me </>} />

                  <Link
                    to="/forgot-password"
                    className="text-indigo-600 underline text-sm"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* submit button */}
                <Button
                  type={"submit"}
                  disabled={isFormDataEmpty || isLoggining}
                  isFormDataEmpty={isFormDataEmpty}
                  content={
                    <>
                      {" "}
                      {isLoggining ? (
                        <>
                          <Loader2 className="animate-spin" size={16} />
                          Logging in...
                        </>
                      ) : (
                        <>
                          Sign In <ArrowRight size={18} />
                        </>
                      )}
                    </>
                  }
                  primaryColor={"bg-indigo-600"}
                  disabledColor={"bg-indigo-400"}
                />
              </motion.form>
            </AnimatePresence>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-600 underline">
                Create one
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
