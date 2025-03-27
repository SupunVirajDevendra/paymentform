import React from "react";
import { motion } from "framer-motion";

const CardPayment: React.FC = () => {
  return (
    <motion.div
      className="w-full bg-white rounded-xl shadow-md p-6 font-light text-black mt-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-lg font-semibold mb-4">Card Payment</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm">Cardholder's Name</label>
          <input
            type="text"
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-black text-sm transition hover:shadow"
          />
        </div>
        <div>
          <label className="block text-sm">Card Number</label>
          <input
            type="text"
            className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-black text-sm transition hover:shadow"
          />
        </div>
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm">Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-black text-sm transition hover:shadow"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm">CVV</label>
            <input
              type="text"
              className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-black text-sm transition hover:shadow"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded-md hover:bg-gray-800 transition-all duration-300 shadow-sm"
        >
          Make Payment
        </button>
        <div className="flex justify-center gap-4 mt-4">
          <img
            src="https://img.icons8.com/color/48/000000/visa.png"
            alt="visa"
            className="w-10 h-6"
          />
          <img
            src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
            alt="mastercard"
            className="w-10 h-6"
          />
          <img
            src="https://img.icons8.com/color/48/000000/amex.png"
            alt="amex"
            className="w-10 h-6"
          />
        </div>
      </form>
    </motion.div>
  );
};

export default CardPayment;
