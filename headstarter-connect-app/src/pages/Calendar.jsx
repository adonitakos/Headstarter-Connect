// File: /src/pages/Calendar.jsx

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../config/user';

function CalendarPage() {

  const [state, team] = useUser();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState({});

// Make it so only logged in users can access this page
  if (!state.user) {
    navigate('/auth/login'); // Redirect the user to the login page
    return null; // Don't render anything
  }

  function handleDateClick(clickedDate) {
    setDate(clickedDate);
    const note = window.prompt(`Enter note for ${clickedDate.toDateString()}`, '', 'background-color: #ffffff; border: 1px solid #333');
    if (note) {
      setNotes({ ...notes, [clickedDate.toDateString()]: note });
    }
  } // <--- handleDateClick() function ends here

  return (
    <div className="d-flex h-100" style={{fontFamily:'Poppins, sans-serif', marginTop:'-12rem'}}>
      <div className="align-self-center mx-auto">
        <h1 className="display-4 text-primary text-center mb-4" style={{fontWeight:'700'}}>Team Calendar</h1>
        <Calendar
          onClickDay={handleDateClick}
          onChange={(newDate) => setDate(newDate)}
          value={date}
          view="month"
        />
        {Object.keys(notes).includes(date.toDateString()) && (
          <p className="text-primary text-center mt-4">
            Your message: {notes[date.toDateString()]}<br />
            Date written: {date.toDateString()}
          </p>
        )}
      </div>
    </div>
  );
} // <--- CalendarPage() function ends here

export default CalendarPage;