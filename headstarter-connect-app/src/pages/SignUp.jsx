// File: /src/pages/SignUp.jsx

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../config/firebaseconfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { AuthContainer, AuthBanner, AuthInput, AuthButton } from "../components/AuthElements";
import { Alert, Form } from 'react-bootstrap'

function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
            const userInfo = {
            id: user.uid,
            email: user.email
            }
            await setDoc(doc(db, 'users', user.uid), userInfo)
            return userInfo
        })
        .then(user => {
                navigate(`/profile`)
            }
        )
        .catch(error => {
            console.error('An error occurred while creating an account: ', error)
            setErrorMessage(error.message)
        })
    }
    return (
        <Form onSubmit={handleSubmit}>
            {errorMessage !== '' && <Alert variant="danger">{errorMessage}</Alert>}
            <AuthContainer>
                <AuthBanner>Sign Up</AuthBanner>
                <Form.Group className="my-2">
                    <AuthInput type="text" placeholder="Email Address" onChange={(e) => { setEmail(e.target.value) }} style={{ width: "410px" }} />
                </Form.Group>
                <Form.Group className="my-2">
                    <AuthInput type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} style={{ width: "410px" }} />       
                </Form.Group>
                <Form.Group className="my-3">
                    <AuthButton type="submit">Register</AuthButton>
                </Form.Group>         
            </AuthContainer>
        </Form>
    );
} // <--- SignUp() fucntion ends here

export default SignUp;