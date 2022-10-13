


import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import './login.css'

const LoginPage = () => {
  let {resetpasswordUser} = useContext(AuthContext)
    return (
        <div>
            <div className='body '>
                <div className="center mt-5">
                    <h1>Reset Password</h1>
                    <form onSubmit={resetpasswordUser}>
                        <div class="txt_field">
                            <input type="email" name="email" required />
                            <span></span>
                            <label>Email</label>
                        </div>
                        <input type="submit" className='mt-3 mb-3'/>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default LoginPage
