import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';


const UpdateCourse = () => {

    let history = useHistory();
    const { id } = useParams();

    // const [image, setImage] = useState(null)
    const [uid, setuid] = useState(null)
    const [body, setbody] = useState(null)
    const [uuser, setuser] = useState(null)

    useEffect(() => {
        loadStudents();
    }, [])


    // load students by its is and show data to forms by value

   let loadStudents = async () => {
    const result = await axios.get(`http://127.0.0.1:8000/detail/${id}`);
    console.log(result.data);

    // setImage(result.data.image);
    setuid(result.data.id);
    setbody(result.data.body);
    setuser(result.data.user);
   
    
    // setis_student(result.data.is_admin);
   }



   const updateSingleStudent = async (e) => {
    e.preventDefault()
    let formField = new FormData()

    formField.append('id', uid);
    formField.append('body', body);
    formField.append('user', uuser);

        
        // if(image !== null) {
        //   formField.append('image', image)
      
        // }

        await axios({
            method: 'PUT',
            url: `http://127.0.0.1:8000/update/${id}`,
            data: formField
        }).then(response => {
          alert('Updated sucssesfuly!')
            console.log(response.data);
            history.push("/");
        })

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
    <h2 className="text-center mb-4">Update Note</h2>
    


      <div className="form-group">
      <label for="body">body</label>
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Your body"
          name="body"
          value={body}
          onChange={(e) => setbody(e.target.value)}
        />
      </div>
     
     
      <button onClick={updateSingleStudent} className="btn btn-primary btn-block mt-4">Update</button>
   
  </div>
</div>
</section>
  </div>
  </>
 
    );
};

export default UpdateCourse;