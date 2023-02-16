// File: /src/pages/Calendar.jsx

import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import { useUser, UserContext } from '../config/user';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../config/firebaseconfig'
import { overlapAvabls } from '../config/utils'

function CalendarPage() {
  const userID=useContext(UserContext)[0].user.id
  let groupMembs=useContext(UserContext)[2]     
  if(groupMembs===null)
    groupMembs=[]

  const [state, team] = useUser();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState({});
  const [didNote, setDidNote] = useState(0);
  // display at bottom of page
  // const [availInfo, setAvailInfo] = useState([]);
  // const [meetInfo, setMeetInfo] = useState({});
  let availInfo=[]
  let meetInfo={}
  // display at bottom of page
  const [favailInfo, setFAvailInfo] = useState("[]");
  const [fmeetInfo, setFMeetInfo] = useState("{}");


  useEffect(() => {
    // Make it so only logged in users can access this page
    if (!state.user) {
      navigate('/auth/login'); // Redirect the user to the login page
      return null; // Don't render anything
    }
    const unsubscribe = onSnapshot(doc(db, 'users', userID), () => {
      // setDoc runs WAAYY 2 many times here!
      /*if(userID!==undefined && Object.keys(notes).length !== 0) {
        setDoc(doc(db, 'users', userID), {"availability":notes},{merge: true})      
      }*/
      let listAv=[];
      groupMembs.map((groupMemb) => {
        getDoc(doc(db, 'users', groupMemb)).then((doc) => {
          listAv.push(doc.get('availability'))
          console.log(listAv)
          availInfo=listAv
          meetInfo=overlapAvabls(listAv)
          setFAvailInfo(JSON.stringify(availInfo, null, 2))
          setFMeetInfo(JSON.stringify(meetInfo, null, 2))
        }).catch((err) => {console.log(err)})
      });
    })
  })

  function clearSchdl() {
    setDoc(doc(db, 'users', userID), {"availability":{}},{merge: true})
  }

  function handleDateClick(clickedDate) {
    setDate(clickedDate);
    const note = window.prompt(`Enter note for ${clickedDate.toDateString()}`, '', 'background-color: #ffffff; border: 1px solid #333');
    if (note) {
      setNotes({ ...notes, [(clickedDate.getMonth()+1).toString().padStart(2, "0")+"_"+(clickedDate.getDate()).toString().padStart(2, "0")+"_"+String(clickedDate.getFullYear())]: note });
      // setDoc also runs WAAYY 2 many times here! Can't win!

      // unsubscribe()
      setDidNote(didNote+1)
    };
  } // <--- handleDateClick() function ends here

  return (
    <div style={{fontFamily:'Poppins, sans-serif'}}>
      <div className="h-100 align-self-center mx-auto mb-2">
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
      <button className="mx-auto d-flex justify-content-center" onClick={clearSchdl}>Reset</button>
      <br></br>
      <div>
        <p className="h5 text-primary rounded mx-auto d-flex justify-content-center">MEMBER AVAILABILITIES</p>
        <p className="col-md-5 h5 rounded mx-auto d-block">{favailInfo}</p>
        <p className="h5 text-primary rounded mx-auto d-flex justify-content-center">MEETING TIMES</p>
        <p className="col-md-5 h5 rounded mx-auto d-block">{fmeetInfo}</p>
      </div>
    </div>
  );
} // <--- CalendarPage() function ends here

export default CalendarPage;