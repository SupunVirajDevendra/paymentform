import React from "react";
import { motion } from "framer-motion";

const Navbar: React.FC<{ setView: (view: string) => void }> = ({ setView }) => {
  const navItems = ["Home", "About", "Services", "Payments"];

  return (
    <motion.nav
      className="w-full bg-white shadow-md py-4 px-6 flex items-center justify-between text-black"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-xl font-bold tracking-wide">DoctorAppointments</div>
      <div className="flex gap-4">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setView(item.toLowerCase())}
            className="px-4 py-2 rounded hover:bg-gray-100 transition duration-300 text-sm font-medium"
          >
            {item}
          </button>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
