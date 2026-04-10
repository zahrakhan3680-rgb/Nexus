# Nexus Platform - Frontend Architecture & Component Structure

## 1. Tech Stack

- React 18 + TypeScript
- Vite (build and dev server)
- Tailwind CSS (UI styling)
- React Router v6 (routing)
- date-fns (date utilities)
- lucide-react (icons)
- react-hot-toast (feedback toasts)

## 2. High-Level App Structure

```text
src/
  App.tsx
  main.tsx
  context/
    AuthContext.tsx
  components/
    layout/
      DashboardLayout.tsx
      Navbar.tsx
      Sidebar.tsx
    ui/
      Button.tsx
      Card.tsx
      Input.tsx
      Badge.tsx
      Avatar.tsx
    feature/
      PasswordStrengthMeter.tsx
      SignaturePad.tsx
      GuidedWalkthrough.tsx
  pages/
    auth/
    dashboard/
    schedule/
    video/
    documents/
    payments/
    security/
    demo/
    ...
  data/
    users.ts
    messages.ts
    collaborationRequests.ts
    platform.ts
  types/
    index.ts
```

## 3. Routing Architecture

### Public Routes

- /login
- /register
- /forgot-password
- /reset-password

### Protected Shell

All protected pages are rendered inside DashboardLayout:

- /dashboard/entrepreneur
- /dashboard/investor
- /schedule
- /video
- /documents
- /payments
- /security
- /demo
- /messages
- /notifications
- /deals
- /investors
- /entrepreneurs
- /settings
- /help

## 4. State and Data Flow

## Auth Layer

- AuthContext manages current user, session persistence, login/register/logout, forgot/reset password mock logic.
- Role-based rendering (investor vs entrepreneur) is used in navigation and dashboards.

## Feature Data Layer

- data/platform.ts centralizes mock data for:
  - meeting availability and meeting requests
  - confirmed meetings
  - wallet summary and transaction history
  - document chamber mock entries
  - guided walkthrough steps

## Component Flow

- Page components read from local state + mock data sources.
- Reusable feature widgets (signature pad, password meter, walkthrough) are composed into pages.

## 5. UI and Theming

- Tailwind utility-first styling with existing project theme tokens.
- Shared UI primitives used consistently:
  - Button
  - Card
  - Input
  - Badge
  - Avatar
- Responsive layouts use grid/flex breakpoints for mobile + desktop.

## 6. Milestone Mapping to Implementation

## Week 1 (Scheduling & Setup)

- Implemented in pages/schedule/MeetingSchedulerPage.tsx
- Includes:
  - add availability slot
  - accept/decline meeting requests
  - confirmed meetings display

## Week 2 (Video Calling & Document Chamber)

- Video Calling: pages/video/VideoCallPage.tsx
  - start/end call
  - video/audio toggle
  - optional screen share
- Document Chamber: pages/documents/DocumentsPage.tsx
  - upload + preview pane mock
  - e-signature mock via SignaturePad
  - status flow: Draft / In Review / Signed

## Week 3 (Payments, Security, Integration)

- Payments: pages/payments/PaymentsPage.tsx
  - deposit/withdraw/transfer simulation
  - transaction table
  - wallet display
  - funding flow mock
- Security: pages/security/SecurityCenterPage.tsx + auth pages
  - password strength meter
  - multi-step login with OTP mock
  - role-based UI
- Integration & Demo:
  - navigation wired via Navbar/Sidebar/App routes
  - guided walkthrough in pages/demo/DemoPrepPage.tsx

## 7. Validation Status

- npm run build: passing
- npm run lint: passing (toolchain TypeScript version advisory may appear)

## 8. Deployment Notes

- vercel.json is present for deployment config.
- App is ready for deployment to Vercel after pushing changes to GitHub.
