// File: /src/pages/Landing.js

import React from "react";

function Landing() {

    return (
    <>
        <h1 style={{textAlign:'center', color:'#3D56F0', fontWeight:'800'}}>Welcome to the Landing Page!</h1>
        <h2><a href="/auth/login">Login</a> if you already have an account!</h2>
        <h2><a href="/auth/register">Register</a> for an account if you do NOT already have one</h2>
    </>
    );

} // <--- Landing() function ends here

export default Landing;