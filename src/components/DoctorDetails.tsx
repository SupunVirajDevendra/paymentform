import React from "react";
import { motion } from "framer-motion";

interface AppointmentData {
  doctorName: string;
  specialty: string;
  doctorFee: string;
  appointmentDate: string;
  patientName: string;
  contactNumber: string;
  serviceCharge: string;
  drugCharge: string;
  total: string;
}

interface Props {
  data: AppointmentData;
  setPatientID: React.Dispatch<React.SetStateAction<string>>;
  fetchDetails: () => void;
  patientID: string;
}

const DoctorDetails: React.FC<Props> = ({
  data,
  setPatientID,
  fetchDetails,
  patientID,
}) => {
  return (
    <motion.div
      className="w-full h-full bg-white rounded-xl shadow-lg p-10 flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Input Section */}
      <div className="mb-8 border-b pb-4">
        <label
          htmlFor="appointmentId"
          className="block mb-2 text-base font-medium text-gray-700"
        >
          Enter Appointment ID:
        </label>
        <div className="flex">
          <input
            type="text"
            id="appointmentId"
            placeholder="Appointment ID"
            value={patientID}
            onChange={(e) => setPatientID(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 text-base rounded-l-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
          />
          <button
            onClick={fetchDetails}
            className="bg-black text-white px-5 py-2 text-base font-medium rounded-r-md hover:bg-gray-800 transition-all duration-300"
          >
            Fetch Details
          </button>
        </div>
      </div>

      {/* Appointment Details */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
          Appointment Details
        </h2>

        <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-gray-700 text-base">
          <div>
            <div className="font-medium mb-1">Doctor Name:</div>
            <div>{data.doctorName}</div>
          </div>
          <div>
            <div className="font-medium mb-1">Specialty:</div>
            <div>{data.specialty}</div>
          </div>
          <div>
            <div className="font-medium mb-1">Doctor Fee:</div>
            <div>{data.doctorFee}</div>
          </div>
          <div>
            <div className="font-medium mb-1">Appointment Date:</div>
            <div>{data.appointmentDate}</div>
          </div>
          <div>
            <div className="font-medium mb-1">Patient Name:</div>
            <div>{data.patientName}</div>
          </div>
          <div>
            <div className="font-medium mb-1">Contact Number:</div>
            <div>{data.contactNumber}</div>
          </div>
          <div>
            <div className="font-medium mb-1">Service Charge:</div>
            <div>{data.serviceCharge}</div>
          </div>
          <div>
            <div className="font-medium mb-1">Drug Charge:</div>
            <div>{data.drugCharge}</div>
          </div>
          <div className="col-span-2">
            <div className="font-medium mb-1">Total:</div>
            <div className="font-semibold">{data.total}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorDetails;
