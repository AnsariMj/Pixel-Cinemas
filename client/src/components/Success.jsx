import jsPDF from "jspdf";
import "jspdf-autotable";
import QRCode from "qrcode.react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const navigate = useNavigate();

  const status = params.get("status");
  const amount = params.get("amount");

  // Adjusted amount (divided by 100)
  const adjustedAmount = amount / 100;

  const [qrCodeData, setQRCodeData] = useState("");

  useEffect(() => {
    // Generate QR code data using the adjusted amount
    const qrData = `${status}-${adjustedAmount}`;
    setQRCodeData(qrData);
  }, [status, adjustedAmount]);

  const goToHomePage = () => {
    // Redirect to the home page
    navigate("/");
  };

  const downloadPDF = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Add content to the PDF
    pdf.text("Payment Success!", 20, 20);
    pdf.text("Status: " + status, 20, 30);
    pdf.text("Amount: " + adjustedAmount, 20, 40);

    // Generate a data URL for the QR code image
    const qrDataURL = document.getElementById("qrCodeImage").toDataURL("image/jpeg");

    // Add the QR code image to the PDF
    pdf.addImage(qrDataURL, "JPEG", 20, 50, 50, 50);

    // Save the PDF
    pdf.save(`Payment_Success_${status}_${adjustedAmount}.pdf`);
  };

  return (
    <>
      {/* Webpage Content */}
      <div className="  lg:mx-52 sm:m-36 bg-blue-600  rounded-3xl p-10 text-center mt-8">
        <h1 className="text-4xl">Payment Success!</h1>

        {/* Display the generated QR code */}
        <div className="my-8">
          <QRCode id="qrCodeImage" className="mx-auto" value={qrCodeData} />
        </div>

        {/* Details Section */}
        <div className="text-white">
          <p>Status: {status}</p>
          <p>Amount: {adjustedAmount}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            className="bg-gray-800 rounded-lg text-white px-4 py-2"
            onClick={downloadPDF}
          >
            Download as PDF
          </button>
          <button
            className="bg-gray-800 rounded-lg text-white px-4 py-2"
            onClick={goToHomePage}
          >
            Go to Home Page
          </button>
        </div>
      </div>
    </>
  );
};

export default Success;
