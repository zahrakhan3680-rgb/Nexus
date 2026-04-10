import React, { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardBody, CardHeader } from "../ui/Card";
import { WalkthroughStep } from "../../types";

interface GuidedWalkthroughProps {
  steps: WalkthroughStep[];
  title?: string;
}

export const GuidedWalkthrough: React.FC<GuidedWalkthroughProps> = ({
  steps,
  title = "Platform walkthrough",
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = steps[activeStep];

  return (
    <Card className="border border-gray-200 shadow-lg">
      <CardHeader className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600">
            Step {activeStep + 1} of {steps.length}
          </p>
        </div>
        <CheckCircle2 className="h-5 w-5 text-secondary-600" />
      </CardHeader>
      <CardBody className="space-y-4">
        <div className={`rounded-2xl p-5 text-white ${currentStep.accent}`}>
          <h3 className="text-xl font-semibold">{currentStep.title}</h3>
          <p className="mt-2 text-sm text-white/90">
            {currentStep.description}
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.24em] text-white/80">
            Destination: {currentStep.route}
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {steps.map((step, index) => (
            <button
              key={step.title}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`rounded-xl border p-4 text-left transition ${index === activeStep ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"}`}
            >
              <p className="text-sm font-semibold text-gray-900">
                {step.title}
              </p>
              <p className="mt-1 text-xs text-gray-500">{step.route}</p>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<ArrowLeft size={16} />}
            disabled={activeStep === 0}
            onClick={() => setActiveStep((step) => Math.max(0, step - 1))}
          >
            Previous
          </Button>
          <Button
            variant="primary"
            size="sm"
            rightIcon={<ArrowRight size={16} />}
            disabled={activeStep === steps.length - 1}
            onClick={() =>
              setActiveStep((step) => Math.min(steps.length - 1, step + 1))
            }
          >
            Next
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
