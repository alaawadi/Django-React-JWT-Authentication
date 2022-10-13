


import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import './login.css'

const LoginPage = () => {
  let {signupUser} = useContext(AuthContext)
    return (
        <div>
            <div className='body '>
                <div className="center mt-5">
                    <h1>Signup</h1>
                    <form onSubmit={signupUser}>
                        <div className="txt_field">
                            <input type="text" name="username" required />
                            <span></span>
                            <label>Username</label>
                        </div>
                        <div className="txt_field">
                        <input type="email" name="email" required />
                            <span></span>
                            <label>Email</label>
                        </div>
                        
                        <div class="txt_field">
                            <input type="password" name="password" required />
                            <span></span>
                            <label>Password</label>
                        </div>


                       


                        
                        
                            <input type="submit"/>
                            <div className="signup_link">
                            Not a member? <Link to='/login'>Login</Link>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default LoginPage
