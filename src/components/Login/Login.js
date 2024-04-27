import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import { auth, provider } from "../../firebase";
import "./Login.css";

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink =document.querySelector('.register-link');
const btnPopup =document.querySelector('.btnLogin-popup');
const iconClose =document.querySelector('.icon-close');





function Login() {
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
    });
  };
  return (
    <body>

    <header>
        <h2 class="logo"> Logo </h2>
        <nav class="navigation">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Contact</a>
            <button class="btnLogin-popup" >Login</button>
        </nav>
    </header>

    <div class="wrapper">
        <span class="icon-close">
            <ion-icon name="close"></ion-icon>
        </span>

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
                <button type="submit" class="btn" onClick={signIn}>Login</button>
                <div class="login-register">
                    <p>Don't have a account? <a href="#" class="register-link">Register</a> </p>
                </div>
            </form>
        </div>

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
                    <p>Already have a account? <a href="#" class="login-link">Login</a> </p>
                </div>
            </form>
        </div>
    </div>


    
</body>
  );
}


export default Login;
