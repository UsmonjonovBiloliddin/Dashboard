import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventInput, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { Modal } from "../components/ui/modal";
import { useModal } from "../hooks/useModal";
import PageMeta from "../components/common/PageMeta";

interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
    color: string;
    description?: string;
  };
}

const Calendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLevel, setEventLevel] = useState("Primary");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const calendarColors = {
    Primary: { 
      class: "primary", 
      bg: "bg-blue-100 dark:bg-blue-900/20", 
      text: "text-blue-700 dark:text-blue-300",
      dot: "bg-blue-500" 
    },
    Success: { 
      class: "success", 
      bg: "bg-green-100 dark:bg-green-900/20", 
      text: "text-green-700 dark:text-green-300",
      dot: "bg-green-500" 
    },
    Warning: { 
      class: "warning", 
      bg: "bg-amber-100 dark:bg-amber-900/20", 
      text: "text-amber-700 dark:text-amber-300",
      dot: "bg-amber-500" 
    },
    Danger: { 
      class: "danger", 
      bg: "bg-red-100 dark:bg-red-900/20", 
      text: "text-red-700 dark:text-red-300",
      dot: "bg-red-500" 
    },
  };

  useEffect(() => {
    // Initialize with some events
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    setEvents([
      {
        id: "1",
        title: "Team Meeting",
        start: today.toISOString().split("T")[0] + "T10:00:00",
        end: today.toISOString().split("T")[0] + "T11:30:00",
        extendedProps: { 
          calendar: "Primary",
          color: "primary",
          description: "Weekly team sync and planning"
        },
      },
      {
        id: "2",
        title: "Client Presentation",
        start: tomorrow.toISOString().split("T")[0] + "T14:00:00",
        end: tomorrow.toISOString().split("T")[0] + "T16:00:00",
        extendedProps: { 
          calendar: "Success",
          color: "success",
          description: "Quarterly review with key clients"
        },
      },
      {
        id: "3",
        title: "Product Launch",
        start: nextWeek.toISOString().split("T")[0] + "T09:00:00",
        end: nextWeek.toISOString().split("T")[0] + "T17:00:00",
        allDay: true,
        extendedProps: { 
          calendar: "Warning",
          color: "warning",
          description: "Major product release and announcement"
        },
      },
      {
        id: "4",
        title: "Deadline",
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2).toISOString().split("T")[0],
        extendedProps: { 
          calendar: "Danger",
          color: "danger",
          description: "Project submission deadline"
        },
      },
    ]);
  }, []);

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    setEventStartDate(selectInfo.startStr.split('T')[0]);
    if (selectInfo.end) {
      const endDate = new Date(selectInfo.end);
      endDate.setDate(endDate.getDate() - 1);
      setEventEndDate(endDate.toISOString().split('T')[0]);
    } else {
      setEventEndDate(selectInfo.startStr.split('T')[0]);
    }
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    setSelectedEvent(event as unknown as CalendarEvent);
    setEventTitle(event.title);
    setEventDescription(event.extendedProps.description || "");
    setEventStartDate(event.start?.toISOString().split('T')[0] || "");
    if (event.end) {
      const endDate = new Date(event.end);
      if (!event.allDay) {
        setEventEndDate(event.end?.toISOString().split('T')[0] || "");
      } else {
        endDate.setDate(endDate.getDate() - 1);
        setEventEndDate(endDate.toISOString().split('T')[0]);
      }
    } else {
      setEventEndDate(event.start?.toISOString().split('T')[0] || "");
    }
    setEventLevel(event.extendedProps.calendar);
    openModal();
  };

  const handleAddOrUpdateEvent = () => {
    if (!eventTitle.trim()) {
      alert("Please enter an event title");
      return;
    }

    if (selectedEvent) {
      // Update existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: eventTitle,
                start: eventStartDate,
                end: eventEndDate,
                extendedProps: { 
                  calendar: eventLevel,
                  color: calendarColors[eventLevel as keyof typeof calendarColors].class,
                  description: eventDescription 
                },
              }
            : event
        )
      );
    } else {
      // Add new event
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventTitle,
        start: eventStartDate,
        end: eventEndDate,
        allDay: true,
        extendedProps: { 
          calendar: eventLevel,
          color: calendarColors[eventLevel as keyof typeof calendarColors].class,
          description: eventDescription 
        },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    closeModal();
    resetModalFields();
  };

  const resetModalFields = () => {
    setEventTitle("");
    setEventDescription("");
    setEventStartDate("");
    setEventEndDate("");
    setEventLevel("Primary");
    setSelectedEvent(null);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent && window.confirm("Are you sure you want to delete this event?")) {
      setEvents((prevEvents) => prevEvents.filter(event => event.id !== selectedEvent.id));
      closeModal();
      resetModalFields();
    }
  };

  return (
    <>
      <PageMeta
        title="Calendar Dashboard | TailAdmin"
        description="Interactive calendar for managing events and schedules"
      />
      
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
        {/* Calendar Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Manage your events, meetings, and schedules
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Color Legend */}
              <div className="hidden md:flex items-center gap-3">
                {Object.entries(calendarColors).map(([key, color]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-full ${color.dot}`}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{key}</span>
                  </div>
                ))}
              </div>
              
              {/* Add Event Button */}
              <button
                onClick={openModal}
                className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <p className="text-[20px]">+</p>
                Add Event
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Container */}
        <div className="p-6">
          <div className="custom-calendar rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              events={events}
              selectable={true}
              selectMirror={true}
              select={handleDateSelect}
              eventClick={handleEventClick}
              eventContent={renderEventContent}
              height="auto"
              eventClassNames={(eventInfo) => 
                calendarColors[eventInfo.event.extendedProps.calendar as keyof typeof calendarColors]?.bg || ""
              }
              dayMaxEvents={3}
              editable={true}
              eventDrop={(eventDropInfo) => {
                const event = eventDropInfo.event;
                setEvents((prevEvents) =>
                  prevEvents.map((ev) =>
                    ev.id === event.id
                      ? {
                          ...ev,
                          start: event.start?.toISOString().split('T')[0] || ev.start,
                          end: event.end?.toISOString().split('T')[0] || ev.end,
                        }
                      : ev
                  )
                );
              }}
              eventResize={(eventResizeInfo) => {
                const event = eventResizeInfo.event;
                setEvents((prevEvents) =>
                  prevEvents.map((ev) =>
                    ev.id === event.id
                      ? {
                          ...ev,
                          end: event.end?.toISOString().split('T')[0] || ev.end,
                        }
                      : ev
                  )
                );
              }}
            />
          </div>
        </div>

        {/* Event Modal */}
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-lg p-0 overflow-hidden"
        >
          <div className="p-6 bg-white dark:bg-gray-900">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedEvent ? "Edit Event" : "Create Event"}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {selectedEvent ? "Update your event details" : "Add a new event to your calendar"}
                </p>
              </div>
              {selectedEvent && (
                <button
                  onClick={handleDeleteEvent}
                  className="px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  Delete
                </button>
              )}
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter event title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Add event description (optional)"
                />
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Event Color
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {Object.entries(calendarColors).map(([key, color]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setEventLevel(key)}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                        eventLevel === key 
                          ? `border-blue-500 ${color.bg}` 
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full ${color.dot} mb-2`}></div>
                      <span className={`text-xs font-medium ${color.text}`}>{key}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={eventStartDate}
                    onChange={(e) => setEventStartDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={eventEndDate}
                    onChange={(e) => setEventEndDate(e.target.value)}
                    min={eventStartDate}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200 dark:border-gray-800">
              <button
                onClick={closeModal}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrUpdateEvent}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                {selectedEvent ? "Update Event" : "Add Event"}
              </button>
            </div>
          </div>
        </Modal>
      </div>

      {/* Custom CSS for FullCalendar */}
      <style >{`
        .custom-calendar {
          --fc-border-color: #e5e7eb;
          --fc-button-bg-color: #3b82f6;
          --fc-button-border-color: #3b82f6;
          --fc-button-hover-bg-color: #2563eb;
          --fc-button-hover-border-color: #2563eb;
          --fc-button-active-bg-color: #1d4ed8;
          --fc-button-active-border-color: #1d4ed8;
          --fc-today-bg-color: #eff6ff;
        }

        .dark .custom-calendar {
          --fc-border-color: #374151;
          --fc-page-bg-color: #111827;
          --fc-neutral-bg-color: #1f2937;
          --fc-neutral-text-color: #9ca3af;
          --fc-button-bg-color: #1d4ed8;
          --fc-button-border-color: #1d4ed8;
          --fc-button-hover-bg-color: #1e40af;
          --fc-button-hover-border-color: #1e40af;
          --fc-button-active-bg-color: #1e3a8a;
          --fc-button-active-border-color: #1e3a8a;
          --fc-today-bg-color: rgba(59, 130, 246, 0.1);
        }

        .fc-toolbar-title {
          font-size: 1.25rem !important;
          font-weight: 600 !important;
          color: #111827 !important;
        }

        .dark .fc-toolbar-title {
          color: #f9fafb !important;
        }

        .fc-button {
          font-weight: 500 !important;
          border-radius: 0.5rem !important;
          padding: 0.5rem 1rem !important;
          font-size: 0.875rem !important;
        }

        .fc-day-today {
          background-color: var(--fc-today-bg-color) !important;
        }

        .fc-event {
          border: none !important;
          border-radius: 0.375rem !important;
          padding: 0.25rem 0.5rem !important;
          margin: 0.125rem 0 !important;
        }

        .fc-event:hover {
          transform: translateY(-1px);
          transition: transform 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .dark .fc-event:hover {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .fc-daygrid-event-dot {
          display: none !important;
        }

        .fc-event-time {
          font-weight: 500 !important;
          margin-right: 0.25rem !important;
        }

        .fc-event-title {
          font-weight: 500 !important;
        }
      `}</style>
    </>
  );
};

const renderEventContent = (eventInfo: any) => {
  const colorClass = eventInfo.event.extendedProps.color;
  const colors = {
    primary: { bg: "bg-blue-100 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-300", dot: "bg-blue-500" },
    success: { bg: "bg-green-100 dark:bg-green-900/20", text: "text-green-700 dark:text-green-300", dot: "bg-green-500" },
    warning: { bg: "bg-amber-100 dark:bg-amber-900/20", text: "text-amber-700 dark:text-amber-300", dot: "bg-amber-500" },
    danger: { bg: "bg-red-100 dark:bg-red-900/20", text: "text-red-700 dark:text-red-300", dot: "bg-red-500" },
  };

  const color = colors[colorClass as keyof typeof colors] || colors.primary;

  return (
    <div className={`flex items-center gap-2 ${color.bg} ${color.text} p-2 rounded-md`}>
      <div className={`w-2 h-2 rounded-full ${color.dot}`}></div>
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate text-sm">{eventInfo.event.title}</div>
        {eventInfo.timeText && (
          <div className="text-xs opacity-80">{eventInfo.timeText}</div>
        )}
      </div>
    </div>
  );
};

export default Calendar;