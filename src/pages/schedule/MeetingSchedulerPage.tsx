import React, { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Plus, XCircle } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  parseISO,
} from "date-fns";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card, CardBody, CardHeader } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import {
  confirmedMeetings,
  meetingAvailabilities,
  meetingRequests,
} from "../../data/platform";
import { MeetingAvailability, MeetingItem } from "../../types";

const statusStyles: Record<MeetingAvailability["status"], string> = {
  open: "bg-success-50 text-success-700 border-success-100",
  booked: "bg-primary-50 text-primary-700 border-primary-100",
  blocked: "bg-error-50 text-error-700 border-error-100",
};

export const MeetingSchedulerPage: React.FC = () => {
  const [activeMonth, setActiveMonth] = useState(
    new Date("2026-04-01T00:00:00"),
  );
  const [selectedDate, setSelectedDate] = useState("2026-04-11");
  const [availability, setAvailability] = useState<MeetingAvailability[]>(
    meetingAvailabilities,
  );
  const [requests, setRequests] = useState<MeetingItem[]>(meetingRequests);
  const [newSlot, setNewSlot] = useState({
    date: "2026-04-14",
    startTime: "10:00",
    endTime: "10:30",
    title: "Investor sync",
  });

  const monthDays = useMemo(() => {
    const monthStart = startOfMonth(activeMonth);
    const monthEnd = endOfMonth(activeMonth);
    return eachDayOfInterval({ start: monthStart, end: monthEnd });
  }, [activeMonth]);

  const selectedAvailability = availability.filter(
    (slot) => slot.date === selectedDate,
  );
  const selectedRequests = requests.filter(
    (item) => item.date === selectedDate,
  );
  const selectedMeetings = confirmedMeetings.filter(
    (item) => item.date === selectedDate,
  );

  const addSlot = () => {
    setAvailability((prev) => [
      ...prev,
      {
        id: `slot-${Date.now()}`,
        date: newSlot.date,
        startTime: newSlot.startTime,
        endTime: newSlot.endTime,
        title: newSlot.title,
        status: "open",
      },
    ]);
    setSelectedDate(newSlot.date);
  };

  const updateRequest = (
    requestId: string,
    status: "confirmed" | "declined",
  ) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId ? { ...request, status } : request,
      ),
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-3xl bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 p-6 text-white shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              Week 1 milestone
            </p>
            <h1 className="mt-2 text-3xl font-bold">
              Meeting Scheduling Calendar
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/90">
              Add availability, answer requests, and keep confirmed meetings
              visible across the dashboard.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
              <p className="text-white/70">Open slots</p>
              <p className="text-xl font-semibold">
                {availability.filter((slot) => slot.status === "open").length}
              </p>
            </div>
            <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
              <p className="text-white/70">Pending</p>
              <p className="text-xl font-semibold">
                {
                  requests.filter((request) => request.status === "pending")
                    .length
                }
              </p>
            </div>
            <div className="rounded-2xl bg-white/15 px-4 py-3 backdrop-blur">
              <p className="text-white/70">Confirmed</p>
              <p className="text-xl font-semibold">
                {confirmedMeetings.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="overflow-hidden border border-gray-200 shadow-lg">
          <CardHeader className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                April 2026
              </h2>
              <p className="text-sm text-gray-500">
                Select a day to review requests and confirmed meetings
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveMonth((month) => subMonths(month, 1))}
              >
                Prev
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveMonth((month) => addMonths(month, 1))}
              >
                Next
              </Button>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {monthDays.map((day) => {
                const dayIso = format(day, "yyyy-MM-dd");
                const inSelection = isSameDay(day, parseISO(selectedDate));
                const hasMeeting = [
                  ...availability,
                  ...requests,
                  ...confirmedMeetings,
                ].some((item) => item.date === dayIso);

                return (
                  <button
                    key={dayIso}
                    type="button"
                    onClick={() => setSelectedDate(dayIso)}
                    className={`min-h-28 rounded-2xl border p-3 text-left transition ${inSelection ? "border-primary-500 bg-primary-50" : "border-gray-200 hover:border-gray-300"} ${hasMeeting ? "shadow-sm" : ""}`}
                  >
                    <span className="text-sm font-semibold text-gray-900">
                      {format(day, "d")}
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {availability.some((slot) => slot.date === dayIso) && (
                        <span className="h-2 w-2 rounded-full bg-secondary-500" />
                      )}
                      {requests.some(
                        (request) =>
                          request.date === dayIso &&
                          request.status === "pending",
                      ) && (
                        <span className="h-2 w-2 rounded-full bg-accent-500" />
                      )}
                      {confirmedMeetings.some(
                        (meeting) => meeting.date === dayIso,
                      ) && (
                        <span className="h-2 w-2 rounded-full bg-success-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </CardBody>
        </Card>

        <div className="space-y-6">
          <Card className="border border-gray-200 shadow-lg">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                Add availability
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  label="Date"
                  type="date"
                  value={newSlot.date}
                  onChange={(event) =>
                    setNewSlot((slot) => ({
                      ...slot,
                      date: event.target.value,
                    }))
                  }
                />
                <Input
                  label="Title"
                  value={newSlot.title}
                  onChange={(event) =>
                    setNewSlot((slot) => ({
                      ...slot,
                      title: event.target.value,
                    }))
                  }
                />
                <Input
                  label="Start"
                  type="time"
                  value={newSlot.startTime}
                  onChange={(event) =>
                    setNewSlot((slot) => ({
                      ...slot,
                      startTime: event.target.value,
                    }))
                  }
                />
                <Input
                  label="End"
                  type="time"
                  value={newSlot.endTime}
                  onChange={(event) =>
                    setNewSlot((slot) => ({
                      ...slot,
                      endTime: event.target.value,
                    }))
                  }
                />
              </div>
              <Button fullWidth leftIcon={<Plus size={18} />} onClick={addSlot}>
                Add slot
              </Button>
            </CardBody>
          </Card>

          <Card className="border border-gray-200 shadow-lg">
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">
                Selected day
              </h2>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CalendarDays size={16} />
                <span>{selectedDate}</span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
                    Availability
                  </p>
                  {selectedAvailability.length > 0 ? (
                    selectedAvailability.map((slot) => (
                      <div
                        key={slot.id}
                        className={`mb-2 rounded-2xl border p-3 ${statusStyles[slot.status]}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {slot.title}
                            </p>
                            <p className="text-xs text-gray-600">
                              {slot.startTime} - {slot.endTime}
                            </p>
                          </div>
                          <Badge
                            variant={
                              slot.status === "open"
                                ? "success"
                                : slot.status === "booked"
                                  ? "primary"
                                  : "error"
                            }
                          >
                            {slot.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No availability slots for this day.
                    </p>
                  )}
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
                    Requests
                  </p>
                  {selectedRequests.length > 0 ? (
                    selectedRequests.map((request) => (
                      <div
                        key={request.id}
                        className="mb-3 rounded-2xl border border-gray-200 p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {request.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {request.time} • {request.with}
                            </p>
                          </div>
                          <Badge
                            variant={
                              request.status === "pending"
                                ? "warning"
                                : request.status === "confirmed"
                                  ? "success"
                                  : "error"
                            }
                          >
                            {request.status}
                          </Badge>
                        </div>
                        {request.status === "pending" && (
                          <div className="mt-3 flex gap-2">
                            <Button
                              size="sm"
                              variant="success"
                              leftIcon={<CheckCircle2 size={16} />}
                              onClick={() =>
                                updateRequest(request.id, "confirmed")
                              }
                            >
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              leftIcon={<XCircle size={16} />}
                              onClick={() =>
                                updateRequest(request.id, "declined")
                              }
                            >
                              Decline
                            </Button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No meeting requests for this day.
                    </p>
                  )}
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-gray-500">
                    Confirmed meetings
                  </p>
                  {selectedMeetings.length > 0 ? (
                    selectedMeetings.map((meeting) => (
                      <div
                        key={meeting.id}
                        className="mb-2 rounded-2xl border border-success-100 bg-success-50 p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {meeting.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {meeting.time} • {meeting.with}
                            </p>
                          </div>
                          <Badge variant="success">Confirmed</Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No confirmed meetings for this day.
                    </p>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <Card className="border border-gray-200 shadow-lg">
        <CardHeader className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Meeting requests queue
            </h2>
            <p className="text-sm text-gray-500">
              Process incoming investor and founder requests
            </p>
          </div>
          <Badge variant="primary">
            {requests.filter((request) => request.status === "pending").length}{" "}
            pending
          </Badge>
        </CardHeader>
        <CardBody className="grid gap-4 lg:grid-cols-2">
          {requests.map((request) => (
            <div
              key={request.id}
              className="rounded-2xl border border-gray-200 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {request.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {request.date} • {request.time} • {request.with}
                  </p>
                </div>
                <Badge
                  variant={
                    request.status === "pending"
                      ? "warning"
                      : request.status === "confirmed"
                        ? "success"
                        : "error"
                  }
                >
                  {request.status}
                </Badge>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => updateRequest(request.id, "confirmed")}
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateRequest(request.id, "declined")}
                >
                  Decline
                </Button>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};
