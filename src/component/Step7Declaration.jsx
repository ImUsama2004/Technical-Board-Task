import React, { useState, useEffect } from "react";

const Step7Declaration = ({ prevStep, formData }) => {
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const [partners, setPartners] = useState([
    { name: "", cnic: "", signature: null },
    { name: "", cnic: "", signature: null }, // Partner 2 (optional)
  ]);

  const [isValid, setIsValid] = useState(false);

  const handlePartnerChange = (index, field, value) => {
    const updated = [...partners];
    if (field === "cnic") {
      // Allow only digits and max 13 characters
      if (!/^\d*$/.test(value)) return;
      if (value.length > 13) return;
    }
    updated[index][field] = value;
    setPartners(updated);
  };

  // ✅ Real-time validation (Partner 1 required, Partner 2 optional)
  useEffect(() => {
    const partner1 = partners[0];
    const partner1Valid =
      partner1.name && partner1.cnic.length === 13 && partner1.signature;

    const allRequired = partner1Valid && place && date && confirmed;

    setIsValid(allRequired);
  }, [partners, place, date, confirmed]);

  const handleSubmit = () => {
    console.log("✅ Final Submitted Data:", {
      ...formData,
      partners,
      place,
      date,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        Step 7: Declaration & Partners Information
      </h2>

      {/* Partners Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm bg-gray-50"
          >
            <h3 className="font-semibold text-lg mb-3 text-indigo-600">
              Partner - 0{index + 1}{" "}
              {index === 0 && <span className="text-red-500">*</span>}
              {index === 1 && (
                <span className="text-gray-500 text-sm">(Optional)</span>
              )}
            </h3>

            {/* Partner Name */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name {index === 0 && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                value={partner.name}
                onChange={(e) =>
                  handlePartnerChange(index, "name", e.target.value)
                }
                className="w-full border rounded p-2"
                placeholder="Enter name"
              />
            </div>

            {/* CNIC */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                C.N.I.C (13 digits)
                {index === 0 && <span className="text-red-500">*</span>}
              </label>
              <input
                type="text"
                value={partner.cnic}
                onChange={(e) =>
                  handlePartnerChange(index, "cnic", e.target.value)
                }
                maxLength={13}
                className={`w-full border rounded p-2 ${
                  partner.cnic && partner.cnic.length !== 13
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Enter 13-digit CNIC"
              />
              {partner.cnic && partner.cnic.length !== 13 && (
                <p className="text-sm text-red-500">
                  CNIC must contain exactly 13 digits.
                </p>
              )}
            </div>

            {/* Signature */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Signature {index === 0 && <span className="text-red-500">*</span>}
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) =>
                  handlePartnerChange(index, "signature", e.target.files[0])
                }
                className="block w-full text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
              />
              {partner.signature && (
                <p className="text-green-600 text-sm mt-1">
                  ✅ File uploaded: {partner.signature.name}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Declaration Section */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Final Declaration
      </h3>

      {/* Place */}
      <label className="block mb-1 font-medium text-gray-700">
        Place <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        placeholder="Enter place"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
        className="w-full border rounded p-2 mb-3"
      />

      {/* Date */}
      <label className="block mb-1 font-medium text-gray-700">
        Date <span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border rounded p-2 mb-3"
      />

      {/* Confirm Checkbox */}
      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={() => setConfirmed(!confirmed)}
        />
        <span>
          I confirm that the above information is correct.
          <span className="text-red-500">*</span>
        </span>
      </label>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Previous
        </button>

        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
            isValid
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step7Declaration;
