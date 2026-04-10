import React, { useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Repeat2,
  WalletCards,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { paymentTransactions, walletSummary } from "../../data/platform";
import { Transaction } from "../../types";

const statusVariant: Record<
  Transaction["status"],
  "success" | "warning" | "error"
> = {
  completed: "success",
  pending: "warning",
  failed: "error",
};

export const PaymentsPage: React.FC = () => {
  const [transactions, setTransactions] = useState(paymentTransactions);
  const [action, setAction] = useState<"deposit" | "withdraw" | "transfer">(
    "transfer",
  );
  const [form, setForm] = useState({
    amount: "$25,000",
    sender: "Investor wallet",
    receiver: "Entrepreneur escrow",
    note: "Funding tranche",
  });

  const completedTransactions = useMemo(
    () =>
      transactions.filter((transaction) => transaction.status === "completed"),
    [transactions],
  );

  const submitPayment = () => {
    setTransactions((prev) => [
      {
        id: `txn-${Date.now()}`,
        type: action,
        amount: form.amount,
        sender: form.sender,
        receiver: form.receiver,
        status: "pending",
        timestamp: new Date().toISOString(),
        note: form.note,
      },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-primary-800 to-secondary-700 p-6 text-white shadow-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
          Week 3 milestone
        </p>
        <h1 className="mt-2 text-3xl font-bold">Payment Section</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/85">
          Mock Stripe and PayPal style transaction flows for deposit, withdraw,
          transfer, and deal funding simulations.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <Card className="border border-gray-200 shadow-lg">
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Wallet balance
              </h2>
              <WalletCards className="h-5 w-5 text-primary-600" />
            </CardHeader>
            <CardBody>
              <div className="rounded-3xl bg-slate-950 p-5 text-white">
                <p className="text-sm text-white/70">Current balance</p>
                <p className="mt-2 text-4xl font-bold">
                  {walletSummary.balance}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs text-white/80">
                  <div className="rounded-2xl bg-white/10 p-3">
                    <p>Available</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {walletSummary.available}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3">
                    <p>Reserved</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {walletSummary.reserved}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3">
                    <p>Currency</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {walletSummary.currency}
                    </p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border border-gray-200 shadow-lg">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                Funding deal flow
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="rounded-2xl border border-primary-100 bg-primary-50 p-4">
                <p className="text-sm font-semibold text-primary-900">
                  Investor to entrepreneur release
                </p>
                <p className="mt-1 text-sm text-primary-700">
                  Move funds from escrow to startup account after diligence,
                  approvals, or milestone completion.
                </p>
              </div>
              <div className="flex gap-3">
                <Badge variant="primary">Escrow held</Badge>
                <Badge variant="secondary">KYC checked</Badge>
                <Badge variant="accent">Auto release ready</Badge>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border border-gray-200 shadow-lg">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                Transaction simulator
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {(["deposit", "withdraw", "transfer"] as const).map(
                  (option) => (
                    <Button
                      key={option}
                      variant={action === option ? "primary" : "outline"}
                      size="sm"
                      onClick={() => setAction(option)}
                    >
                      {option}
                    </Button>
                  ),
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label="Amount"
                  value={form.amount}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      amount: event.target.value,
                    }))
                  }
                />
                <Input
                  label="Sender"
                  value={form.sender}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      sender: event.target.value,
                    }))
                  }
                />
                <Input
                  label="Receiver"
                  value={form.receiver}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      receiver: event.target.value,
                    }))
                  }
                />
                <Input
                  label="Note"
                  value={form.note}
                  onChange={(event) =>
                    setForm((previous) => ({
                      ...previous,
                      note: event.target.value,
                    }))
                  }
                />
              </div>
              <Button
                fullWidth
                onClick={submitPayment}
                leftIcon={<Repeat2 size={16} />}
              >
                Create simulated transaction
              </Button>
            </CardBody>
          </Card>

          <Card className="border border-gray-200 shadow-lg">
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Transaction history
              </h2>
              <Badge variant="primary">
                {completedTransactions.length} completed
              </Badge>
            </CardHeader>
            <CardBody className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.24em] text-gray-500">
                  <tr>
                    <th className="py-3 pr-4">Amount</th>
                    <th className="py-3 pr-4">Sender</th>
                    <th className="py-3 pr-4">Receiver</th>
                    <th className="py-3 pr-4">Status</th>
                    <th className="py-3 pr-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="align-top">
                      <td className="py-4 pr-4 font-semibold text-gray-900">
                        {transaction.amount}
                      </td>
                      <td className="py-4 pr-4 text-gray-600">
                        {transaction.sender}
                      </td>
                      <td className="py-4 pr-4 text-gray-600">
                        {transaction.receiver}
                      </td>
                      <td className="py-4 pr-4">
                        <Badge variant={statusVariant[transaction.status]}>
                          {transaction.status}
                        </Badge>
                      </td>
                      <td className="py-4 pr-4 text-gray-500">
                        {format(
                          new Date(transaction.timestamp),
                          "MMM d, h:mm a",
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>

          <Card className="border border-gray-200 shadow-lg">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                Quick summaries
              </h2>
            </CardHeader>
            <CardBody className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 p-4">
                <ArrowDownLeft className="text-secondary-600" />
                <p className="mt-3 text-xs uppercase tracking-[0.24em] text-gray-500">
                  Deposits
                </p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {
                    transactions.filter(
                      (transaction) => transaction.type === "deposit",
                    ).length
                  }
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-4">
                <ArrowUpRight className="text-accent-600" />
                <p className="mt-3 text-xs uppercase tracking-[0.24em] text-gray-500">
                  Transfers
                </p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {
                    transactions.filter(
                      (transaction) => transaction.type === "transfer",
                    ).length
                  }
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-4">
                <TrendingUp className="text-success-700" />
                <p className="mt-3 text-xs uppercase tracking-[0.24em] text-gray-500">
                  Funding
                </p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {
                    transactions.filter(
                      (transaction) => transaction.type === "funding",
                    ).length
                  }
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
