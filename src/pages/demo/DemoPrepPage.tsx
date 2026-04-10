import React from "react";
import { PlayCircle, Presentation, QrCode, ShieldCheck } from "lucide-react";
import { GuidedWalkthrough } from "../../components/feature/GuidedWalkthrough";
import { Button } from "../../components/ui/Button";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import { walkthroughSteps } from "../../data/platform";

export const DemoPrepPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-3xl bg-gradient-to-r from-primary-700 via-secondary-700 to-accent-600 p-6 text-white shadow-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
          Final milestone
        </p>
        <h1 className="mt-2 text-3xl font-bold">Integration and Demo Prep</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/85">
          Use this page as the guided demo flow for your presentation or
          recorded walkthrough.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <GuidedWalkthrough steps={walkthroughSteps} title="Demo walkthrough" />

        <div className="space-y-6">
          <Card className="border border-gray-200 shadow-lg">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                Presentation checklist
              </h2>
            </CardHeader>
            <CardBody className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-3">
                <PlayCircle className="h-4 w-4 text-primary-600" /> Record a
                short feature walkthrough
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-3">
                <Presentation className="h-4 w-4 text-secondary-600" /> Cover
                scheduling, calls, documents, and payments
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-3">
                <QrCode className="h-4 w-4 text-accent-600" /> Keep the GitHub
                and Vercel links ready for submission
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-3">
                <ShieldCheck className="h-4 w-4 text-success-700" /> Highlight
                login security and role-based experiences
              </div>
            </CardBody>
          </Card>

          <Card className="border border-gray-200 shadow-lg">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                Run-through actions
              </h2>
            </CardHeader>
            <CardBody className="space-y-3">
              <Button fullWidth>Open dashboard</Button>
              <Button fullWidth variant="outline">
                Launch scheduler
              </Button>
              <Button fullWidth variant="outline">
                Show document chamber
              </Button>
              <Button fullWidth variant="outline">
                Start payments demo
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
