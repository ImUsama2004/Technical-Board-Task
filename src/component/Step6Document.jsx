import React, { useState } from "react";

const Step6Documents = ({ nextStep, prevStep, formData, setFormData }) => {
  const [docs, setDocs] = useState(formData.documents || {});

  const documentList = [
    { id: 1, label: "Colour page of institute along with monogram" },
    { id: 2, label: "Message and mission statement of institute by the Director or Principal along with picture" },
    { id: 3, label: "Application for affiliation to Secretary TTB" },
  ];

  const handleFileChange = (id, file) => {
    setDocs((prev) => ({ ...prev, [id]: file }));
  };

  const handleNext = () => {
    // Save files in global form data before moving forward
    setFormData((prev) => ({ ...prev, documents: docs }));
    nextStep();
  };

  // ✅ Check if all files are uploaded before enabling Next
  const allUploaded = documentList.every((doc) => docs[doc.id]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
        Documents & Attachments
      </h2>

      <table className="w-full border border-gray-300 rounded-lg mb-8">
        <thead className="bg-indigo-100">
          <tr>
            <th className="border p-2 w-16">S.No</th>
            <th className="border p-2 text-left">Document</th>
            <th className="border p-2 text-center w-48">Upload File</th>
          </tr>
        </thead>
        <tbody>
          {documentList.map((doc) => (
            <tr key={doc.id} className="hover:bg-gray-50">
              <td className="border p-2 text-center font-semibold">{doc.id}</td>
              <td className="border p-2">{doc.label}</td>
              <td className="border p-2 text-center">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(doc.id, e.target.files[0])}
                  className="text-sm text-gray-600 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!allUploaded}
          className={`px-6 py-2 rounded-md ${
            allUploaded
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step6Documents;
