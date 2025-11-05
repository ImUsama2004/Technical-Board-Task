import React, { useState, useEffect } from "react";

const Step2Staff = ({ nextStep, prevStep, formData, setFormData }) => {
  const [staffAttached, setStaffAttached] = useState(formData.staffAttached || "");
  const [staffFile, setStaffFile] = useState(formData.staffFile || null);
  const [noStatementPlan, setNoStatementPlan] = useState(formData.noStatementPlan || "");
  const [writtenAgreement, setWrittenAgreement] = useState(formData.writtenAgreement || "");
  const [agreementFile, setAgreementFile] = useState(formData.agreementFile || null);
  const [salaryFile, setSalaryFile] = useState(formData.salaryFile || null);
  const [isValid, setIsValid] = useState(false);

  // ✅ Real-time validation logic
  useEffect(() => {
    let valid = false;

    if (staffAttached === "Yes") {
      valid =
        staffFile &&
        writtenAgreement &&
        (writtenAgreement === "No" || (writtenAgreement === "Yes" && agreementFile)) &&
        salaryFile;
    } else if (staffAttached === "No") {
      valid =
        noStatementPlan.trim() !== "" &&
        writtenAgreement &&
        (writtenAgreement === "No" || (writtenAgreement === "Yes" && agreementFile)) &&
        salaryFile;
    }

    setIsValid(valid);
  }, [
    staffAttached,
    staffFile,
    noStatementPlan,
    writtenAgreement,
    agreementFile,
    salaryFile,
  ]);

  const handleNext = () => {
    if (!isValid) return;
    setFormData({
      ...formData,
      staffAttached,
      staffFile,
      noStatementPlan,
      writtenAgreement,
      agreementFile,
      salaryFile,
    });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        Step 2: Staff / Trade Experts
      </h2>

      {/* i. Staff statement */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">
          i. Staff statement showing their qualification and number on prescribed form be attached{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-6 mb-3">
          <label>
            <input
              type="radio"
              value="Yes"
              checked={staffAttached === "Yes"}
              onChange={(e) => setStaffAttached(e.target.value)}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="No"
              checked={staffAttached === "No"}
              onChange={(e) => setStaffAttached(e.target.value)}
            />{" "}
            No
          </label>
        </div>

        {staffAttached === "Yes" && (
          <div className="mb-4">
            <label className="block mb-2">
              Upload Staff Statement (PDF/Excel) <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept=".pdf,.xlsx"
              onChange={(e) => setStaffFile(e.target.files[0])}
              className="block w-full border rounded p-2"
            />
            {staffFile && (
              <p className="text-green-600 text-sm mt-1">
                ✅ File Uploaded: {staffFile.name}
              </p>
            )}
          </div>
        )}

        {staffAttached === "No" && (
          <div className="mb-4">
            <label className="block mb-2">
              ii. If no statement has been supplied, what does the institution propose to appoint?
              <span className="text-red-500">*</span>
            </label>
            <textarea
              value={noStatementPlan}
              onChange={(e) => setNoStatementPlan(e.target.value)}
              rows="3"
              placeholder="Describe proposed plan..."
              className="w-full border rounded p-2"
            ></textarea>
          </div>
        )}
      </div>

      {/* iii. Written agreement */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">
          iii. Are the teachers employed on written agreement? If so, produce a copy of the same.{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-6 mb-3">
          <label>
            <input
              type="radio"
              value="Yes"
              checked={writtenAgreement === "Yes"}
              onChange={(e) => setWrittenAgreement(e.target.value)}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="No"
              checked={writtenAgreement === "No"}
              onChange={(e) => setWrittenAgreement(e.target.value)}
            />{" "}
            No
          </label>
        </div>

        {writtenAgreement === "Yes" && (
          <div>
            <label className="block mb-2">
              Upload Agreement Copy (PDF/Image) <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={(e) => setAgreementFile(e.target.files[0])}
              className="block w-full border rounded p-2"
            />
            {agreementFile && (
              <p className="text-green-600 text-sm mt-1">
                ✅ File Uploaded: {agreementFile.name}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Salary statement */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">
          Attached statement showing salary scales of pay and allowances prescribed for the teachers{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          accept=".pdf,.xlsx"
          onChange={(e) => setSalaryFile(e.target.files[0])}
          className="block w-full border rounded p-2"
        />
        {salaryFile && (
          <p className="text-green-600 text-sm mt-1">
            ✅ File Uploaded: {salaryFile.name}
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!isValid}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
            isValid
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2Staff;
