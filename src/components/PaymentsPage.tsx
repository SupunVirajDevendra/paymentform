/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axios from "axios";
import DoctorDetails from "./DoctorDetails";
import CardPayment from "./CardPayment";

const PaymentsPage: React.FC = () => {
  const [patientID, setPatientID] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [appointmentData, setAppointmentData] = useState({
    doctorName: "",
    specialty: "",
    doctorFee: "",
    appointmentDate: "",
    patientName: "",
    contactNumber: "",
    serviceCharge: "",
    drugCharge: "",
    total: "",
  });

  const fetchDetails = async () => {
    if (!patientID) {
      setError("Please enter a patient ID");
      return;
    }

    setLoading(true);
    setError("");

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:8082/rest-app/appointments/${patientID}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.request(config);
      if (response.data) {
        setAppointmentData({
          ...response.data,
          total: calculateTotal(response.data),
        });
      }
    } catch (err: any) {
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message || err.response.data}`);
      } else if (err.request) {
        setError("No response received from the server.");
      } else {
        setError(`Failed to fetch appointment details: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (data: any) => {
    const fee = parseFloat(data.doctorFee || "0");
    const service = parseFloat(data.serviceCharge || "0");
    const drug = parseFloat(data.drugCharge || "0");
    return `$${(fee + service + drug).toFixed(2)}`;
  };

  return (
    <div className="h-screen bg-gray-100 px-10 py-12 flex justify-center items-center flex-col">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="w-full max-w-screen-xl flex flex-row gap-8">
        <div className="w-1/2">
          <DoctorDetails
            data={appointmentData}
            patientID={patientID}
            setPatientID={setPatientID}
            fetchDetails={fetchDetails}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-6">
          {loading ? (
            <div>Loading...</div>
          ) : (
          <CardPayment
            appointmentId={patientID}
            doctorFee={appointmentData.doctorFee}
            serviceCharge={appointmentData.serviceCharge}
            drugCharge={appointmentData.drugCharge}
          />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
