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
    const [name, setName] = useState('')
    const [squidNum, setSquidNum] = useState(0)
    const [groupName, setGroupName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
                const userInfo = {
                id: user.uid,
                email: user.email,
                name: name,
                squidNum: squidNum,
                groupName: groupName
            }
            await setDoc(doc(db, 'users', user.uid), userInfo)
            return userInfo
        })
        .then(user => {
            navigate(`/profile`)
        })
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
                <Form.Group className="mx-auto d-flex justify-content-center mb-2">
                    <AuthInput type="text" placeholder="Email Address" onChange={(e) => { setEmail(e.target.value) }} style={{ width: "410px" }} required />
                </Form.Group>
                <Form.Group className="mx-auto d-flex justify-content-center mb-2">
                    <AuthInput type="text" placeholder="Full Name" onChange={(e) => { setName(e.target.value) }} style={{ width: "410px" }} required />
                </Form.Group>
                <Form.Group className="mx-auto d-flex justify-content-center mb-2">
                    <AuthInput type="text" placeholder="Group" onChange={(e) => { setGroupName(e.target.value) }} style={{ width: "410px" }} required />
                </Form.Group>
                <Form.Group className="mx-auto d-flex justify-content-center mb-2">
                    <AuthInput type="number" placeholder="Squid #" onChange={(e) => { setSquidNum(Number(e.target.value)) }} style={{ width: "410px" }} required />
                </Form.Group>
                <Form.Group className="mx-auto d-flex justify-content-center mb-2">
                    <AuthInput type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} style={{ width: "410px" }} required />       
                </Form.Group>
                <Form.Group className="mx-auto d-flex justify-content-center mb-2">
                    <AuthButton type="submit">Register</AuthButton>
                </Form.Group>         
            </AuthContainer>
        </Form>
    );
} // <--- SignUp() fucntion ends here

export default SignUp;