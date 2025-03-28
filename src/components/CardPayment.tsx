/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import jsPDF from "jspdf";

interface CardPaymentProps {
  appointmentId: string;
  doctorFee: string;
  serviceCharge: string;
  drugCharge: string;
}

const CardPayment: React.FC<CardPaymentProps> = ({
  appointmentId,
  doctorFee,
  serviceCharge,
  drugCharge,
}) => {
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [successData, setSuccessData] = useState<any>(null);
  const [useMock, setUseMock] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = { cardholderName: "", cardNumber: "", expiryDate: "", cvv: "" };

    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder's name is required.";
    }
    if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s+/g, ""))) {
      newErrors.cardNumber = "Invalid card number.";
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Invalid expiry date.";
    }
    if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "Invalid CVV.";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleConfirm = async () => {
    setIsModalOpen(false);
    setIsSubmitting(true);

    const paymentData = {
      appoinmentId: Number(appointmentId),
      paymentStatus: "PENDING",
      paymentType: "VISA",
      doctorCharges: parseFloat(doctorFee),
      serviceCharges: parseFloat(serviceCharge),
      drugCharges: parseFloat(drugCharge),
    };

    try {
      const response = useMock
        ? { data: { id: 2, ...paymentData, appointmentdata: null } }
        : await axios.post("http://localhost:9001/payment/v1/pay", paymentData, {
            headers: { "Content-Type": "application/json" },
          });

      setSuccessData(response.data);
      toast.success("Payment successful!");
      setFormData({ cardholderName: "", cardNumber: "", expiryDate: "", cvv: "" });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsModalOpen(true);
    }
  };

  const handleDownloadReceipt = () => {
    if (!successData) return;
    const doc = new jsPDF();
    doc.text("Payment Receipt", 20, 20);
    doc.text(`Payment ID: ${successData.id}`, 20, 30);
    doc.text(`Appointment ID: ${successData.appoinmentId}`, 20, 40);
    doc.text(`Status: ${successData.paymentStatus}`, 20, 50);
    doc.text(`Doctor Charges: $${successData.doctorCharges}`, 20, 60);
    doc.text(`Service Charges: $${successData.serviceCharges}`, 20, 70);
    doc.text(`Drug Charges: $${successData.drugCharges}`, 20, 80);
    doc.save("payment-receipt.pdf");
  };

  return (
    <motion.div
      className="w-full bg-white rounded-xl shadow-md p-6 font-light text-black mt-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <ToastContainer />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirm Payment"
        className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40"
      >
        <h2 className="text-lg font-semibold mb-4">Confirm Payment</h2>
        <p>Are you sure you want to make this payment?</p>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 border rounded-md text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Confirm
          </button>
        </div>
      </Modal>

      <h2 className="text-lg font-semibold mb-4">Card Details</h2>

      <div className="mb-4">
        <label className="text-sm mr-2">
          <input
            type="checkbox"
            checked={useMock}
            onChange={() => setUseMock(!useMock)}
            className="mr-1"
          />
          Use Mock Response
        </label>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm">Cardholder's Name</label>
          <input
            type="text"
            name="cardholderName"
            value={formData.cardholderName}
            onChange={handleInputChange}
            className="border rounded-md p-2 w-full"
          />
          {errors.cardholderName && <p className="text-red-500 text-xs">{errors.cardholderName}</p>}
        </div>

        <div>
          <label className="block text-sm">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            className="border rounded-md p-2 w-full"
            placeholder="1234 5678 9012 3456"
          />
          {errors.cardNumber && <p className="text-red-500 text-xs">{errors.cardNumber}</p>}
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm">Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
              placeholder="MM/YY"
            />
            {errors.expiryDate && <p className="text-red-500 text-xs">{errors.expiryDate}</p>}
          </div>

          <div className="w-1/2">
            <label className="block text-sm">CVV</label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              className="border rounded-md p-2 w-full"
              placeholder="123"
            />
            {errors.cvv && <p className="text-red-500 text-xs">{errors.cvv}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-black text-white w-full py-2 rounded-md transition-all duration-300 shadow-sm ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"}`}
        >
          {isSubmitting ? "Processing..." : "Make Payment"}
        </button>

        {successData && (
          <div className="text-green-600 text-sm mt-4 space-y-1">
            <p>Payment ID: {successData.id}</p>
            <p>Appointment ID: {successData.appoinmentId}</p>
            <p>Status: {successData.paymentStatus}</p>
            <p>Doctor Charges: ${successData.doctorCharges}</p>
            <p>Service Charges: ${successData.serviceCharges}</p>
            <p>Drug Charges: ${successData.drugCharges}</p>
            <button
              onClick={handleDownloadReceipt}
              className="mt-4 underline text-blue-600 text-sm hover:text-blue-800"
            >
              Download Receipt (PDF)
            </button>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-4">
          <img src="https://img.icons8.com/color/48/000000/visa.png" alt="visa" className="w-10 h-6" />
          <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="mastercard" className="w-10 h-6" />
          <img src="https://img.icons8.com/color/48/000000/amex.png" alt="amex" className="w-10 h-6" />
        </div>
      </form>
    </motion.div>
  );
};

export default CardPayment;