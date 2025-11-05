import React, { useState, useEffect } from "react";

const Step3Finance = ({ nextStep, prevStep, formData, setFormData }) => {
  const [data, setData] = useState({
    endowment: formData.endowment || "",
    balance: formData.balance || "",
    incomeSources: formData.incomeSources || "",
    expectedIncome: formData.expectedIncome || "",
    expenditure: formData.expenditure || "",
    financeFile: formData.financeFile || null,
  });

  const [isValid, setIsValid] = useState(false);

  // ✅ Real-time validation: all fields are now mandatory
  useEffect(() => {
    const valid =
      data.endowment.trim() !== "" &&
      data.balance.trim() !== "" &&
      data.incomeSources.trim() !== "" &&
      data.expectedIncome.trim() !== "" &&
      data.expenditure.trim() !== "" &&
      data.financeFile !== null;
    setIsValid(valid);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Restrict numeric-only inputs for money-related fields
    if (["endowment", "balance", "expectedIncome", "expenditure"].includes(name)) {
      if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
        setData({ ...data, [name]: value });
      }
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleNext = () => {
    if (!isValid) return;
    setFormData({ ...formData, ...data });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        Step 3: Finance Information
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount in Endowment Fund <span className="text-red-500">*</span>
          </label>
          <input
            name="endowment"
            type="number"
            placeholder="Enter amount in PKR"
            value={data.endowment}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Balance Available <span className="text-red-500">*</span>
          </label>
          <input
            name="balance"
            type="number"
            placeholder="Enter available balance in PKR"
            value={data.balance}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sources of Annual Income <span className="text-red-500">*</span>
          </label>
          <textarea
            name="incomeSources"
            placeholder="Mention your annual income sources (e.g., fees, donations, etc.)"
            value={data.incomeSources}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded p-2"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Annual Income from Fees <span className="text-red-500">*</span>
          </label>
          <input
            name="expectedIncome"
            type="number"
            placeholder="Enter expected income in PKR"
            value={data.expectedIncome}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estimated Annual Expenditure <span className="text-red-500">*</span>
          </label>
          <input
            name="expenditure"
            type="number"
            placeholder="Enter expected expenditure in PKR"
            value={data.expenditure}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Upload Financial Document (PDF) <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setData({ ...data, financeFile: e.target.files[0] })}
            className="block w-full border rounded p-2"
            required
          />
          {data.financeFile && (
            <p className="text-sm text-green-600 mt-1">
              ✅ File Uploaded: {data.financeFile.name}
            </p>
          )}
        </div>
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

export default Step3Finance;
