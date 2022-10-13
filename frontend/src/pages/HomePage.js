import React, {useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import axios from 'axios';
import { CSVLink } from 'react-csv';

// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const HomePage = () => {
    let [notes, setNotes] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)
    // let [hide, setHide] = useState(false)

    useEffect(()=> {
        getNotes()
    }, [])


    let getNotes = async() =>{
        let response = await fetch('http://127.0.0.1:8000/api/notes/', {
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
    



  //   const DataSet = [
  //     {
  //         columns: [
  //             {title: "ID", style: {font: {sz: "18", bold: true}}, width: {wpx: 125}}, // width in pixels
  //             {title: "BODY", style: {font: {sz: "18", bold: true}}, width: {wch: 30}}, // width in characters
  //             {title: "USER", style: {font: {sz: "18", bold: true}}, width: {wpx: 100}}, // width in pixels
  //         ],
  //         data: notes.map((data) => [
  //             {value: data.id, style: {font: {sz: "14"}}},
  //             {value: data.body, style: {font: {sz: "14"}}},
  //             {value: data.user, style:{font: {color: {rgb: "ffffff"}}, fill: {patternType: "solid", fgColor: {rgb: "3461eb"}}}},
  //         ])
  //     }
  // ]


  const csvLink = {
    filename: "notes.csv",
    headers: heads,
    data: notes

  }


  var count = 1

    return (
        <div>
          
          <Link to='/create-note' className="btn btn-primary btn-block mt-4 mb-4">Create Note</Link>
          {/* <CSVLink data={notes} headers={heads} filename={'notes.csv'} target='_blank'>Export Data</CSVLink> */}
          {notes.length !== 0 && <CSVLink {...csvLink}>click!</CSVLink> }
          
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
      <td><Link to={`/update-note/${note.id}`}>Update</Link></td>

      <td>
        
            <Link className='bi bi-trash' onClick={async () => { 
              var z = confirm("Delete this item?");
              if (z == true) {
                await axios.delete(`http://127.0.0.1:8000/delete/${note.id}`);
                document.getElementById(note.id).setAttribute("hidden", true);
              } else {
                  <></>
              }
              
              }}>delete</Link>
        
     
     </td>

    </tr>
    </>
    ))}
  </tbody>
</table>

            
        </div>
    )
}

export default HomePage
