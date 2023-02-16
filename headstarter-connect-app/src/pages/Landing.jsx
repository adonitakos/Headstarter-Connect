// File: /src/pages/Landing.jsx
import Card from 'react-bootstrap/Card'

function Landing() {
    return (
    <div className="container pb-5 mb-5">
        <div>
            <h1 
            className="display-4 text-primary mx-auto d-flex justify-content-center col-md-7"
            style={{fontFamily:'Poppins', fontWeight:'600', marginTop:'25px'}}
            >
                    Home
            </h1>
            <br />
            <div className="col-md-4 rounded mx-auto d-block">
                <Card.Img variant="top" src="homepage.jpg"/>
            </div>
            <br />
            <p className="mx-auto d-flex h4 text-center text-secondary justify-content-center" style={{ lineHeight: '2em' }}>
                Welcome to Headstarter Connect!
            </p>
            <br />
        </div>
    </div>
  )
}

export default Landing;