import React from "react";

interface PasswordStrengthMeterProps {
  password: string;
}

const getStrength = (password: string) => {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  if (password.length >= 14) score = Math.min(4, score + 1);

  const labels = ["Very weak", "Weak", "Fair", "Strong", "Very strong"];

  return {
    score,
    label: labels[score],
  };
};

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
}) => {
  const { score, label } = getStrength(password);
  const fillStyles = [
    "bg-error-500",
    "bg-warning-500",
    "bg-accent-500",
    "bg-secondary-500",
    "bg-success-500",
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Password strength</span>
        <span className="font-medium text-gray-900">{label}</span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {fillStyles.map((fillStyle, index) => (
          <div
            key={fillStyle}
            className={`h-2 rounded-full ${index <= score ? fillStyle : "bg-gray-200"}`}
          />
        ))}
      </div>
      <p className="text-xs text-gray-500">
        Use 8+ characters with mixed case, a number, and a symbol.
      </p>
    </div>
  );
};
