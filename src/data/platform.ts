import {
  Document as DealDocument,
  MeetingAvailability,
  MeetingItem,
  Transaction,
  WalletSummary,
  WalkthroughStep,
} from "../types";

export const walletSummary: WalletSummary = {
  balance: "$248,450",
  available: "$182,210",
  reserved: "$66,240",
  currency: "USD",
};

export const meetingAvailabilities: MeetingAvailability[] = [
  {
    id: "slot-1",
    date: "2026-04-11",
    startTime: "09:00",
    endTime: "09:30",
    title: "Founder intro block",
    status: "open",
  },
  {
    id: "slot-2",
    date: "2026-04-11",
    startTime: "11:00",
    endTime: "11:30",
    title: "Investor review slot",
    status: "booked",
  },
  {
    id: "slot-3",
    date: "2026-04-12",
    startTime: "14:00",
    endTime: "14:45",
    title: "Deal room walkthrough",
    status: "open",
  },
  {
    id: "slot-4",
    date: "2026-04-13",
    startTime: "16:00",
    endTime: "16:30",
    title: "Board prep slot",
    status: "blocked",
  },
];

export const meetingRequests: MeetingItem[] = [
  {
    id: "meeting-req-1",
    date: "2026-04-11",
    time: "10:00",
    title: "TechWave AI diligence review",
    with: "Michael Rodriguez",
    role: "investor",
    status: "pending",
    type: "request",
  },
  {
    id: "meeting-req-2",
    date: "2026-04-12",
    time: "13:30",
    title: "GreenLife follow-up call",
    with: "David Chen",
    role: "entrepreneur",
    status: "confirmed",
    type: "meeting",
  },
  {
    id: "meeting-req-3",
    date: "2026-04-13",
    time: "15:00",
    title: "HealthPulse pitch review",
    with: "Robert Torres",
    role: "investor",
    status: "declined",
    type: "request",
  },
];

export const confirmedMeetings: MeetingItem[] = [
  {
    id: "meeting-1",
    date: "2026-04-11",
    time: "11:00",
    title: "Confirmed founder sync",
    with: "Jennifer Lee",
    role: "investor",
    status: "confirmed",
    type: "meeting",
  },
  {
    id: "meeting-2",
    date: "2026-04-12",
    time: "14:00",
    title: "Deal review checkpoint",
    with: "Maya Patel",
    role: "entrepreneur",
    status: "confirmed",
    type: "meeting",
  },
];

export const paymentTransactions: Transaction[] = [
  {
    id: "txn-1",
    type: "deposit",
    amount: "$100,000",
    sender: "Capstone Fund",
    receiver: "Nexus Wallet",
    status: "completed",
    timestamp: "2026-04-10T08:20:00Z",
    note: "Wallet top-up for upcoming deal review",
  },
  {
    id: "txn-2",
    type: "transfer",
    amount: "$35,000",
    sender: "Investor escrow",
    receiver: "TechWave AI",
    status: "pending",
    timestamp: "2026-04-10T09:45:00Z",
    note: "Funding milestone released after diligence",
  },
  {
    id: "txn-3",
    type: "withdraw",
    amount: "$12,500",
    sender: "Nexus Wallet",
    receiver: "Operations account",
    status: "completed",
    timestamp: "2026-04-09T16:30:00Z",
    note: "Ops reserve refresh",
  },
  {
    id: "txn-4",
    type: "funding",
    amount: "$75,000",
    sender: "Michael Rodriguez",
    receiver: "HealthPulse",
    status: "completed",
    timestamp: "2026-04-08T14:00:00Z",
    note: "Seed round tranche",
  },
];

export const dealDocuments: DealDocument[] = [
  {
    id: "doc-1",
    name: "TechWave Term Sheet.pdf",
    type: "PDF",
    size: "1.8 MB",
    lastModified: "2026-04-10",
    shared: true,
    url: "#",
    ownerId: "e1",
    status: "In Review",
    previewType: "pdf",
  },
  {
    id: "doc-2",
    name: "GreenLife SAFE Agreement.docx",
    type: "Document",
    size: "900 KB",
    lastModified: "2026-04-09",
    shared: false,
    url: "#",
    ownerId: "e2",
    status: "Draft",
    previewType: "doc",
  },
  {
    id: "doc-3",
    name: "Signature Pack - HealthPulse.pdf",
    type: "PDF",
    size: "2.6 MB",
    lastModified: "2026-04-08",
    shared: true,
    url: "#",
    ownerId: "e3",
    status: "Signed",
    previewType: "pdf",
  },
];

export const walkthroughSteps: WalkthroughStep[] = [
  {
    title: "Navigate your workspace",
    description:
      "Use the dashboard and sidebar to jump between scheduling, calls, documents, payments, and security controls.",
    route: "/dashboard/entrepreneur",
    accent: "bg-primary-600",
  },
  {
    title: "Schedule meetings",
    description:
      "Open the calendar to add availability slots, answer meeting requests, and keep confirmed sessions visible on the dashboard.",
    route: "/schedule",
    accent: "bg-secondary-600",
  },
  {
    title: "Manage deal flow",
    description:
      "Use the document chamber and payments area to review contracts, simulate transfers, and track funding progress.",
    route: "/documents",
    accent: "bg-accent-600",
  },
  {
    title: "Lock down access",
    description:
      "Password checks, OTP flow, and role-specific dashboards keep the experience aligned with the security milestone.",
    route: "/security",
    accent: "bg-success-700",
  },
];
