// File: /src/pages/Profile.js
import Card from 'react-bootstrap/Card'

function Profile() {
    return (
        <div className="container">
            <div>
                <h1 className="display-4 text-primary mx-auto d-flex justify-content-center col-md-7">Profile</h1>
                <br />
                <div className="col-md-2 rounded mx-auto d-block">
                    <Card.Img variant="top" src="https://fakeimg.pl/100x100/?text=PROFILE IMG"/>
                </div>
                <div className="mb-3 col-md-5 mx-auto justify-content-center">
                    <br />
                    <i>Example</i><br />
                    <b>Name</b>: Michael Salamon<br />
                    <b>Squid #</b> 52<br />
                    <b>Group</b>: Awesome Legit Coders<br />
                    <b>Teammates</b>: Antonios Takos | 426, Andreas Constantinou | 412<br />
                </div>
            </div>
        </div>
    );

}

export default Profile;