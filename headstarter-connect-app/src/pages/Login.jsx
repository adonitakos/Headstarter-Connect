// File: /src/pages/Login.js
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
    return (
        <Form className="container">
            <h1 className="display-4 text-primary mx-auto d-flex justify-content-center col-md-7">Login</h1>
            <Form.Group className="mb-3 col-md-3 mx-auto justify-content-center" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3 col-md-3 mx-auto justify-content-center" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <div className="mb-3 col-md-1 mx-auto justify-content-center">
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </div>
        </Form>
    );

}

export default Login;