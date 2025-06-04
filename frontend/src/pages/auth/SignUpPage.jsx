import { useState } from "react";
import {
  Eye,
  Mail,
  Lock,
  User,
  EyeOff,
  FilePlus,
  UserPlus2,
  CornerDownRight,
  UserRoundSearch,
  ArrowRight,
  Loader2,
  StepBack,
} from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import Footer from "../../components/Footer.jsx";
import { useAuthStore } from "../../store/useAuthStore.js";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../../components/Header.jsx";
import Button from "../../components/Button.jsx";
import CheckBox from "../../components/CheckBox.jsx";
import InputField from "../../components/InputField.jsx";

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [agree, setAgree] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    file: null,
  });

  const { signUpUser, isSigningUp } = useAuthStore();
  
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (fieldName) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  const isFormDataEmpty =
    !formData.fullName ||
    !formData.username ||
    !formData.email ||
    !formData.password;
  !formData.confirmPassword;

  const inputFieldsConfig = [
    {
      name: "fullName",
      placeholder: "e.g Muhammad Ahmad",
      type: "text",
      icon: User,
    },
    {
      name: "username",
      placeholder: "e.g Ahmad667037",
      type: "text",
      icon: UserRoundSearch,
    },
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
    {
      name: "confirmPassword",
      placeholder: "Confirm your password",
      type: "password",
      icon: Lock,
      isPassword: true,
    },
  ];

  const handleNext = (e) => {
    e.preventDefault();
    if (validateForm() === true) {
      setStep(2);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Name is required.");
    if (formData.fullName.length < 3)
      return toast.error("Name is atleast 3 character long.");
    if (!formData.username.trim()) return toast.error("Username is required.");
    if (formData.username.length < 4)
      return toast.error("Username is atleast 4 character long.");
    if (!/^[a-zA-Z0-9]+$/.test(formData.username))
      return toast.error("Username can only contain letters and numbers.");
    if (!formData.email.trim()) return toast.error("Email is required.");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format.");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password is atleast 6 character long.");
    if (formData.password !== formData.confirmPassword)
      return toast.error("Confirm Password is not matched.");

    return true;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setFormData({ ...formData, hoverUpload: true });
  };

  const handleDragLeave = () => {
    setFormData({ ...formData, hoverUpload: false });
  };

  const handleDropImage = (e) => {
    e.preventDefault();
    const droppedImageFile = e.dataTransfer.files[0];
    if (droppedImageFile && droppedImageFile.type.startsWith("image/")) {
      setFormData({
        ...formData,
        file: droppedImageFile,
        hoverUpload: false,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      signUpUser(formData);
      setFormData({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        file: null,
      });
      setAgree(false);
      setStep(1);
    }
  };

  return (
    <>
      <Header />
      <main className="h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4 py-2 transition-all duration-500">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full flex justify-center items-center"
        >
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
            className="w-[70%] p-8 rounded-2xl shadow-xl border border-gray-200 bg-white"
            onSubmit={handleSubmit}
          >
            <motion.h2
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-3xl font-medium mb-6 text-center font-sans bg-gradient-to-br from-purple-600 to-indigo-400 bg-clip-text text-transparent flex items-center justify-center gap-2"
            >
              <UserPlus2 className="text-indigo-500" size={28} /> Create Account
            </motion.h2>

            <AnimatePresence mode="wait">
              {/* input fields */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full space-y-6 transition-all duration-500"
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

                  {/* checkbox */}
                  <CheckBox
                    text={
                      <>
                        I agree to the{" "}
                        <a href="#" className="text-indigo-600 underline">
                          terms of service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-indigo-600 underline">
                          privacy policy
                        </a>
                      </>
                    }
                    agree={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />

                  {/* next button */}
                  <Button
                    agree={agree}
                    type={"button"}
                    onClick={handleNext}
                    isFormDataEmpty={isFormDataEmpty}
                    disabled={!agree || isFormDataEmpty || isSigningUp}
                    content={
                      <>
                        {" "}
                        {isSigningUp ? (
                          <>
                            <Loader2 className="size-5 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>
                            <CornerDownRight size={18} />
                            Next Step
                          </>
                        )}
                      </>
                    }
                    primaryColor={"bg-indigo-600"}
                    disabledColor={"bg-indigo-400"}
                  />
                </motion.div>
              )}

              {/* file input field */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 flex flex-col gap-0.5 transition-all duration-500"
                >
                  <label className="text-sm font-semibold text-indigo-700 tracking-wide mb-1 flex items-center gap-1">
                    <FilePlus size={16} className="text-indigo-400" />{" "}
                    <span className="text-lg">Profile Pic</span>{" "}
                    <span className="text-[14px] text-indigo-500">
                      (You can also continue without uploading an image)
                    </span>
                  </label>

                  {/* file input field */}
                  <div
                    className={`flex items-center justify-center w-full h-78 gap-2 mt-2 border-2 border-dashed p-4 rounded-lg cursor-pointer transition-colors duration-300 ${
                      formData.file ? "border-indigo-500" : "border-gray-300"
                    } hover:border-indigo-500`}
                    onClick={() => document.getElementById("fileInput").click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDropImage}
                    onMouseEnter={() =>
                      setFormData({ ...formData, hoverUpload: true })
                    }
                    onMouseLeave={() =>
                      setFormData({ ...formData, hoverUpload: false })
                    }
                  >
                    {!formData.file ? (
                      <>
                        <FilePlus
                          className={
                            formData.hoverUpload
                              ? "text-indigo-600"
                              : "text-gray-600"
                          }
                          size={24}
                        />
                        <span
                          className={`text-sm font-medium transition-colors duration-300 ${
                            formData.hoverUpload
                              ? "text-indigo-600"
                              : "text-gray-600"
                          }`}
                        >
                          Click or Drop file to upload
                        </span>
                      </>
                    ) : (
                      <span className="text-sm text-indigo-600 font-medium">
                        {formData.file.name}
                      </span>
                    )}
                    <input
                      type="file"
                      name="file"
                      id="fileInput"
                      accept="image/*"
                      onChange={(e) =>
                        setFormData({ ...formData, file: e.target.files[0] })
                      }
                      className="hidden"
                    />
                  </div>

                  {/* buttons next or back */}
                  <div className="flex justify-between gap-10">
                    <Button
                      onClick={handleBack}
                      content={
                        <>
                          <StepBack size={18} /> Back
                        </>
                      }
                      secondaryColor={"bg-rose-500 cursor-pointer"}
                    />
                    <Button
                      type={"submit"}
                      disabled={isSigningUp}
                      onClick={handleSubmit}
                      content={
                        <>
                          {isSigningUp ? (
                            <>
                              <Loader2 className="size-5 animate-spin" />
                              Loading...
                            </>
                          ) : (
                            <>
                              Create Account <ArrowRight size={18} />
                            </>
                          )}
                        </>
                      }
                      secondaryColor={"bg-indigo-600 cursor-pointer"}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 underline">
                Sign in
              </Link>
            </p>
          </motion.form>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default SignUpPage;
