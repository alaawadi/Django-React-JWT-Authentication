import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import { useHistory, useParams } from 'react-router-dom';
// import NoteContext from '../context/NoteContext'
import AuthContext from '../context/AuthContext'

const Createnote = () => {
    let {authTokens,user} = useContext(AuthContext)
    console.log(user)
    let history = useHistory();
  

    const [isLoading, setIsLoading] = useState(true);
    // const [image, setImage] = useState([]);
    

  
    let PostItem = async (e )=> {
      e.preventDefault()
      let formField = new FormData()

      formField.append('body', e.target.body.value);
      // formField.append('image', e.target.image.files[0]);
      formField.append('user', user.user_id);

      let response = await fetch('http://127.0.0.1:8000/create_list/', {
          method:'POST',
        //   headers:{
        //     'Content-Type':'application/json',
        //     'Authorization':'Bearer ' + String(authTokens.access)
        // },
          body:formField
      },[setIsLoading(false)])
  

      if(response.status === 201){
        alert('Created sucssesfuly!')
        history.push('/')  
      }else{
        alert('something error!')
          // window.location.reload()
      }
  }


    return (
      <>
<div class="container5">
  
        
            <section class="main">
       

       <br></br>
       <br></br>
       <br></br>
        <div className="container">
  <div className="w-75 mx-auto shadow p-5">
    <h2 className="text-center mb-4">Create Note</h2>
    

    {/* <div className="form-group">
      <img src={image} height="100" width="200" alt="" srcSet="" />
    <label>Upload Image</label>
         <input type="file" className="form-control" onChange={(e)=>setImage(e.target.files[0])}/>
      </div> */}
<form class="form1" onSubmit={PostItem}>
      <div className="form-group">
      <label for="body">Body</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter note body"
          name="body"
        />
      </div>
     
     

      
      {/* <div className="form-group">
      <label for="image">Image</label>
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div> */}


      


      <button type='submit' className="btn btn-primary btn-block mt-4">Create</button>
      </form>
  </div>
</div>
</section>
  </div>
 </>
    );
};

export default Createnote;