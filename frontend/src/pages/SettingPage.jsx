import {
  User,
  Mail,
  Pencil,
  LockKeyholeIcon,
  Eye,
  EyeOff,
  LucideCamera,
  Loader2,
  ArrowRight,
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import { SideBar } from "../components/SideBar.jsx";
import { LucideSettings2 } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore.js";
import Button from "../components/Button.jsx";
import CheckBox from "../components/CheckBox.jsx";
import { ConvertTime } from "../utils/convertTime.utils.js";

const SettingPage = () => {
  const imageRef = useRef();
  const [activeTab, setActiveTab] = useState("Profile");
  const [agree, setAgree] = useState(false);
  const {
    authUser,
    isUpdatingProfile,
    updateUser,
    updateSecurity,
    isDeletingUser,
    deleteUser,
    authUserActivity,
  } = useAuthStore();

  const [isEditing, setIsEditing] = useState({
    fullName: false,
    username: false,
    email: false,
    password: false,
  });

  const [UpdatingPrivacy, setUpdatingPrivacy] = useState({
    accountPrivate: authUser.accountPrivate,
    showOnlineStatus: authUser.showOnlineStatus,
    blockUnknownMsg: authUser.blockUnknownMsg,
    loginAlerts: authUser.loginAlerts,
  });

  const [FormData, setFormData] = useState({
    fullName: authUser.fullName,
    username: authUser.username,
    email: authUser.email,
    file: authUser.profilePicPath,
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const isFormDataEmpty =
    !FormData.fullName || !FormData.username || !FormData.email;

  const handleClick = (e) => {
    e.preventDefault();
    imageRef.current.click();
  };

  const validateForm = () => {
    if (!FormData.fullName.trim()) return toast.error("Name is required.");
    if (FormData.fullName.length < 3)
      return toast.error("Name is atleast 3 character long.");
    if (!FormData.username.trim()) return toast.error("Username is required.");
    if (FormData.username.length < 4)
      return toast.error("Username is atleast 4 character long.");
    if (!/^[a-zA-Z0-9]+$/.test(FormData.username))
      return toast.error("Username can only contain letters and numbers.");
    if (!FormData.email.trim()) return toast.error("Email is required.");
    if (!/\S+@\S+\.\S+/.test(FormData.email))
      return toast.error("Invalid email format.");
    if (isEditing.password && FormData.password.length < 6)
      return toast.error("Password must be at least 6 characters.");

    return true;
  };

  const handleUpdateInfo = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      const dataToSend = { ...FormData };

      if (!FormData.password.trim()) {
        delete dataToSend.password;
      }

      toast
        .promise(updateUser(dataToSend), {
          loading: "Saving...",
          success: <b>Settings saved!</b>,
          error: <b>Could not save.</b>,
        })
        .then(() => {
          setIsEditing({
            fullName: false,
            username: false,
            email: false,
            password: false,
          });
          setFormData((prev) => ({ ...prev, password: "" }));
        });
    }
  };

  const handleUpdateSecurity = (e) => {
    e.preventDefault();
    const dataToSend = { ...UpdatingPrivacy };
    toast
      .promise(updateSecurity(dataToSend), {
        loading: "Saving...",
        success: <b>Settings saved!</b>,
        error: <b>Could not save.</b>,
      })
      .then(() => {
        setUpdatingPrivacy({
          accountPrivate: UpdatingPrivacy.accountPrivate,
          showOnlineStatus: UpdatingPrivacy.showOnlineStatus,
          blockUnknownMsg: UpdatingPrivacy.blockUnknownMsg,
          loginAlerts: UpdatingPrivacy.loginAlerts,
        });
      });
  };

  const handleDeleteAccount = () => {
    deleteUser();
  };

  const tabList = [
    "Profile",
    "Security",
    "Activity",
    "Verification",
    "Account Deletion",
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex font-inter">
        <SideBar />

        <section className="w-full h-auto py-8 pl-10 pr-12 rounded-tl-2xl -ml-8 bg-gradient-to-br from-gray-100 to-blue-50 ">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-semibold text-[#2953a9] mb-6 flex items-center gap-2">
              <LucideSettings2 size={28} /> Account{" "}
              <span className="text-indigo-900">Settings</span>
            </h1>

            <div className="flex bg-white border border-[#dbe6f3] rounded-3xl shadow-lg overflow-hidden">
              {/* side bar content */}
              <div className="w-60 bg-[#f8fbff] py-6 px-4 border-r border-[#dbe6f3] flex flex-col gap-2">
                {tabList.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(tab)}
                    className={`text-left text-sm px-4 py-2 rounded-lg font-medium transition-all ${
                      activeTab === tab
                        ? "bg-[#e1ebfc] text-[#2953a9]"
                        : "hover:bg-[#e1ebfc] text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="flex-1 px-10 py-8 bg-[#ffffff]">
                {activeTab === "Profile" && (
                  <>
                    {/* Profile Form */}
                    <form
                      className="grid grid-cols-1 md:grid-cols-1 gap-6"
                      onSubmit={handleUpdateInfo}
                    >
                      {/* Image */}
                      <div className="flex items-center justify-center gap-6">
                        <div className="relative group">
                          <img
                            src={
                              FormData.file instanceof File
                                ? URL.createObjectURL(FormData.file)
                                : FormData.file
                            }
                            className="w-28 h-28 rounded-full border-4 border-[#b6d2f6] object-cover shadow-lg"
                            alt="Avatar"
                          />
                          <input
                            type="file"
                            ref={imageRef}
                            accept="image/*"
                            className="absolute hidden inset-0 cursor-pointer"
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                file: e.target.files[0],
                              }))
                            }
                          />
                          <button
                            onClick={handleClick}
                            className="absolute w-10 h-10 cursor-pointer hover:bg-indigo-400 transition-all -bottom-0 -right-1 bg-indigo-500 text-white flex justify-center items-center rounded-full"
                          >
                            <LucideCamera />{" "}
                          </button>
                        </div>
                      </div>

                      {/* Full Name */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-[#1e3a8a] mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="First name"
                            value={FormData.fullName}
                            disabled={!isEditing.fullName}
                            className={`w-full pl-12 pr-10 py-2 rounded-xl text-gray-400 border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none ${
                              isEditing.fullName
                                ? "bg-indigo-50 text-gray-600"
                                : "bg-gray-100 cursor-not-allowed"
                            }`}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                fullName: e.target.value,
                              }))
                            }
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setIsEditing((prev) => ({
                                ...prev,
                                fullName: !prev.fullName,
                              }))
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500"
                          >
                            <Pencil size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Username */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-[#1e3a8a] mb-1">
                          Username *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="username"
                            value={FormData.username}
                            disabled={!isEditing.username}
                            className={`w-full pl-12 pr-10 py-2 rounded-xl text-gray-400 border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none ${
                              isEditing.username
                                ? "bg-indigo-50 text-gray-600"
                                : "bg-gray-100 cursor-not-allowed"
                            }`}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                username: e.target.value,
                              }))
                            }
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setIsEditing((prev) => ({
                                ...prev,
                                username: !prev.username,
                              }))
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500"
                          >
                            <Pencil size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-[#1e3a8a] mb-1">
                          Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            placeholder="example@gmail.com"
                            value={FormData.email}
                            disabled={!isEditing.email}
                            className={`w-full pl-12 pr-10 py-2 rounded-xl text-gray-400 border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none ${
                              isEditing.email
                                ? "bg-indigo-50 text-gray-600"
                                : "bg-gray-100 cursor-not-allowed"
                            }`}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                email: e.target.value,
                              }))
                            }
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setIsEditing((prev) => ({
                                ...prev,
                                email: !prev.email,
                              }))
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500"
                          >
                            <Pencil size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Password */}
                      <div className="relative">
                        <label className="block text-sm font-medium text-[#1e3a8a] mb-1">
                          Password *
                        </label>
                        <div className="relative">
                          <LockKeyholeIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={FormData.password}
                            disabled={!isEditing.password}
                            className={`w-full pl-12 pr-10 py-2 rounded-xl text-gray-400 border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none ${
                              isEditing.password
                                ? "bg-indigo-50 text-gray-600"
                                : "bg-gray-100 cursor-not-allowed"
                            }`}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                password: e.target.value,
                              }))
                            }
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex space-x-2">
                            <button
                              type="button"
                              onClick={() => setShowPassword((prev) => !prev)}
                              className="text-gray-400 hover:text-blue-500"
                            >
                              {showPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}{" "}
                            </button>
                            <hr className="border-r-2 border-gray-200 h-10 w-0" />
                            <button
                              type="button"
                              onClick={() =>
                                setIsEditing((prev) => ({
                                  ...prev,
                                  password: !prev.password,
                                }))
                              }
                              className="text-gray-400 hover:text-blue-500"
                            >
                              <Pencil size={18} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* update button */}
                      <Button
                        type={"submit"}
                        disabled={isFormDataEmpty || isUpdatingProfile}
                        isFormDataEmpty={isFormDataEmpty}
                        content={
                          <>
                            {" "}
                            {isUpdatingProfile ? (
                              <>
                                <Loader2 className="animate-spin" size={16} />
                                Updating Profile...
                              </>
                            ) : (
                              <>
                                Update Profile <ArrowRight size={18} />
                              </>
                            )}
                          </>
                        }
                        primaryColor={"bg-indigo-600"}
                        disabledColor={"bg-indigo-400"}
                      />
                    </form>
                  </>
                )}

                {activeTab === "Security" && (
                  <div className="rounded-lg space-y-6">
                    {/* Privacy Section */}
                    <div>
                      <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                        Privacy
                      </h2>
                      <div className="space-y-4">
                        {/* Account Private */}
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 font-medium">
                            Account Private{" "}
                            <span className="text-indigo-600">
                              (Enable this to avoid appearing in search results)
                            </span>
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={UpdatingPrivacy.accountPrivate}
                              onChange={() =>
                                setUpdatingPrivacy((prev) => ({
                                  ...prev,
                                  accountPrivate: !prev.accountPrivate,
                                }))
                              }
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-colors duration-300"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-5"></div>
                          </label>
                        </div>

                        {/* Online Status */}
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 font-medium">
                            Show Online Status{" "}
                            <span className="text-indigo-600">
                              (Enable this to hide online status from others)
                            </span>
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={UpdatingPrivacy.showOnlineStatus}
                              onChange={() =>
                                setUpdatingPrivacy((prev) => ({
                                  ...prev,
                                  showOnlineStatus: !prev.showOnlineStatus,
                                }))
                              }
                            />

                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-colors duration-300"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-5"></div>
                          </label>
                        </div>

                        {/* blocked messages */}
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 font-medium">
                            Block Unknown Messages{" "}
                            <span className="text-indigo-600">
                              (Enable this to avoid receiving unknown messages)
                            </span>
                          </span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={UpdatingPrivacy.blockUnknownMsg}
                              onChange={() =>
                                setUpdatingPrivacy((prev) => ({
                                  ...prev,
                                  blockUnknownMsg: !prev.blockUnknownMsg,
                                }))
                              }
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-colors duration-300"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-5"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <hr className="border-t border-gray-300" />

                    {/* Alerts Section */}
                    <div>
                      <h2 className="text-xl font-semibold text-blue-700 mb-2">
                        Alerts
                      </h2>
                      <div className="space-y-4">
                        {/* Login Alerts */}
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 font-medium">
                            Login Alerts{" "}
                            <span className="text-indigo-600">
                              (Enable this to receive alerts about logins from
                              unknown devices)
                            </span>
                          </span>

                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={UpdatingPrivacy.loginAlerts}
                              onChange={() =>
                                setUpdatingPrivacy((prev) => ({
                                  ...prev,
                                  loginAlerts: !prev.loginAlerts,
                                }))
                              }
                            />
                            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-colors duration-300"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 transform peer-checked:translate-x-5"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <hr className="border-t border-gray-300" />

                    <Button
                      type={"button"}
                      onClick={handleUpdateSecurity}
                      disabled={isUpdatingProfile}
                      isFormDataEmpty={isFormDataEmpty}
                      content={
                        <>
                          {" "}
                          {isUpdatingProfile ? (
                            <>
                              <Loader2 className="animate-spin" size={16} />
                              Updating Changes...
                            </>
                          ) : (
                            <>
                              Update Changes <ArrowRight size={18} />
                            </>
                          )}
                        </>
                      }
                      primaryColor={"bg-indigo-600"}
                      disabledColor={"bg-indigo-400"}
                    />
                  </div>
                )}

                {activeTab === "Activity" && (
                  <div className="rounded-lg space-y-6">
                    <h2 className="text-xl font-semibold text-indigo-700 mb-4">
                      User Activity
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                        <thead className="bg-indigo-50 text-indigo-700">
                          <tr className="divide-x divide-gray-200">
                            <th className="px-5 py-3 text-left text-sm border-b border-gray-200">
                              Username
                            </th>
                            <th className="px-5 py-3 text-left text-sm border-b border-gray-200">
                              Action
                            </th>
                            <th className="px-5 py-3 text-left text-sm border-b border-gray-200">
                              Performed At
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {authUserActivity.length > 0 ? (
                            authUserActivity.map((activity, index) => (
                              <tr
                                key={index}
                                className="divide-x divide-gray-200 hover:bg-gray-50"
                              >
                                <td className="px-5 py-3 text-gray-800 text-sm">
                                  {activity.username}
                                </td>
                                <td className="px-5 py-3 text-gray-800 text-sm">
                                  {activity.action}
                                </td>
                                <td className="px-5 py-3 text-gray-600 text-sm">
                                  {ConvertTime(activity.time)}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                className="px-5 py-3 text-center text-gray-500 text-sm"
                                colSpan="3"
                              >
                                No activity found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === "Verification" && (
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-lg">
                    <div>
                      <h2 className="text-xl font-semibold text-green-700 mb-1">
                        Verification Status
                      </h2>
                      <p className="text-gray-700">
                        {authUser.accountVerified ? (
                          <>
                            Your account is currently{" "}
                            <span className="text-green-700 font-semibold">
                              verified
                            </span>
                            .
                          </>
                        ) : (
                          <>
                            Your account is{" "}
                            <span className="text-red-600 font-semibold">
                              not verified
                            </span>
                            . Please verify your account.
                          </>
                        )}
                      </p>
                    </div>

                    <button
                      className={`${
                        authUser.accountVerified
                          ? "bg-green-200 text-green-800 cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-green-700"
                      } px-4 py-2 rounded-md text-sm font-medium transition`}
                      disabled={authUser.accountVerified}
                    >
                      {authUser.accountVerified
                        ? "Already Verified"
                        : "Verify Now"}
                    </button>
                  </div>
                )}

                {activeTab === "Account Deletion" && (
                  <div className="bg-white rounded-2xl max-w-2xl text-rose-600">
                    <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-rose-300">
                      Danger Zone
                    </h2>
                    <p className="mb-6 text-md font-medium leading-relaxed">
                      Deleting your account is{" "}
                      <span className="font-semibold">
                        permanent and irreversible
                      </span>
                      . All your data, messages, and settings will be{" "}
                      <span className="font-bold">permanently removed</span>.
                    </p>

                    <div className="space-y-6">
                      <label className="flex items-start gap-3 bg-red-50 p-4 rounded-xl border border-red-200">
                        <CheckBox
                          text={
                            <span className="text-sm font-medium">
                              I understand the consequences of deleting my
                              account and wish to proceed.
                            </span>
                          }
                          color="red"
                          agree={agree}
                          onChange={(e) => setAgree(e.target.checked)}
                        />
                      </label>

                      <button
                        type="button"
                        onClick={handleDeleteAccount}
                        className="bg-rose-600 flex justify-center items-center gap-2 hover:bg-rose-700 cursor-pointer text-white font-semibold text-sm px-6 py-3 rounded-xl transition duration-200 shadow-md hover:shadow-lg"
                      >
                        <>
                          {" "}
                          {isDeletingUser ? (
                            <>
                              <Loader2 className="animate-spin" size={16} />
                              Removing...
                            </>
                          ) : (
                            <>
                              Delete Account <ArrowRight size={18} />
                            </>
                          )}
                        </>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
      </main>
    </>
  );
};

export default SettingPage;
