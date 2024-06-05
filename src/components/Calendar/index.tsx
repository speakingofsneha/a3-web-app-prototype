//https://www.npmjs.com/package/react-calendar 
//https://blog.logrocket.com/react-calendar-tutorial-build-customize-calendar/ 

import { useEffect, useRef } from "react";

// Import component from the react-calendar library
import ReactCalendar from "react-calendar";

import "./index.scss";

interface Props {
  onChange: (date: Date) => void;
}

// Calendar component that renders a ReactCalendar 
// Positioned absolute to the top right corner of its container
function Calendar({ onChange }: Props) {
  // Effect to adjust the position of the calendar based on its location in the viewport
  useEffect(() => {
    if (!calendarRef.current) return;

    const position = calendarRef.current.getBoundingClientRect();
    const viewport = { height: window.innerHeight, width: window.innerWidth };

    // Check if the calendar is positioned below the viewport's center
    if (position.y > viewport.height / 2) {
      calendarRef.current.style.top = "auto";
      calendarRef.current.style.bottom = "calc(32px + 8px * 2)";
    }
  }, []);

  // Reference to the calendar element
  const calendarRef = useRef<HTMLDivElement>(null);

  // Render the calendar component
  return (
    <div ref={calendarRef} className="absolute right-0 top-[calc(100%+8px)]">
      <ReactCalendar
        locale="en-US" // Set the locale to "en-US"
        // Customize the navigation label to display only the abbreviated month and year
        navigationLabel={({ label }) =>
          label.split(" ")[0].slice(0, 3) + " " + label.split(" ")[1]
        }
        onClickDay={onChange} // Callback function for when a day is clicked
      />
    </div>
  );
}

export default Calendar;
