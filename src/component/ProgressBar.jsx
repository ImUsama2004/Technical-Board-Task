import React from "react";

const ProgressBar = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="flex justify-between shadow-lg rounded-xl items-start mb-8 py-8 relative">
      {steps.map((step) => (
        <React.Fragment key={step.id}>
          {/* Connecting line between steps */}
          {step.id > 1 && (
            <div
              className={`absolute top-4 h-1 transition-all duration-500 ease-in-out -z-10 ${
                currentStep >= step.id ? "bg-indigo-600" : "bg-gray-300"
              }`}
              style={{
                width: `${90 / (totalSteps - 1)}%`,
                left: `${
                  ((step.id - 2) * 100) / (totalSteps - 1) +
                  100 / (2 * (totalSteps - 1))
                }%`,
              }}
            />
          )}

          {/* Step Circle */}
          <div className="flex-1 flex flex-col items-center z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                currentStep > step.id
                  ? "bg-green-500 text-white"
                  : currentStep === step.id
                  ? "bg-indigo-600 text-white shadow-lg ring-4 ring-indigo-300"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.id}
            </div>

            {/* Step Title */}
            <p
              className={`mt-2 text-xs text-center hidden sm:block ${
                currentStep === step.id
                  ? "font-bold text-indigo-700"
                  : "text-gray-500"
              }`}
            >
              {step.title}
            </p>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;
