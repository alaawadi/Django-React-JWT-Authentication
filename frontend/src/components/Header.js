import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <div>
            



            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                <Link className='navbar-brand' to="/" >Home</Link>
                    {/* {user &&   <Link to="/" className="navbar-brand">Hello {user.username}</Link>} */}
                    <Link to="/notes" className="navbar-brand">All Notes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                {user ? (
                                   <p className="nav-link pt-3" onClick={logoutUser}>Logout</p>
                                   
                                ): (
                                    <Link className="nav-link pt-3" to="/login" >Login</Link>
                                )}
                            </li>
                            <li className='nav-item'>
                            {user ? (
                                   
                                   <Link className="nav-link pt-3" to='/change-password'>Change Password</Link>
                                ): (
                                    <></>
                                )}
                            </li>
                            <li className="nav-item">
                                
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>
           
        </div>
    )
}

export default Header
