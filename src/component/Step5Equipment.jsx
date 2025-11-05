import React, { useState, useEffect } from "react";

const Step5Equipment = ({ nextStep, prevStep, formData, setFormData }) => {
  const [labFile, setLabFile] = useState(formData.labFile || null);
  const [tradeFile, setTradeFile] = useState(formData.tradeFile || null);
  const [libraryFile, setLibraryFile] = useState(formData.libraryFile || null);
  const [budgetFile, setBudgetFile] = useState(formData.budgetFile || null);

  const [labText, setLabText] = useState(formData.labText || "");
  const [tradeText, setTradeText] = useState(formData.tradeText || "");
  const [libraryText, setLibraryText] = useState(formData.libraryText || "");
  const [budgetText, setBudgetText] = useState(formData.budgetText || "");

  const [isValid, setIsValid] = useState(false);

  // ✅ Real-time validation: each section must have either file OR text
  useEffect(() => {
    const validLab = labFile || labText.trim() !== "";
    const validTrade = tradeFile || tradeText.trim() !== "";
    const validLibrary = libraryFile || libraryText.trim() !== "";
    const validBudget = budgetFile || budgetText.trim() !== "";

    setIsValid(validLab && validTrade && validLibrary && validBudget);
  }, [
    labFile,
    tradeFile,
    libraryFile,
    budgetFile,
    labText,
    tradeText,
    libraryText,
    budgetText,
  ]);

  const handleNext = () => {
    if (!isValid) return;
    setFormData({
      ...formData,
      labFile,
      tradeFile,
      libraryFile,
      budgetFile,
      labText,
      tradeText,
      libraryText,
      budgetText,
    });
    nextStep();
  };

  const renderSection = (label, file, setFile, text, setText, accept) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>

      <input
        type="file"
        accept={accept}
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full border rounded p-2 mb-2"
      />
      {file && (
        <p className="text-green-600 text-sm mb-2">✅ File Uploaded: {file.name}</p>
      )}

      <textarea
        placeholder="Or type the details here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="3"
        className="w-full border rounded p-2"
      ></textarea>
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        Step 5: Furniture & Laboratory Equipment
      </h2>

      <div className="space-y-8">
        {renderSection(
          "Upload Laboratory Equipment List or Type Details",
          labFile,
          setLabFile,
          labText,
          setLabText,
          ".pdf,.xlsx"
        )}

        {renderSection(
          "Upload Applied Trades Equipment List or Type Details",
          tradeFile,
          setTradeFile,
          tradeText,
          setTradeText,
          ".pdf,.xlsx"
        )}

        {renderSection(
          "Upload Library Books List or Type Details",
          libraryFile,
          setLibraryFile,
          libraryText,
          setLibraryText,
          ".pdf,.xlsx"
        )}

        {renderSection(
          "Upload Furniture / Budget Document or Type Details",
          budgetFile,
          setBudgetFile,
          budgetText,
          setBudgetText,
          ".pdf"
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
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

export default Step5Equipment;
