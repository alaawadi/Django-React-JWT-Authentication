import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import axios from 'axios';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { CSVLink } from 'react-csv';

const HomePage = () => {
    let [notes, setNotes] = useState([])
    let {authTokens, logoutUser, user} = useContext(AuthContext)
    let [hide, setHide] = useState(false)

    useEffect(()=> {
        getNotes()
    }, [])


    let getNotes = async() =>{
        let response = await fetch('http://127.0.0.1:8000/api/notes1/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()

        if(response.status === 200){
            setNotes(data)
        }else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }
        
    }



    const heads = [
      {lable:'Id',key: 'id'},
      {lable:'Body',key: 'body'},
      {lable:'User',key: 'user'},
    ]
    



  const csvLink = {
    filename: "notes.csv",
    headers: heads,
    data: notes

  }



  var count = 1

    return (
        <div>
          <Link to='/create-noteall' className="btn btn-primary btn-block mt-4 mb-4">Create Note</Link>
          {notes.length !== 0 && user.admin == true?(<CSVLink {...csvLink}>click!</CSVLink>):(<></>)}
            <h3 className='mt-3'>List of Notes : </h3>
<table class="table mt-5">
  <thead>
    <tr>
      <th scope="col-4">id</th>
      <th scope="col-4">body</th>
      <th scope="col-4">action</th>
      <th scope="col-4">action</th>
    </tr>
  </thead>

  <tbody class="table-group-divider">
  {notes.map(note => (
    <>
    <tr id={note.id}>
      <th scope="row">{count}</th>
      <div hidden>{count +=1}</div>
      <td>{note.body}</td>

      

      {user.user_id === note.user || user.admin == true?(<td><Link to={`/update-note/${note.id}`}>Update</Link></td>):(<td>update</td>)}

      {user.user_id === note.user || user.admin == true?(<td>
        
            <Link className='bi bi-trash' onClick={async () => { 
              var z = confirm("Delete this item?");
              if (z == true) {
                await axios.delete(`http://127.0.0.1:8000/delete/${note.id}`);
                document.getElementById(note.id).setAttribute("hidden", true);
              } else {
                  <></>
              }
              
              }}>delete</Link>
        
     
     </td>):(<td>delete</td>)}

    </tr>
    </>
    ))}
  </tbody>
</table>

            
        </div>
    )
}

export default HomePage
