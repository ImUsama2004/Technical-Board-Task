import React, { useState, useEffect } from "react";

const Step4Building = ({ nextStep, prevStep, formData, setFormData }) => {
  const [ownership, setOwnership] = useState(formData.ownership || "");
  const [classrooms, setClassrooms] = useState(formData.classrooms || "");
  const [isEquipped, setIsEquipped] = useState(formData.isEquipped || false);
  const [hasLight, setHasLight] = useState(formData.hasLight || false);
  const [layoutFile, setLayoutFile] = useState(formData.layoutFile || null);
  const [leaseFile, setLeaseFile] = useState(formData.leaseFile || null);
  const [isValid, setIsValid] = useState(false);

  // ✅ Real-time validation
  useEffect(() => {
    let valid = false;

    if (ownership === "Own") {
      valid = classrooms && layoutFile && isEquipped && hasLight;
    } else if (ownership === "Leased") {
      valid = classrooms && layoutFile && leaseFile && isEquipped && hasLight;
    }

    setIsValid(valid);
  }, [ownership, classrooms, layoutFile, leaseFile, isEquipped, hasLight]);

  const handleNext = () => {
    if (!isValid) return;
    setFormData({
      ...formData,
      ownership,
      classrooms,
      isEquipped,
      hasLight,
      layoutFile,
      leaseFile,
    });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        Step 4: Building Details
      </h2>

      <div className="space-y-5">
        {/* Building Ownership */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Building Ownership <span className="text-red-500">*</span>
          </label>
          <select
            value={ownership}
            onChange={(e) => {
              setOwnership(e.target.value);
              if (e.target.value === "Own") setLeaseFile(null); // Reset lease file
            }}
            className="w-full border rounded p-2"
          >
            <option value="">Select</option>
            <option value="Own">Own</option>
            <option value="Leased">Leased</option>
          </select>
        </div>

        {/* Classrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Classrooms <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="1"
            placeholder="Enter number of classrooms"
            value={classrooms}
            onChange={(e) => setClassrooms(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Checkboxes */}
        <div className="flex flex-col sm:flex-row gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isEquipped}
              onChange={() => setIsEquipped(!isEquipped)}
            />
            Properly Equipped Classrooms <span className="text-red-500">*</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hasLight}
              onChange={() => setHasLight(!hasLight)}
            />
            Fitted with Electric Light <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Building Layout File */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Building Layout Plan (PDF/Image){" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setLayoutFile(e.target.files[0])}
            className="block w-full border rounded p-2"
          />
          {layoutFile && (
            <p className="text-green-600 text-sm mt-1">
              ✅ File Uploaded: {layoutFile.name}
            </p>
          )}
        </div>

        {/* Lease File (Conditional) */}
        {ownership === "Leased" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Lease Agreement (PDF) <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setLeaseFile(e.target.files[0])}
              className="block w-full border rounded p-2"
            />
            {leaseFile && (
              <p className="text-green-600 text-sm mt-1">
                ✅ File Uploaded: {leaseFile.name}
              </p>
            )}
          </div>
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

export default Step4Building;
