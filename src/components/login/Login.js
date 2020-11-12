import React from 'react';
import { loginUrl } from '../../spotify';
import './Login.css';

function Login() {
    return (
        <div className="login">
            <img className="logo" src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="SpotifyLogo"/>
            <a href={loginUrl}>Login with spotify</a>
        </div>
    )
}

export default Login
