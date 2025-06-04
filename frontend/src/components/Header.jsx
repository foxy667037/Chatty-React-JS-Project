const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 text-white py-5 px-5 w-full shadow-md">
      <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img
          src="/logo/chat_309666.png"
          alt="Logo"
          className="w-10 h-10 object-contain"
        />
        <div className="flex gap-0.5 flex-col">
          <h1 className="text-2xl font-medium transition-all font-sans bg-gradient-to-br from-purple-600 to-indigo-400 bg-clip-text text-transparent flex items-center gap-2 hover:drop-shadow-sm">
            Chatty
          </h1>
          <p className="text-xs text-gray-500 leading-3">
            Connect. Chat. Chill.
          </p>
        </div>
      </div>

        <div className="flex space-x-10 text-sm">
          <a
            href="/contact-us"
            className="text-[16px] font-medium text-indigo-600 transition-all hover:text-indigo-800 hover:underline"
          >
            📞 Contact Us
          </a>
          <a
            href="/privacy-policy"
            className="text-[16px] font-medium text-indigo-600 transition-all hover:text-indigo-800 hover:underline"
          >
            🔒 Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="text-[16px] font-medium text-indigo-600 transition-all hover:text-indigo-800 hover:underline"
          >
            📃 Terms of Service
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
