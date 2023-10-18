import './App.css';
import React, { useState , useEffect} from 'react';

function App() {

  const [Name, setName] = useState("")
  const [updatedName, setUpdatedName] = useState("")
  const [Age, setAge] = useState("")
  const [updatedAge, setUpdatedAge] = useState("")
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState([])
  const [editUserId, setEditUserId] = useState(null)

  useEffect(()=>{
    fetch("http://localhost:5000/getUserData").
    then(response =>
      response.json()
    ).then(data =>
      setUserData(data)
    )
    .catch(error =>
      console.error("Error fetching data", error))
    
      },[userData])
    
  // const handleFileChange = (e) => {
  //   setProfileImage(e.target.files[0]);
  //   console.log(profileImage)
  // };

const handleEdit = (id) =>{
  const user =  userData.find((user)=>(
 user._id === id
  ))
  setUpdatedName(user.Name)
  setUpdatedAge(user.Age)
  setEditUserId(user._id)
}

const handleUpdate = async(id) =>{
  const response =  await fetch(`http://localhost:5000/editUserData/${id}`,{
    method : "PUT",
    headers :{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({Name : updatedName, Age : updatedAge})
  })
    const updatedUser = {_id: editUserId, Name : updatedName, Age : updatedAge}
  const updatedUserData = userData.map((user)=>(
    user._id === editUserId ? updatedUser : user
  ))
  setUserData(updatedUserData)
  setEditUserId(null)
  setUpdatedName("")
  setUpdatedAge("")
}
  
const handleSubmit = async()=>{

  if(Name === ""){
    alert("please enter your name")
  }
  else if(Age === ""){
    alert("please enter your age")
  }else{
  const response =  await fetch("http://localhost:5000/addUserData",{
    method : "POST",
    headers :{
      "Content-Type": "application/json"
    },
    body: JSON.stringify({Name : Name, Age : Age, profileImage : profileImage})
  })
  console.log(profileImage)
  setName("")
  setAge("")
  setProfileImage(null)
  console.log(profileImage)
}
}

const handleDelete = async(id)=>{
const response =  await fetch(`http://localhost:5000/deleteUserData/${id}`,{
    method : "DELETE",
    headers :{
      "Content-Type": "application/json"
    },
 
  })
    const user = userData.filter((user)=> 
    user._id !== id)
    setUserData(user)
}


  return (
    <div>
    <div  className='form'>
    <h2> Please fill your details</h2>
    <label>Name</label>
    <input type="text" value={editUserId ? updatedName : Name} onChange={editUserId ? (e)=>setUpdatedName(e.target.value):(e)=>setName(e.target.value)}/>
    <br/>
    <label>Age</label>
    <input type="number" value={editUserId ? updatedAge: Age} onChange={editUserId ? (e)=>setUpdatedAge(e.target.value) : (e)=>setAge(e.target.value)}/>
    <br/>
    <br />
        {/* <label htmlFor="profileImage">Profile Image:</label>
        <input
          type="file"
          id="profileImage"
          name="profileImage"
          accept="image/*"
          onChange={handleFileChange}
        />
        <br /> */}
    <button className="button" onClick={editUserId ? handleUpdate : handleSubmit}>{editUserId ? "Update" : "Submit"}</button>
    </div>
    
      <table >
        <thead>
          <tr>
          <th>Name</th>
          <th>Age</th>
          </tr>
        </thead>
        <tbody>
        {userData.map((user)=>(
          <tr key={user._id}>
          <td>{user.Name}</td>
          <td>{user.Age}</td>
          <td  onClick={()=>handleEdit(user._id)}>Edit</td>
          <td className="delete" onClick={()=>handleDelete(user._id)}>Delete</td>
        </tr>
        
    
  
))}
</tbody>
      </table>



    </div>
  );
}

export default App;

