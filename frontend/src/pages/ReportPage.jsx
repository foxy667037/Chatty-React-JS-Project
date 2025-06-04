import Navbar from "../components/Navbar";
import { SideBar } from "../components/SideBar";
import { BarChart2 } from "lucide-react";
import Button from "../components/Button.jsx";
import { Loader2, ArrowRight } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";

const ReportPage = () => {
  const isSendingReport = false;
  const username = useAuthStore().authUser?.username;

  const slideDown = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex">
        <SideBar />
        <div className="w-full h-full py-8 pl-10 pr-12 rounded-tl-2xl -ml-8 bg-gradient-to-br from-gray-100 to-blue-50 ">
          <h1 className="text-3xl font-semibold text-indigo-700 mb-6 flex gap-2 items-center">
            <BarChart2 size={28} /> Report{" "}
            <span className="text-indigo-800">Page</span>
          </h1>

          <div className="bg-white shadow-2xl border border-gray-200 rounded-2xl p-8 w-full">
            <motion.form
              variants={slideDown}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-blue-700 mb-2">
                  Upload Evidence (Optional)
                </label>
                <label className="w-full flex items-center font-semibold justify-center px-4 py-8 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 bg-indigo-50 hover:bg-indigo-100 cursor-pointer transition">
                  <input type="file" accept="image/*" className="hidden" />
                  Click to upload image (optional)
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Your Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={username}
                  disabled
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-indigo-50 text-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Reported Username
                </label>
                <input
                  type="text"
                  placeholder="Enter reported user's name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-indigo-50 text-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the issue briefly"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-indigo-50 text-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                ></textarea>
              </div>

              <div>
                <Button
                  type={"button"}
                  disabled={false}
                  isFormDataEmpty={false}
                  content={
                    <>
                      {" "}
                      {isSendingReport ? (
                        <>
                          <Loader2 className="animate-spin" size={16} />
                          Sending Report...
                        </>
                      ) : (
                        <>
                          Send Report <ArrowRight size={18} />
                        </>
                      )}
                    </>
                  }
                  primaryColor={"bg-indigo-600"}
                  disabledColor={"bg-indigo-400"}
                />
              </div>
            </motion.form>
          </div>
        </div>
      </main>
    </>
  );
};

export default ReportPage;
