import './App.css';
import React, { useState , useEffect} from 'react';

function App() {
  const [Name, setName] = useState("")
  const[Age, setAge] = useState("")
  const [userData, setUserData] = useState([])


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
    body: JSON.stringify({Name : Name, Age : Age})
  })
  setName("")
  setAge("")
}
}


  return (
    <div>
    <div  className='form'>
    <h2> Please fill your details</h2>
    <label>Name</label>
    <input type="text" value={Name} onChange={(e)=>setName(e.target.value)} />
    <br/>
    <label>Age</label>
    <input type="number" value={Age} onChange={(e)=>setAge(e.target.value)} />
    <br/>
    <button className="button" onClick={handleSubmit}>Submit</button>
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
        </tr>
        
    
  
))}
</tbody>
      </table>



    </div>
  );
}

export default App;
