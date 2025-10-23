import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex bg-[#F9F9F9] text-gray-800 relative pt-[80px]">
      
      <div className="hidden md:block fixed top-[80px] left-0 h-[calc(100vh-80px)] z-30">
        <AdminSidebar />
      </div>

      
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg md:hidden"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-[#B3122D]"
              >
                <X size={26} />
              </button>
            </div>
            <AdminSidebar />
          </motion.aside>
        )}
      </AnimatePresence>

      
      <main
        className="
          flex-1 md:ml-64 p-6 sm:p-8 transition-all duration-300
          min-h-[calc(100vh-80px)] overflow-y-auto
        "
      >
        
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed top-[90px] left-4 z-40 bg-[#B3122D] text-white p-2 rounded-lg shadow-lg"
        >
          <Menu size={22} />
        </button>

        {children}
      </main>

      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}


