import React, { useState } from "react";
import DoctorDetails from "./DoctorDetails";
import PaymentDetails from "./PaymentDetails";
import CardPayment from "./CardPayment";

const PaymentsPage: React.FC = () => {
  const [patientID, setPatientID] = useState("");
  const [appointmentData, setAppointmentData] = useState({
    doctorName: "Dr. John Doe",
    specialty: "Cardiology",
    doctorFee: "$100",
    appointmentDate: "2025-04-01",
    patientName: "Jane Smith",
    contactNumber: "123-456-7890",
    serviceCharge: "$20",
    drugCharge: "$50",
    total: "$170",
  });

  const fetchDetails = () => {
    console.log("Fetch details for", patientID);
  };

  return (
    <div className="h-screen bg-gray-100 px-10 py-12 flex justify-center items-center flex-col">
      <div className="w-full max-w-screen-xl flex flex-row gap-8">
        {/* Left Column */}
        <div className="w-1/2">
          <DoctorDetails
            data={appointmentData}
            patientID={patientID}
            setPatientID={setPatientID}
            fetchDetails={fetchDetails}
          />
        </div>

        {/* Right Column */}
        <div className="w-1/2 flex flex-col gap-6">
          <PaymentDetails data={appointmentData} />
          <CardPayment />
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
