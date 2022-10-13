


import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import './login.css'

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)
    return (
        <div>
            <div className='body'>
                <div className="center mt-5">
                    <h1>Login</h1>
                    <form onSubmit={loginUser}>
                        <div className="txt_field">
                            <input type="text" name="username" required />
                            <span></span>
                            <label>Username</label>
                        </div>
                        <div class="txt_field">
                            <input type="password" name="password" required />
                            <span></span>
                            <label>Password</label>
                        </div>
                        <div className="pass"><Link to='/reset-password'>Forgot Password?</Link></div>
                            <input type="submit"/>
                            <div className="signup_link">
                            Not a member? <Link to='/signup'>Signup</Link>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default LoginPage
