import React from "react";

interface Props {
  data: {
    doctorFee: string;
    serviceCharge: string;
    drugCharge: string;
    total: string;
  };
}

const PaymentDetails: React.FC<Props> = ({ data }) => {
  return (
    <div className="overflow-hidden w-full bg-white rounded-xl shadow-md p-6 font-light text-black">
      <h2 className="text-lg font-semibold mb-4">Payment Summary</h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Doctor Fees:</span>
          <span>{data.doctorFee}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Charge:</span>
          <span>{data.serviceCharge}</span>
        </div>
        <div className="flex justify-between">
          <span>Drug Charge:</span>
          <span>{data.drugCharge}</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-medium text-base">
          <span>Total:</span>
          <span>{data.total}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
