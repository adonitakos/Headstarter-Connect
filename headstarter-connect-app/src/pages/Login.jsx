// File: /src/pages/Login.js

import React from "react";
import { AuthContainer, AuthBanner, AuthInput, AuthButton } from "../components/AuthElements";


function Login() {
    return (
        <>
            <AuthContainer>
                <AuthBanner>Login</AuthBanner>
                <AuthInput type="text" placeholder="Email Address" style={{ width: "410px" }} />
                <AuthInput type="password" placeholder="Password" style={{ width: "410px" }} />       
                <AuthButton>Login</AuthButton>         
            </AuthContainer>
        </>
    );

} // <--- Login() function ends here

export default Login;