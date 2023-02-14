// File: /src/pages/Profile.jsx

import Card from 'react-bootstrap/Card'
import React, { useContext } from "react";
import { UserContext } from '../config/user'

function Profile() {
    let userInfo=useContext(UserContext)[0].user
    let teamInfo=useContext(UserContext)[1]
    if(userInfo===null || teamInfo===null) {
        userInfo={"name":"","squidNum":"","groupName":""}
        teamInfo=""        
    }
    return (
        <div className="container">
            <div>
                <h1 className="display-4 text-primary mx-auto d-flex justify-content-center col-md-7"
                    style={{marginTop:'20px', fontFamily:'Poppins', fontWeight:'700'}}
                >
                    Profile
                </h1>
                <br />
                <div className="col-md-2 rounded mx-auto d-block">
                    <Card.Img variant="top" src="profile.jpg"/>
                </div>
                <div className="mb-3 col-md-5 mx-auto justify-content-center">
                    <br />
                    <p className="col-md-3 rounded mx-auto d-block"><b>Name</b>: {userInfo.name}</p>
                    <p className="col-md-3 rounded mx-auto d-block"><b>Squid #</b> {userInfo.squidNum}</p>
                    <p className="col-md-3 rounded mx-auto d-block"><b>Group</b>: {userInfo.groupName}</p>
                    <p className="col-md-3 rounded mx-auto d-block"><b>Teammates</b>: {teamInfo}</p>
                </div>
            </div>
        </div>
    );

}

export default Profile;