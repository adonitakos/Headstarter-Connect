// File: /src/pages/Login.jsx

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../config/firebaseconfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { AuthContainer, AuthBanner, AuthInput, AuthButton } from "../components/AuthElements";
import { Alert, Form } from 'react-bootstrap'


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const handleSubmit = e => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then(() => { navigate('/profile') })
        .catch(error => {
            console.error('An error occurred while signing in: ', error)
            setErrorMessage(error.message)
        })
    }
    return (
        <Form onSubmit={handleSubmit}>
            {errorMessage !== '' && <Alert variant="danger">{errorMessage}</Alert>}
            <AuthContainer>
                <AuthBanner className="mx-auto d-flex justify-content-center">Login</AuthBanner>
                <Form.Group className="mx-auto d-flex justify-content-center mb-2">
                    <AuthInput type="text" placeholder="Email Address" onChange={(e) => { setEmail(e.target.value) }} style={{ width: "410px" }} required />
                </Form.Group>
                <Form.Group className="mx-auto d-flex justify-content-center mb-2">
                    <AuthInput type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} style={{ width: "410px" }} required />       
                </Form.Group>
                <Form.Group className="mx-auto d-flex justify-content-center mb-2">
                    <AuthButton type="submit">Login</AuthButton>
                </Form.Group>         
            </AuthContainer>
        </Form>
    );

} // <--- Login() function ends here

export default Login;