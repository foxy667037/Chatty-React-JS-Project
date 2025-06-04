import { Link } from "react-router";
import { motion } from "framer-motion";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import { AlertTriangle, ArrowLeft, Ghost } from "lucide-react";

const NotFoundPage = () => {
  return (
    <>
    <Header/>
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 px-4">
      <motion.div
        className="max-w-md text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Ghost className="mx-auto text-indigo-600" size={72} />
        </motion.div>

        <motion.h1
          className="text-6xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          404
        </motion.h1>

        <motion.h2
          className="text-2xl font-semibold text-indigo-600 mb-2 flex justify-center items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <AlertTriangle size={28} />
          Page Not Found
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Oops! The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition duration-200 shadow-md"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </main>
    <Footer/>
    </>
  );
};

export default NotFoundPage;
