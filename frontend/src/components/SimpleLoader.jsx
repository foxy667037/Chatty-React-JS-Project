import { MessageCircle, Loader2 } from "lucide-react";

const SimpleLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-br from-purple-50 to-indigo-100 animate-bgTransition relative overflow-hidden">
      <MessageCircle
        size={96}
        className="absolute top-10 right-10 text-indigo-300 animate-bounce opacity-30"
      />

      <div className="w-16 h-16 border-4 border-indigo-600 border-dashed rounded-full animate-spin flex items-center justify-center">
        <Loader2 className="text-indigo-600 animate-spin" size={24} />
      </div>

      <div className="mt-4 text-lg text-indigo-600 font-medium">Loading...</div>
    </div>
  );
};

export default SimpleLoader;
