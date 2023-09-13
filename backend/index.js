const express = require("express")
const cors = require("cors")
require("./db")
const User = require("./models/user")
const app = express();

const PORT = 5000;
app.use(express.json())
app.use(cors())

app.get("/api/login", (req, res)=>{

    res.send("hello word")
})
app.post("/addUserData", async(req, res)=>{
const {Name, Age} = req.body
    const user =  new User({Name, Age})
    await user.save();
    res.json(user)
})

app.get("/getUserData", async(req, res)=>{
  
     const user = await User.find() 
     res.json(user)
    })




app.listen(PORT, ()=>{
    console.log("app is listen on port 5000")
})