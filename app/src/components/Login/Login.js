import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import { auth, provider } from "../../firebase";
import "./Login.css";

const { keygen } = require("/secure/KeyGen/generate_keypair")

function Login() {
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();

    const signIn = () => {
        auth.signInWithPopup(provider).then(({ user }) => {
            dispatch(
                login({
                    displayName: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL,
                })
            );
            export function keypair() {
                return keygen(user.email);
            }
            //call contract to save email hash and public key to user
        });
    };

    const loginView =
        <div class="form-box login">
            <h2> Login </h2>
            <form action="#">
                <div class="input-box">
                    <span class="icon">
                        <ion-icon name="mail-outline"></ion-icon>
                    </span>
                    <input type="email" required/>
                    <label>Email</label>
                </div>
                <div class="input-box">
                    <span class="icon">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                    </span>
                    <input type="password" required/>
                    <label>Password</label>
                </div>
                <div class="remember-forgot">
                    <label><input type="checkbox"/> Remember me </label>
                    <a href="#">Forgot Password?</a>
                </div>
                <button type="submit" class="btn" onClick={() => signIn()}>Login</button>
                <div class="login-register">
                    <p>Don't have a account? <a href="#" class="register-link" onClick={() => setIsActive(true)}>Register</a> </p>
                </div>
            </form>
        </div>
    ;

    const registerView = (
        <div class="form-box register">
            <h2> Registration </h2>
            <form action="#">
                <div class="input-box">
            <span class="icon">
                <ion-icon name="person-outline"></ion-icon>
            </span>
                    <input type="text" required/>
                    <label>Username</label>
                </div>
                <div class="input-box">
            <span class="icon">
                <ion-icon name="mail-outline"></ion-icon>
            </span>
                    <input type="email" required/>
                    <label>Email</label>
                </div>
                <div class="input-box">
            <span class="icon">
                <ion-icon name="lock-closed-outline"></ion-icon>
            </span>
                    <input type="password" required/>
                    <label>Password</label>
                </div>
                <div class="remember-forgot">
                    <label><input type="checkbox"/> Agree to the terms & conditions </label>
                </div>
                <button type="submit" class="btn">Register</button>
                <div class="login-register">
                    <p>Already have a account? <a href="#" class="login-link" onClick={() => setIsActive(false)}>Login</a> </p>
                </div>
            </form>
        </div>
    );

    return (
        <body>
        <header>
            <h2 class="logo"> Logo </h2>
            <nav class="navigation">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
                <button class="btnLogin-popup">Login</button>
            </nav>
        </header>

        <div class={`wrapper ${isActive ? 'active': ''}`}>
        <span class="icon-close">
            <ion-icon name="close"></ion-icon>
        </span>
            {isActive ? registerView : loginView}
        </div>
        </body>
    );
}

export default Login;