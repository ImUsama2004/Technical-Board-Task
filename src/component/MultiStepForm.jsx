import React, { useState } from "react";
import Header from "./Header";
import ProgressBar from "./ProgressBar";
import Step1Institute from "./Step1Institute";
import Step2Staff from "./Step2Staff";
import Step3Finance from "./Step3Finance";
import Step4Building from "./Step4Building";
import Step5Equipment from "./Step5Equipment";
import Step6Documents from "./Step6Document";
import Step7Declaration from "./Step7Declaration";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // ✅ Step titles for the progress bar
  const STEPS = [
    { id: 1, title: "General Information" },
    { id: 2, title: "Staffing & Trade Experts" },
    { id: 3, title: "Financial Details" },
    { id: 4, title: "Building & Infrastructure" },
    { id: 5, title: "Equipment & Furniture" },
    { id: 6, title: "Documents & Attachments" },
    { id: 7, title: "Declaration & Owners" },
  ];

  // ✅ Define all form steps here
  const steps = [
    <Step1Institute {...{ nextStep, formData, setFormData }} />,
    <Step2Staff {...{ nextStep, prevStep, formData, setFormData }} />,
    <Step3Finance {...{ nextStep, prevStep, formData, setFormData }} />,
    <Step4Building {...{ nextStep, prevStep, formData, setFormData }} />,
    <Step5Equipment {...{ nextStep, prevStep, formData, setFormData }} />,
    <Step6Documents {...{ nextStep, prevStep, formData, setFormData }} />,
    <Step7Declaration {...{ prevStep, formData }} />,
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start">
      {/* ✅ Header section (separate container) */}
      <div className="w-full max-w-5xl mt-8 mb-6 px-4">
        <Header />
      </div>

      {/* ✅ Main form container */}
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow">
        {/* Progress bar */}
        <ProgressBar
          currentStep={step}
          totalSteps={STEPS.length}
          steps={STEPS}
        />

        {/* Active Step */}
        {steps[step - 1]}
      </div>
    </div>
  );
};

export default MultiStepForm;
