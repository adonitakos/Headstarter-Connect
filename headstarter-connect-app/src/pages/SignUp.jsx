// File: /src/pages/SignUp.jsx

import React from "react";
import { AuthContainer, AuthBanner, AuthInput, AuthButton } from "../components/AuthElements";

function SignUp() {
    return (
        <>
            <AuthContainer>
                <AuthBanner>Sign Up</AuthBanner>
                <AuthInput type="text" placeholder="First Name" style={{ width: "200px" }} />
                <AuthInput type="text" placeholder="Last Name" style={{ width: "200px" }} />
                <AuthInput type="text" placeholder="Email Address" style={{ width: "410px" }} />
                <AuthInput type="password" placeholder="Password" style={{ width: "410px" }} />       
                <AuthButton>Register</AuthButton>         
            </AuthContainer>
        </>
    );
} // <--- SignUp() fucntion ends here

export default SignUp;