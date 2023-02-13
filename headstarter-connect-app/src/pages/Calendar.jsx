import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import db from '../config/firebaseconfig';

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState({});
  const db = db.database().ref('notes');

  useEffect(() => {
    db.on('value', (snapshot) => {
      setNotes(snapshot.val());
    });
  }, []);

  function handleDateClick(clickedDate) {
    setDate(clickedDate);
    const note = window.prompt(
      `Enter note for ${clickedDate.toDateString()}`,
      '',
      'background-color: #ffffff; border: 1px solid #333'
    );
    if (note) {
      setNotes({ ...notes, [clickedDate.toDateString()]: note });
      saveNoteToDb(clickedDate.toDateString(), note);
    }
  }

  function saveNoteToDb(date, note) {
    db.child(date).set({
      note,
    });
  }

  return (
    <div className="d-flex h-100" style={{ backgroundColor: '#f2f2f2' }}>
      <div className="align-self-center mx-auto">
        <h1 className="display-4 text-primary text-center mb-4">Headstarter</h1>
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
}

export default CalendarPage;