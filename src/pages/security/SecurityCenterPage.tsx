import React, { useState } from "react";
import {
  ShieldCheck,
  KeyRound,
  LockKeyhole,
  UsersRound,
  Fingerprint,
} from "lucide-react";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { PasswordStrengthMeter } from "../../components/feature/PasswordStrengthMeter";
import { useAuth } from "../../context/AuthContext";

export const SecurityCenterPage: React.FC = () => {
  const { user } = useAuth();
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const otpFilled = otp.every((value) => value.length === 1);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-primary-800 to-secondary-700 p-6 text-white shadow-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
          Week 3 milestone
        </p>
        <h1 className="mt-2 text-3xl font-bold">Security & Access Control</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/85">
          Password strength, OTP-style login protection, and role-based UI
          guidance for investors and entrepreneurs.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card className="border border-gray-200 shadow-lg">
          <CardHeader className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Password policy
              </h2>
              <p className="text-sm text-gray-500">
                Use this meter in register and reset flows as well.
              </p>
            </div>
            <KeyRound className="h-5 w-5 text-primary-600" />
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="New password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <PasswordStrengthMeter password={password} />
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600">
              Recommended: 12+ characters, mixed casing, numbers, and a symbol
              for a strong mock policy.
            </div>
          </CardBody>
        </Card>

        <Card className="border border-gray-200 shadow-lg">
          <CardHeader className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Two-factor login
              </h2>
              <p className="text-sm text-gray-500">
                Mock OTP flow used during authentication and demo prep.
              </p>
            </div>
            <Fingerprint className="h-5 w-5 text-secondary-600" />
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-6 gap-2">
              {otp.map((value, index) => (
                <input
                  key={index}
                  maxLength={1}
                  value={value}
                  onChange={(event) => {
                    const next = [...otp];
                    next[index] = event.target.value
                      .replace(/[^0-9]/g, "")
                      .slice(0, 1);
                    setOtp(next);
                  }}
                  className="h-12 rounded-xl border border-gray-300 text-center text-lg font-semibold shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant={otpFilled ? "success" : "warning"}>
                {otpFilled ? "OTP ready" : "Waiting for 6 digits"}
              </Badge>
              <Badge variant="gray">Use 246810 in demo mode</Badge>
            </div>
            <Button fullWidth disabled={!otpFilled}>
              Verify and continue
            </Button>
          </CardBody>
        </Card>

        <Card className="border border-gray-200 shadow-lg">
          <CardHeader className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Role-based UI
              </h2>
              <p className="text-sm text-gray-500">
                Show different controls for investors and entrepreneurs.
              </p>
            </div>
            <UsersRound className="h-5 w-5 text-accent-600" />
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div
                className={`rounded-2xl border p-4 ${user?.role === "investor" ? "border-primary-500 bg-primary-50" : "border-gray-200 bg-white"}`}
              >
                <p className="text-xs uppercase tracking-[0.24em] text-gray-500">
                  Investor
                </p>
                <p className="mt-2 text-sm font-semibold text-gray-900">
                  Deals, wallet, and diligence controls
                </p>
              </div>
              <div
                className={`rounded-2xl border p-4 ${user?.role === "entrepreneur" ? "border-secondary-500 bg-secondary-50" : "border-gray-200 bg-white"}`}
              >
                <p className="text-xs uppercase tracking-[0.24em] text-gray-500">
                  Entrepreneur
                </p>
                <p className="mt-2 text-sm font-semibold text-gray-900">
                  Scheduling, documents, and funding requests
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
              <ShieldCheck className="h-5 w-5 text-success-700" />
              <span>
                Access control is currently mocked on the frontend and can be
                swapped for backend policies later.
              </span>
            </div>
          </CardBody>
        </Card>

        <Card className="border border-gray-200 shadow-lg">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">
              Security checklist
            </h2>
          </CardHeader>
          <CardBody className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-3">
              <LockKeyhole className="h-4 w-4 text-primary-600" />
              Password meter in register and reset forms
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-3">
              <Fingerprint className="h-4 w-4 text-secondary-600" />
              OTP step in login flow
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-3">
              <UsersRound className="h-4 w-4 text-accent-600" />
              Role-specific navigation and dashboard content
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
