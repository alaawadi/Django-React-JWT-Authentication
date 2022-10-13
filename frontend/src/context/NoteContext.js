import { createContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const NoteContext = createContext()

export default NoteContext;


export const NoteProvider = ({children}) => {
    let [loading, setLoading] = useState(true)

    const history = useHistory()



    let PostItem = async (e )=> {
        e.preventDefault()
        let formField = new FormData()
  
        formField.append('body', e.target.body.value);
        // formField.append('image', e.target.image.files[0]);
        formField.append('user', 1);
  
        let response = await fetch('http://127.0.0.1:8000/create_list/', {
            method:'POST',
            body:formField
        },[loading])
    
  
        if(response.status === 201){
          setLoading(false)
          alert('Created sucssesfuly!')
          history.push('/')  
        }else{
          alert('something error!')
            // window.location.reload()
        }
    }

    let contextData = {
        PostItem:PostItem,

    }




    return(
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
