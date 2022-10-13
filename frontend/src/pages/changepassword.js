


import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import './login.css'

const LoginPage = () => {
  let {changepasswordUser} = useContext(AuthContext)
    return (
        <div>
            <div className='body '>
                <div className="center mt-5">
                    <h1>Change Password</h1>
                    <form onSubmit={changepasswordUser}>
                        <div class="txt_field">
                            <input type="password" name="old_password" required />
                            <span></span>
                            <label>Old Password</label>
                        </div>

                        
                        <div class="txt_field">
                            <input type="password" name="new_password" required />
                            <span></span>
                            <label>New Password</label>
                        </div>
                            <input type="submit" className='mt-3 mb-3'/>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default LoginPage
