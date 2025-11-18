import React, { useState, useEffect } from "react";

const Step1Institute = ({ nextStep, formData, setFormData }) => {
  const [data, setData] = useState({
    name: formData.name || "",
    address: formData.address || "",
    trade: formData.trade || "",
    startDate: formData.startDate || "",
  });

  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const valid =
      data.name.trim() !== "" &&
      data.address.trim() !== "" &&
      data.trade.trim() !== "" &&
      data.startDate.trim() !== "";
    setIsValid(valid);
  }, [data]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleNext = async () => {
    if (!isValid) return;

    try {
      setLoading(true);

      // Merge form data before sending
      const mergedData = { ...formData, ...data };

      // ✅ API call to backend
      const res = await fetch("http://localhost:5000/api/general", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mergedData),
      });

      if (!res.ok) throw new Error("Failed to submit institute info");

      const responseData = await res.json();

      // Optionally store backend response if needed
      setFormData({ ...mergedData, id: responseData.id });

      // Go to next step
      nextStep();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        Step 1: Institute Information
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Institute Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter institute name"
            value={data.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            placeholder="Enter address"
            value={data.address}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trade Required <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="trade"
            placeholder="Enter trade required"
            value={data.trade}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="startDate"
            value={data.startDate}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleNext}
          disabled={!isValid || loading}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
            isValid && !loading
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {loading ? "Submitting..." : "Next"}
        </button>
      </div>
    </>
  );
};

export default Step1Institute;
