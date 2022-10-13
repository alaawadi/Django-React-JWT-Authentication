import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    const history = useHistory()

    let loginUser = async (e )=> {
        e.preventDefault()
        try {
          
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        // console.log(response.status)
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            alert('Log in sucssesfuly!')
            history.push('/')
        }else {
            alert("Email Or Password is not correct")
        }

    } catch (e) {
        alert("please Activate your email to login")
      }
    }


    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history.push('/login')
    }


    let signupUser = async (e )=> {
        e.preventDefault()
        
        let response = await fetch('http://127.0.0.1:8000/api/signupapi/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value,'email':e.target.email.value, 'password':e.target.password.value})
        },[setLoading(false)])
        // let data2 = await response2.json()

        if(response.status === 400){
            alert('user name or Email or Password is not corrected!')
            
        }else{
            alert('check you email to activate your account to login!')
            history.push('/')
        }
    }


    
    let changepasswordUser = async (e )=> {
        e.preventDefault()
        
        let response = await fetch('http://127.0.0.1:8000/api/change-password/', {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            body:JSON.stringify({'old_password':e.target.old_password.value,'new_password':e.target.new_password.value})
        },[setLoading(false)])
        // let data2 = await response2.json()

        if(response.status == 200){
            alert('Change password sucssesfuly!')
            history.push('/')
            
        }else{
            alert('Password is not corrected!')
        }
    }




    let resetpasswordUser = async (e )=> {
        e.preventDefault()
        
        let response = await fetch('http://127.0.0.1:8000/api/password_reset/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value})
        },[setLoading(false)])
        // let data2 = await response2.json()

        if(response.status === 400){
            alert('Something error!')
            
        }else{
            alert('We have send reset password url to your email sucssesfuly, check it here!')
            history.push('/')
        }
    }


    let updateToken = async ()=> {

        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()
        
        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
        signupUser:signupUser,
        changepasswordUser:changepasswordUser,
        resetpasswordUser:resetpasswordUser,
    }


    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
