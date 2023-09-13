import './App.css';
import React, { useState } from 'react';

function App() {
  const [Name, setName] = useState("")
  const[Age, setAge] = useState("")

const handleSubmit = async()=>{
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

  return (
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
  );
}

export default App;
